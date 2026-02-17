





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

  create: async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
    const data = await apiCall('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
    return data?.payment;
  },
};

// =====================================================
// DASHBOARD API
// =====================================================
export const dashboardApi = {
  getStats: async (month: string) => {
    const data = await apiCall(`/dashboard?month=${month}`);
    return data;
  },
};