"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Appointment, Disposition } from "@/types";
import {
  appointments as mockAppointments,
  dispositions as mockDispositions,
} from "@/lib/mock-data";
import {
  fetchAppointments,
  fetchDispositions,
  mapApiAppointment,
  mapApiDisposition,
} from "@/lib/api";
import React from "react";

const POLL_INTERVAL = 5000;
const RESET_URL = "https://borusan-next-demo.freyavoice.workers.dev/test/reset";

interface BorusanData {
  appointments: Appointment[];
  dispositions: Disposition[];
  lastUpdated: Date | null;
  refreshData: () => Promise<void>;
  resetData: () => Promise<void>;
}

const BorusanDataContext = createContext<BorusanData>({
  appointments: mockAppointments,
  dispositions: mockDispositions,
  lastUpdated: null,
  refreshData: async () => {},
  resetData: async () => {},
});

export function BorusanDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<Omit<BorusanData, "resetData" | "refreshData">>({
    appointments: mockAppointments,
    dispositions: mockDispositions,
    lastUpdated: null,
  });

  const isMounted = useRef(true);

  const fullRefresh = useCallback(async () => {
    try {
      const [apiApts, apiDisps] = await Promise.all([
        fetchAppointments(),
        fetchDispositions(),
      ]);

      if (!isMounted.current) return;

      const appointments = apiApts.map(mapApiAppointment);
      const dispositions = apiDisps.map(mapApiDisposition);

      setData({
        appointments: appointments.length > 0 ? appointments : mockAppointments,
        dispositions: dispositions.length > 0 ? dispositions : mockDispositions,
        lastUpdated: new Date(),
      });
    } catch {
      // Keep current data on error
    }
  }, []);

  const poll = useCallback(async () => {
    try {
      const [apiApts, apiDisps] = await Promise.all([
        fetchAppointments(),
        fetchDispositions(),
      ]);

      if (!isMounted.current) return;

      setData((prev) => {
        const existingAptIds = new Set(prev.appointments.map((a) => a.id));
        const newApts = apiApts
          .map(mapApiAppointment)
          .filter((a) => !existingAptIds.has(a.id));

        const existingDispIds = new Set(prev.dispositions.map((d) => d.id));
        const newDisps = apiDisps
          .map(mapApiDisposition)
          .filter((d) => !existingDispIds.has(d.id));

        if (newApts.length === 0 && newDisps.length === 0) {
          return { ...prev, lastUpdated: new Date() };
        }

        return {
          appointments: [...prev.appointments, ...newApts],
          dispositions: [...prev.dispositions, ...newDisps],
          lastUpdated: new Date(),
        };
      });
    } catch {
      // Silently ignore fetch errors — mock data stays intact
    }
  }, []);

  const resetData = useCallback(async () => {
    const res = await fetch(RESET_URL, { method: "POST" });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || "Reset failed");
    await fullRefresh();
  }, [fullRefresh]);

  useEffect(() => {
    isMounted.current = true;

    // Initial fetch
    poll();

    const interval = setInterval(poll, POLL_INTERVAL);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [poll]);

  const value = React.useMemo(
    () => ({ ...data, refreshData: fullRefresh, resetData }),
    [data, fullRefresh, resetData]
  );

  return React.createElement(
    BorusanDataContext.Provider,
    { value },
    children
  );
}

export function useBorusanData() {
  return useContext(BorusanDataContext);
}
