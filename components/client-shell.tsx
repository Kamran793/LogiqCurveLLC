"use client";

import { ClientLayout } from "@/app/client";
import { ReactNode, Suspense } from "react";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading layout...</div>}>
      <ClientLayout>{children}</ClientLayout>
    </Suspense>
  );
}
