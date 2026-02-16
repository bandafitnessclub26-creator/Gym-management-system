





import { useState, useEffect } from 'react';
import { Member } from '../types';
import { membersApi } from '../lib/api';

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await membersApi.getAll();

      const parsedData = (data || [])
        .filter(m => m && m.id && m.name)
        .map(m => ({
          ...m,
          joinDate: m.join_date ? new Date(m.join_date) : null,
          feeStartDate: m.fee_start_date ? new Date(m.fee_start_date) : null,
          feeEndDate: m.fee_end_date ? new Date(m.fee_end_date) : null,
          feeStatus: m.fee_status || "Pending",
        }));

      setMembers(parsedData);
    } catch (err) {
      console.error('Error loading members:', err);
      setError(err instanceof Error ? err.message : 'Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return { members, loading, error, refetch: loadMembers };
}


// ======================================================
// SINGLE MEMBER HOOK (RESTORED)
// ======================================================

export function useMember(id: string | undefined) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMember = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await membersApi.getById(id);

      if (data) {
        setMember({
          ...data,
          joinDate: data.join_date ? new Date(data.join_date) : null,
          feeStartDate: data.fee_start_date ? new Date(data.fee_start_date) : null,
          feeEndDate: data.fee_end_date ? new Date(data.fee_end_date) : null,
          feeStatus: data.fee_status || 'Pending',
        });
      }
    } catch (err) {
      console.error('Error loading member:', err);
      setError(err instanceof Error ? err.message : 'Failed to load member');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMember();
  }, [id]);

  return { member, loading, error, refetch: loadMember };
}

