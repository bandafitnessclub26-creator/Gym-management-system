// import { Member, Payment, DashboardStats } from '../types';
// import { projectId, publicAnonKey } from '/utils/supabase/info';

// const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-fc398616`;

// // Helper function to make API calls
// async function apiCall(endpoint: string, options: RequestInit = {}) {
//   const response = await fetch(`${API_BASE}${endpoint}`, {
//     ...options,
//     headers: {
//       'Authorization': `Bearer ${publicAnonKey}`,
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(error || 'API request failed');
//   }

//   return response.json();
// }

// // Members API
// export const membersApi = {
//   getAll: async (): Promise<Member[]> => {
//     try {
//       const data = await apiCall('/members');
//       const members = data.members || [];
//       // Filter out any null or invalid members
//       return members.filter((m: any) => m && m.id && m.name);
//     } catch (error) {
//       console.error('Error fetching members:', error);
//       return [];
//     }
//   },

//   getById: async (id: string): Promise<Member | null> => {
//     try {
//       const data = await apiCall(`/members/${id}`);
//       return data.member || null;
//     } catch (error) {
//       console.error('Error fetching member:', error);
//       return null;
//     }
//   },

//   create: async (member: Omit<Member, 'id'>): Promise<Member> => {
//     const data = await apiCall('/members', {
//       method: 'POST',
//       body: JSON.stringify(member),
//     });
//     return data.member;
//   },

//   update: async (id: string, member: Partial<Member>): Promise<Member> => {
//     const data = await apiCall(`/members/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(member),
//     });
//     return data.member;
//   },

//   delete: async (id: string): Promise<void> => {
//     await apiCall(`/members/${id}`, {
//       method: 'DELETE',
//     });
//   },
// };

// // Payments API
// export const paymentsApi = {
//   getAll: async (): Promise<Payment[]> => {
//     const data = await apiCall('/payments');
//     return data.payments || [];
//   },

//   getByMemberId: async (memberId: string): Promise<Payment[]> => {
//     const data = await apiCall(`/payments/member/${memberId}`);
//     return data.payments || [];
//   },

//   create: async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
//     const data = await apiCall('/payments', {
//       method: 'POST',
//       body: JSON.stringify(payment),
//     });
//     return data.payment;
//   },
// };

// // Dashboard API
// export const dashboardApi = {
//   getStats: async (): Promise<DashboardStats> => {
//     const data = await apiCall('/dashboard/stats');
//     return data.stats;
//   },
// };





// import { Member, Payment, DashboardStats } from '../types';
// import { projectId, publicAnonKey } from '/utils/supabase/info';

// // ✅ FIXED: Correct function name
// const API_BASE = `https://${projectId}.supabase.co/functions/v1/server`;

// // Helper function to make API calls
// async function apiCall(endpoint: string, options: RequestInit = {}) {
//   try {
//     const response = await fetch(`${API_BASE}${endpoint}`, {
//       ...options,
//       headers: {
//         'Authorization': `Bearer ${publicAnonKey}`,
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('API Error:', errorText);
//       throw new Error(`API Error ${response.status}: ${errorText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Network/API failure:', error);
//     throw error;
//   }
// }

// // Members API
// export const membersApi = {
//   getAll: async (): Promise<Member[]> => {
//     const data = await apiCall('/members');
//     return data?.members ?? [];
//   },

//   getById: async (id: string): Promise<Member | null> => {
//     const data = await apiCall(`/members/${id}`);
//     return data?.member ?? null;
//   },

//   create: async (member: Omit<Member, 'id'>): Promise<Member> => {
//     const data = await apiCall('/members', {
//       method: 'POST',
//       body: JSON.stringify(member),
//     });
//     return data?.member;
//   },

//   update: async (id: string, member: Partial<Member>): Promise<Member> => {
//     const data = await apiCall(`/members/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(member),
//     });
//     return data?.member;
//   },

//   delete: async (id: string): Promise<void> => {
//     await apiCall(`/members/${id}`, {
//       method: 'DELETE',
//     });
//   },
// };

// // Payments API
// export const paymentsApi = {
//   getAll: async (): Promise<Payment[]> => {
//     const data = await apiCall('/payments');
//     return data?.payments ?? [];
//   },

//   getByMemberId: async (memberId: string): Promise<Payment[]> => {
//     const data = await apiCall(`/payments/member/${memberId}`);
//     return data?.payments ?? [];
//   },

//   create: async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
//     const data = await apiCall('/payments', {
//       method: 'POST',
//       body: JSON.stringify(payment),
//     });
//     return data?.payment;
//   },
// };

// // Dashboard API
// export const dashboardApi = {
//   getStats: async (): Promise<DashboardStats> => {
//     const data = await apiCall('/dashboard/stats');
//     return data?.stats;
//   },
// };



// import { Member, Payment, DashboardStats } from '../types';
// import { projectId, publicAnonKey } from '/utils/supabase/info';

// const API_BASE = `https://${projectId}.supabase.co/functions/v1/server`;

// // =============================
// // COMMON API CALL
// // =============================
// async function apiCall(endpoint: string, options: RequestInit = {}) {
//   try {
//     const response = await fetch(`${API_BASE}${endpoint}`, {
//       ...options,
//       headers: {
//         Authorization: `Bearer ${publicAnonKey}`,
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('API Error:', errorText);
//       throw new Error(`API Error ${response.status}: ${errorText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Network/API failure:', error);
//     throw error;
//   }
// }

// // =============================
// // MEMBERS API
// // =============================
// export const membersApi = {
//   getAll: async (): Promise<Member[]> => {
//     const data = await apiCall('/members');
//     return data?.members ?? [];
//   },

//   create: async (member: any): Promise<Member> => {
//     const data = await apiCall('/members', {
//       method: 'POST',
//       body: JSON.stringify(member),
//     });
//     return data?.member;
//   },
// };

// // =============================
// // PAYMENTS API
// // =============================
// export const paymentsApi = {
//   create: async (payment: any): Promise<Payment> => {
//     const data = await apiCall('/payments', {
//       method: 'POST',
//       body: JSON.stringify(payment),
//     });
//     return data?.payment;
//   },
// };

// // =============================
// // DASHBOARD API (FIXED)
// // =============================
// export const dashboardApi = {
//   getStats: async (): Promise<DashboardStats> => {
//     const response = await apiCall('/dashboard'); // ✅ FIXED HERE

//     if (!response || !response.stats) {
//       return {
//         totalMembers: 0,
//         paidMembers: 0,
//         pendingFees: 0,
//         monthlyCollection: 0,
//       };
//     }

//     return {
//       totalMembers: response.stats.totalMembers || 0,
//       paidMembers: response.stats.paidMembers || 0,
//       pendingFees: response.stats.pendingFees || 0,
//       monthlyCollection: response.stats.monthlyCollection || 0,
//     };
//   },
// };


// import { Member, Payment, DashboardStats } from '../types';
// import { projectId, publicAnonKey } from '/utils/supabase/info';

// const API_BASE = `https://${projectId}.supabase.co/functions/v1/server`;

// async function apiCall(endpoint: string, options: RequestInit = {}) {
//   const response = await fetch(`${API_BASE}${endpoint}`, {
//     ...options,
//     headers: {
//       Authorization: `Bearer ${publicAnonKey}`,
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`API Error ${response.status}: ${errorText}`);
//   }

//   return response.json();
// }

// // ======================
// // MEMBERS API (FIXED)
// // ======================
// export const membersApi = {
//   getAll: async (): Promise<Member[]> => {
//     const data = await apiCall('/members');

//     if (!data?.members) return [];

//     // 🔥 IMPORTANT: snake_case → camelCase mapping
//     return data.members.map((m: any) => ({
//       id: m.id,
//       name: m.name,
//       phone: m.phone,
//       email: m.email,
//       plan: m.plan,
//       monthlyFee: m.monthly_fee,
//       profilePicture: m.profile_url,

//       feeStartDate: m.fee_start_date,
//       feeEndDate: m.fee_end_date,
//       feeStatus: m.fee_status,
//     }));
//   },

//   create: async (member: any): Promise<Member> => {
//     const data = await apiCall('/members', {
//       method: 'POST',
//       body: JSON.stringify(member),
//     });
//     return data?.member;
//   },
// };

// // ======================
// // PAYMENTS API
// // ======================
// export const paymentsApi = {
//   create: async (payment: any): Promise<Payment> => {
//     const data = await apiCall('/payments', {
//       method: 'POST',
//       body: JSON.stringify(payment),
//     });
//     return data?.payment;
//   },
// };

// // ======================
// // DASHBOARD API
// // ======================
// export const dashboardApi = {
//   getStats: async (): Promise<DashboardStats> => {
//     const response = await apiCall('/dashboard');

//     if (!response?.stats) {
//       return {
//         totalMembers: 0,
//         paidMembers: 0,
//         pendingFees: 0,
//         monthlyCollection: 0,
//       };
//     }

//     return response.stats;
//   },
// };



import { Member, Payment } from '../types';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/server`;

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API Error');
  }

  return response.json();
}

// =====================================================
// MEMBERS API
// =====================================================
export const membersApi = {
  getAll: async (): Promise<Member[]> => {
    const data = await apiCall('/members');
    return data?.members ?? [];
  },

  getById: async (id: string): Promise<Member | null> => {
    const data = await apiCall(`/members/${id}`);
    return data?.member ?? null;
  },

  create: async (member: Omit<Member, 'id'>): Promise<Member> => {
    const data = await apiCall('/members', {
      method: 'POST',
      body: JSON.stringify(member),
    });
    return data?.member;
  },

  update: async (id: string, member: Partial<Member>): Promise<Member> => {
    const data = await apiCall(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
    return data?.member;
  },

  delete: async (id: string): Promise<void> => {
    await apiCall(`/members/${id}`, {
      method: 'DELETE',
    });
  },
};

// =====================================================
// PAYMENTS API
// =====================================================
export const paymentsApi = {
  getAll: async (): Promise<Payment[]> => {
    const data = await apiCall('/payments');
    return data?.payments ?? [];
  },

  getByMemberId: async (memberId: string): Promise<Payment[]> => {
    const data = await apiCall(`/payments/member/${memberId}`);
    return data?.payments ?? [];
  },

  create: async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
    const data = await apiCall('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
    return data?.payment;
  },
};

// =====================================================
// DASHBOARD API (FINAL FIXED VERSION)
// =====================================================
export const dashboardApi = {
  getStats: async (month: string) => {
    const data = await apiCall(`/dashboard?month=${month}`);
    return data; // 👈 FULL response return
  },
};
