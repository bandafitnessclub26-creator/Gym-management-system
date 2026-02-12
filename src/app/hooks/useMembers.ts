// import { useState, useEffect } from 'react';
// import { Member } from '../types';
// import { membersApi } from '../lib/api';

// export function useMembers() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadMembers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await membersApi.getAll();
//       // Filter out null/invalid members and parse dates from ISO strings
//       const parsedData = data
//         .filter(m => m && m.id && m.name) // Filter out null or incomplete members
//         .map(m => ({
//           ...m,
//           joinDate: m.joinDate ? new Date(m.joinDate) : new Date(),
//           feeStartDate: m.feeStartDate ? new Date(m.feeStartDate) : new Date(),
//           feeEndDate: m.feeEndDate ? new Date(m.feeEndDate) : new Date(),
//           lastPaymentDate: m.lastPaymentDate ? new Date(m.lastPaymentDate) : new Date(),
//           nextDueDate: m.nextDueDate ? new Date(m.nextDueDate) : new Date(),
//         }));
//       setMembers(parsedData);
//     } catch (err) {
//       console.error('Error loading members:', err);
//       setError(err instanceof Error ? err.message : 'Failed to load members');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMembers();
//   }, []);

//   return { members, loading, error, refetch: loadMembers };
// }

// export function useMember(id: string | undefined) {
//   const [member, setMember] = useState<Member | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadMember = async () => {
//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       const data = await membersApi.getById(id);
//       if (data) {
//         // Parse dates from ISO strings
//         setMember({
//           ...data,
//           joinDate: new Date(data.joinDate),
//           feeStartDate: new Date(data.feeStartDate),
//           feeEndDate: new Date(data.feeEndDate),
//           lastPaymentDate: new Date(data.lastPaymentDate),
//           nextDueDate: new Date(data.nextDueDate),
//         });
//       }
//     } catch (err) {
//       console.error('Error loading member:', err);
//       setError(err instanceof Error ? err.message : 'Failed to load member');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMember();
//   }, [id]);

//   return { member, loading, error, refetch: loadMember };
// }

// import { useState, useEffect } from 'react';
// import { Member } from '../types';
// import { membersApi } from '../lib/api';

// export function useMembers() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadMembers = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await membersApi.getAll();

//       const parsedData = (data || [])
//         .filter(m => m && m.id && m.name)
//         .map((m: any) => ({
//           ...m,

//           // 🔥 FIX: Map snake_case to camelCase properly
//           joinDate: m.join_date ? new Date(m.join_date) : null,
//           feeStartDate: m.fee_start_date ? new Date(m.fee_start_date) : null,
//           feeEndDate: m.fee_end_date ? new Date(m.fee_end_date) : null,

//           // Keep original too (optional safety)
//           fee_status: m.fee_status,
//           monthly_fee: m.monthly_fee,
//         }));

//       setMembers(parsedData);
//     } catch (err) {
//       console.error('Error loading members:', err);
//       setError(err instanceof Error ? err.message : 'Failed to load members');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMembers();
//   }, []);

//   return { members, loading, error, refetch: loadMembers };
// }

// export function useMember(id: string | undefined) {
//   const [member, setMember] = useState<Member | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadMember = async () => {
//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const data: any = await membersApi.getById(id);

//       if (data) {
//         setMember({
//           ...data,

//           // 🔥 FIX snake_case mapping
//           joinDate: data.join_date ? new Date(data.join_date) : null,
//           feeStartDate: data.fee_start_date ? new Date(data.fee_start_date) : null,
//           feeEndDate: data.fee_end_date ? new Date(data.fee_end_date) : null,
//         });
//       }
//     } catch (err) {
//       console.error('Error loading member:', err);
//       setError(err instanceof Error ? err.message : 'Failed to load member');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMember();
//   }, [id]);

//   return { member, loading, error, refetch: loadMember };
// }


// import { useState, useEffect } from 'react';
// import { Member } from '../types';
// import { membersApi } from '../lib/api';

// export function useMembers() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadMembers = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await membersApi.getAll();

//       const parsedData = data.map((m: any) => ({
//         ...m,

//         // 🔥 FIX: Map snake_case → camelCase properly
//         feeStartDate: m.fee_start_date
//           ? new Date(m.fee_start_date)
//           : null,

//         feeEndDate: m.fee_end_date
//           ? new Date(m.fee_end_date)
//           : null,

//         feeStatus: m.fee_status || 'Pending',

//         joinDate: m.join_date
//           ? new Date(m.join_date)
//           : new Date(),
//       }));

//       setMembers(parsedData);
//     } catch (err) {
//       console.error('Error loading members:', err);
//       setError(err instanceof Error ? err.message : 'Failed to load members');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMembers();
//   }, []);

//   return { members, loading, error, refetch: loadMembers };
// }


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

      const parsedData = data
  .filter(m => m && m.id && m.name)
  .map(m => ({
    ...m,

    joinDate: m.join_date
      ? new Date(m.join_date + "Z")
      : null,

    feeStartDate: m.fee_start_date
      ? new Date(m.fee_start_date + "Z")
      : null,

    feeEndDate: m.fee_end_date
      ? new Date(m.fee_end_date + "Z")
      : null,

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

          joinDate: data.join_date
            ? new Date(data.join_date)
            : new Date(),

          feeStartDate: data.fee_start_date
            ? new Date(data.fee_start_date)
            : null,

          feeEndDate: data.fee_end_date
            ? new Date(data.fee_end_date)
            : null,

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




