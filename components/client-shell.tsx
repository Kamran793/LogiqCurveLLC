"use client";

import { ClientLayout } from "../client"; // Adjust if your ClientLayout is elsewhere
import { Suspense } from "react";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading layout...</div>}>
      <ClientLayout>{children}</ClientLayout>
    </Suspense>
  );
}
