"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AppointmentTable } from "@/components/dashboard/appointment-table";
import { DispositionChart } from "@/components/dashboard/disposition-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { LocationBreakdown } from "@/components/dashboard/location-breakdown";
import { NewRecordToast } from "@/components/dashboard/new-record-toast";
import { useBorusanData } from "@/hooks/use-borusan-data";
import { RotateCcw, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { lastUpdated, refreshData, resetData } = useBorusanData();
  const [resetOpen, setResetOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const lastUpdatedText = lastUpdated
    ? `Son güncelleme: ${lastUpdated.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
    : "Yükleniyor...";

  async function handleReset() {
    setResetting(true);
    try {
      await resetData();
    } finally {
      setResetting(false);
      setResetOpen(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 flex items-end justify-between animate-fade-in-up">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Ekspertiz randevularınızı ve arama performansınızı takip edin.
            </p>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <p className="text-xs font-medium text-slate-400">
              {lastUpdatedText}
            </p>
            <button
              type="button"
              disabled={refreshing}
              onClick={async () => {
                setRefreshing(true);
                try { await refreshData(); } finally { setRefreshing(false); }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
              Yenile
            </button>
            <button
              type="button"
              onClick={() => setResetOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <RotateCcw className="h-3 w-3" />
              Sıfırla
            </button>
          </div>
        </div>

        {/* Reset Confirmation Dialog */}
        <Dialog open={resetOpen} onOpenChange={setResetOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Verileri Sıfırla</DialogTitle>
              <DialogDescription>
                Tüm test verileri silinecek ve orijinal demo verileri (8 randevu + 18 arama sonucu) yeniden yüklenecek. Bu işlem geri alınamaz.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setResetOpen(false)}
                disabled={resetting}
              >
                Vazgeç
              </Button>
              <Button
                variant="destructive"
                onClick={handleReset}
                disabled={resetting}
              >
                {resetting ? (
                  <>
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Sıfırlanıyor...
                  </>
                ) : (
                  "Evet, Sıfırla"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* KPI Cards */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* Charts + Activity row */}
        <div className="mb-8 grid gap-6 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <DispositionChart />
          </div>
          <div className="lg:col-span-3">
            <RecentActivity />
          </div>
        </div>

        {/* Table + Location row */}
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AppointmentTable />
          </div>
          <div className="lg:col-span-2">
            <LocationBreakdown />
          </div>
        </div>
      </main>
      <NewRecordToast />
    </div>
  );
}
