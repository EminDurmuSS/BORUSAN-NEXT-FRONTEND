"use client";

import {
  Phone,
  CalendarCheck,
  CalendarX,
  PhoneCall,
  PhoneOff,
  ArrowUpRight,
} from "lucide-react";
import { getDispositionStats } from "@/lib/mock-data";
import { useBorusanData } from "@/hooks/use-borusan-data";

export function StatsCards() {
  const { dispositions } = useBorusanData();
  const stats = getDispositionStats(dispositions);
  const total = dispositions.length;

  const cards = [
  {
    label: "Toplam Arama",
    value: total,
    icon: Phone,
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconColor: "text-white",
    accentColor: "text-blue-600",
    ringColor: "ring-blue-100",
  },
  {
    label: "Randevu Alındı",
    value: stats["RANDEVU_ALINDI"] || 0,
    icon: CalendarCheck,
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-gradient-to-br from-emerald-50 to-teal-50",
    iconColor: "text-white",
    accentColor: "text-emerald-600",
    ringColor: "ring-emerald-100",
    pct: true,
  },
  {
    label: "Randevu Alınmadı",
    value: stats["RANDEVU_ALMADI"] || 0,
    icon: CalendarX,
    gradient: "from-rose-500 to-red-600",
    lightBg: "bg-gradient-to-br from-rose-50 to-red-50",
    iconColor: "text-white",
    accentColor: "text-rose-600",
    ringColor: "ring-rose-100",
    pct: true,
  },
  {
    label: "Callback Bekliyor",
    value: stats["CALLBACK_ISTEDI"] || 0,
    icon: PhoneCall,
    gradient: "from-amber-500 to-orange-500",
    lightBg: "bg-gradient-to-br from-amber-50 to-orange-50",
    iconColor: "text-white",
    accentColor: "text-amber-600",
    ringColor: "ring-amber-100",
    pct: true,
  },
  {
    label: "Ulaşılamadı",
    value: stats["ULASILAMADI"] || 0,
    icon: PhoneOff,
    gradient: "from-slate-500 to-slate-600",
    lightBg: "bg-gradient-to-br from-slate-50 to-gray-100",
    iconColor: "text-white",
    accentColor: "text-slate-600",
    ringColor: "ring-slate-200",
    pct: true,
  },
];

  return (
    <div className="stagger-children grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const pct = card.pct
          ? Math.round((card.value / total) * 100)
          : undefined;
        return (
          <div
            key={card.label}
            className={`hover-lift group relative overflow-hidden rounded-2xl ${card.lightBg} p-5 ring-1 ${card.ringColor}`}
          >
            {/* Decorative circle */}
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-[0.07]`} />

            <div className="relative flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg shadow-black/10`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
              {pct !== undefined && (
                <div className={`flex items-center gap-0.5 ${card.accentColor}`}>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold tabular-nums">
                    {pct}%
                  </span>
                </div>
              )}
            </div>

            <div className="relative mt-4">
              <p className="text-3xl font-extrabold tabular-nums tracking-tight text-slate-900">
                {card.value}
              </p>
              <p className="mt-1 text-[12px] font-semibold text-slate-500">
                {card.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
