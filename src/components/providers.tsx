"use client";

import { BorusanDataProvider } from "@/hooks/use-borusan-data";

export function Providers({ children }: { children: React.ReactNode }) {
  return <BorusanDataProvider>{children}</BorusanDataProvider>;
}
