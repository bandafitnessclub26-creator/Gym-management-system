// import { useState, useEffect } from 'react';
// import { DashboardStats } from '../types';
// import { dashboardApi } from '../lib/api';

// export function useDashboard() {
//   const [stats, setStats] = useState<DashboardStats>({
//     totalMembers: 0,
//     paidMembers: 0,
//     pendingFees: 0,
//     monthlyCollection: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await dashboardApi.getStats();
//       setStats(data);
//     } catch (err) {
//       console.error('Error loading dashboard stats:', err);
//       setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadStats();
//   }, []);

//   return { stats, loading, error, refetch: loadStats };
// }




// import { useState, useEffect } from 'react';
// import { DashboardStats } from '../types';
// import { dashboardApi } from '../lib/api';

// export function useDashboard(selectedMonth: string) {
//   const [stats, setStats] = useState<DashboardStats>({
//     totalMembers: 0,
//     paidMembers: 0,
//     pendingFees: 0,
//     monthlyCollection: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // 👇 Selected month pass kar rahe hain API ko
//       const data = await dashboardApi.getStats(selectedMonth);

//       setStats(data);
//     } catch (err) {
//       console.error('Error loading dashboard stats:', err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : 'Failed to load dashboard stats'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 👇 Month change hote hi auto reload hoga
//   useEffect(() => {
//     loadStats();
//   }, [selectedMonth]);

//   return { stats, loading, error, refetch: loadStats };
// }



import { useState, useEffect } from 'react';
import { DashboardStats } from '../types';
import { dashboardApi } from '../lib/api';

export function useDashboard(selectedMonth: string) {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    paidMembers: 0,
    pendingFees: 0,
    monthlyCollection: 0,
  });

  const [paidMemberIds, setPaidMemberIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await dashboardApi.getStats(selectedMonth);

      // ✅ stats set karo
      setStats(data.stats);

      // ✅ month-wise paid members store karo
      setPaidMemberIds(data.paidMemberIds || []);

    } catch (err) {
      console.error('Error loading dashboard stats:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load dashboard stats'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [selectedMonth]);

  return {
    stats,
    paidMemberIds,   // 👈 important
    loading,
    error,
    refetch: loadStats,
  };
}
