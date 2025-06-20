"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, AlertCircle } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) setErrorMessage(error);
  }, [searchParams]);

  const handleContinue = (formData: FormData) => {
    const emailValue = formData.get("email") as string;
    if (emailValue) {
      setEmail(emailValue);
      setShowPassword(true);
      setErrorMessage(null);
    }
  };

  const handleSignUp = async (formData: FormData) => {
    const emailValue = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signUp({ email: emailValue, password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      router.push("/confirmation"); // or a success page
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  const inputStyles = "h-14 w-full bg-white text-black border-gray-200 focus:border-zinc-900 focus:ring-zinc-900 rounded-xl placeholder:text-gray-500 px-4";
  const buttonStyles = "h-14 w-full rounded-xl shadow-none font-normal";

  return (
    <>
      <div className="fixed inset-0 bg-white" />
      <Link 
        href="/"
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        aria-label="Close and return to homepage"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      <div className="min-h-screen w-full grid place-items-center relative">
        <div className="absolute top-4 left-4 pl-2">
          <span className="font-bold text-2xl text-zinc-900 cursor-default">start</span>
        </div>

        <div className="w-full px-4 sm:px-0 sm:max-w-[400px] -mt-16">
          <form className="space-y-6" action={showPassword ? handleSignUp : handleContinue}>
            <div className="text-center space-y-2">
              <h1 className="text-[32px] font-normal">{showPassword ? "Create a password" : "Create your account"}</h1>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  defaultValue={email}
                  readOnly={showPassword}
                  className={inputStyles}
                />
                {showPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    Edit
                  </button>
                )}
              </div>

              {showPassword && (
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPasswordText ? "text" : "password"}
                    placeholder="Password"
                    required
                    className={`${inputStyles} pr-10`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              )}

              <Button type="submit" disabled={loading} className={`${buttonStyles} bg-zinc-900 hover:bg-zinc-800 text-white`}>
                {loading ? "Please wait..." : showPassword ? "Sign up" : "Continue"}
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/sign-in" className="text-zinc-900 hover:underline font-normal">Sign in</Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className={`${buttonStyles} border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3`}
            >
              {/* Google Logo SVG */}
              Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
