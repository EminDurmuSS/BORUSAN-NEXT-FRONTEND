"use client";

import { useEffect, useRef, useState } from "react";
import { X, Bell } from "lucide-react";
import { useBorusanData } from "@/hooks/use-borusan-data";

interface ToastItem {
  id: string;
  message: string;
  timestamp: number;
}

export function NewRecordToast() {
  const { appointments, dispositions } = useBorusanData();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const prevAptCount = useRef(appointments.length);
  const prevDispCount = useRef(dispositions.length);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render (initial data load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevAptCount.current = appointments.length;
      prevDispCount.current = dispositions.length;
      return;
    }

    const newToasts: ToastItem[] = [];

    const newAptCount = appointments.length - prevAptCount.current;
    if (newAptCount > 0) {
      const latest = appointments[appointments.length - 1];
      newToasts.push({
        id: `apt-${Date.now()}`,
        message: `Yeni randevu: ${latest.musteri_adi} — ${latest.lokasyon}, ${latest.tarih}`,
        timestamp: Date.now(),
      });
    }

    const newDispCount = dispositions.length - prevDispCount.current;
    if (newDispCount > 0) {
      const latest = dispositions[dispositions.length - 1];
      newToasts.push({
        id: `dsp-${Date.now()}`,
        message: `Yeni arama sonucu: ${latest.musteri_adi}`,
        timestamp: Date.now(),
      });
    }

    prevAptCount.current = appointments.length;
    prevDispCount.current = dispositions.length;

    if (newToasts.length > 0) {
      setToasts((prev) => [...prev, ...newToasts]);
    }
  }, [appointments.length, dispositions.length, appointments, dispositions]);

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => Date.now() - t.timestamp < 8000));
    }, 8000);
    return () => clearTimeout(timer);
  }, [toasts]);

  function dismiss(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in-up flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/[0.08]"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
            <Bell className="h-3.5 w-3.5 text-blue-600" />
          </div>
          <p className="text-[12px] font-medium text-slate-700">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="ml-2 shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
