import { createContext, useContext, useEffect, useState } from "react";
import { dashboardApi } from "../app/lib/api";
import { getCurrentMonth } from "../app/utils/monthProgress";

interface Stats {
  totalMembers: number;
  paidMembers: number;
  pendingFees: number;
  monthlyCollection: number;
}

interface DashboardContextType {
  stats: Stats;
  loading: boolean;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  refresh: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<Stats>({
    totalMembers: 0,
    paidMembers: 0,
    pendingFees: 0,
    monthlyCollection: 0,
  });

  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadDashboard = async () => {
    setLoading(true);
    const data = await dashboardApi.getStats(selectedMonth);
    setStats(data?.stats || {});
    setLoading(false);
    setHasLoaded(true);
  };

  useEffect(() => {
    if (!hasLoaded) {
      loadDashboard();
    }
  }, []);

  // Reload only when month changes
  useEffect(() => {
    if (hasLoaded) {
      loadDashboard();
    }
  }, [selectedMonth]);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        loading,
        selectedMonth,
        setSelectedMonth,
        refresh: loadDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used inside DashboardProvider");
  }
  return context;
}
