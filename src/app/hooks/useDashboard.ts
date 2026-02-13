

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

//   const [paidMemberIds, setPaidMemberIds] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await dashboardApi.getStats(selectedMonth);

//       // ✅ stats set karo
//       setStats(data.stats);

//       // ✅ month-wise paid members store karo
//       setPaidMemberIds(data.paidMemberIds || []);

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

//   useEffect(() => {
//     loadStats();
//   }, [selectedMonth]);

//   return {
//     stats,
//     paidMemberIds,   // 👈 important
//     loading,
//     error,
//     refetch: loadStats,
//   };
// }


import { useState, useEffect } from 'react';
import { DashboardStats, Member } from '../types';
import { dashboardApi } from '../lib/api';

export function useDashboard(selectedMonth: string) {

  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    paidMembers: 0,
    pendingFees: 0,
    monthlyCollection: 0,
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await dashboardApi.getStats(selectedMonth);

      setStats(data?.stats || {
        totalMembers: 0,
        paidMembers: 0,
        pendingFees: 0,
        monthlyCollection: 0,
      });

      // 🔥 IMPORTANT: members store karo
      setMembers(data?.members || []);

    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      loadStats();
    }
  }, [selectedMonth]);

  return {
    stats,
    members,   // 👈 now available
    loading,
    error,
    refetch: loadStats,
  };
}
