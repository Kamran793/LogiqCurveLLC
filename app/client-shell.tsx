// app/client-shell.tsx
"use client";

import { Suspense } from "react";
import { ClientLayout } from "./client"; // ✅ Adjust if ClientLayout is elsewhere

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading layout...</div>}>
      <ClientLayout>{children}</ClientLayout>
    </Suspense>
  );
}
