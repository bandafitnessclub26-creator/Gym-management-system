



// import { useState } from 'react';
// import { Input } from '../components/ui/input';
// import { Button } from '../components/ui/button';
// import { Card, CardContent } from '../components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
// import { Search, Phone, Loader2, Trash2, MessageCircle } from 'lucide-react';
// import { AdminHeader } from '../components/AdminHeader';
// import { useMembers } from '../hooks/useMembers';
// import { membersApi } from '../lib/api';
// import { toast } from 'sonner';

// export function MembersListScreen() {

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState<'all' | 'paid' | 'due'>('all');
//   const [deletingId, setDeletingId] = useState<string | null>(null);

//   const { members, loading, refetch } = useMembers();

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const calculateRemainingDays = (member: any) => {
//     if (!member.fee_end_date) return 0;
//     const end = new Date(member.fee_end_date);
//     end.setHours(0, 0, 0, 0);
//     return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
//   };

//   const calculateProgress = (member: any) => {
//     if (!member.fee_start_date || !member.fee_end_date) return 0;

//     const start = new Date(member.fee_start_date);
//     const end = new Date(member.fee_end_date);

//     start.setHours(0,0,0,0);
//     end.setHours(0,0,0,0);

//     const total = end.getTime() - start.getTime();
//     const used = today.getTime() - start.getTime();

//     if (total <= 0) return 0;
//     if (used <= 0) return 0;
//     if (used >= total) return 100;

//     return Math.floor((used / total) * 100);
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Delete this member?")) return;

//     try {
//       setDeletingId(id);
//       await membersApi.delete(id);
//       toast.success("Member deleted");
//       refetch();
//     } catch {
//       toast.error("Delete failed");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const handleWhatsApp = (member: any) => {

//     const remainingDays = calculateRemainingDays(member);

//     let message;

//     if (remainingDays > 0) {
//       message = `Hi ${member.name}, your gym membership is active till ${new Date(member.fee_end_date).toLocaleDateString('en-IN')}. You have ${remainingDays} days remaining.\n\n- Banda Fitness Club`;
//     } else {
//       message = `Hi ${member.name}, your gym membership has expired. Please renew your membership.\n\n- Banda Fitness Club`;
//     }

//     const whatsappUrl = `https://wa.me/91${member.phone}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//     toast.success("Opening WhatsApp...");
//   };

//   const filteredMembers = members.filter(member => {

//     const matchesSearch =
//       searchQuery === '' ||
//       member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       member.phone.includes(searchQuery);

//     const status = member.fee_status || 'Pending';

//     const matchesFilter =
//       filter === 'all'
//         ? true
//         : filter === 'paid'
//         ? status === 'Paid'
//         : status !== 'Paid';

//     return matchesSearch && matchesFilter;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black pb-24">
//       <AdminHeader />

//       <div className="px-6 pt-6">

//         <div className="mb-6">
//           <h2 className="text-3xl text-white mb-2 font-black tracking-tight">
//             Members
//           </h2>
//           <p className="text-zinc-400 font-semibold">
//             {filteredMembers.length} total
//           </p>
//         </div>

//         {/* Search */}
//         <div className="relative mb-4">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//           <Input
//             type="text"
//             placeholder="Search by name or phone..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-12 pl-12 bg-zinc-900 border-zinc-800 text-white rounded-xl"
//           />
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex gap-3 mb-6">
//           {['all', 'paid', 'due'].map(type => (
//             <Button
//               key={type}
//               onClick={() => setFilter(type as any)}
//               className={`flex-1 h-12 rounded-xl font-bold ${
//                 filter === type
//                   ? type === 'due'
//                     ? 'bg-[#FF3B3B] text-white'
//                     : 'bg-[#39FF14] text-black'
//                   : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
//               }`}
//             >
//               {type === 'all' ? 'All' : type === 'paid' ? 'Paid' : 'Due'}
//             </Button>
//           ))}
//         </div>

//         <div className="space-y-4">
//           {filteredMembers.map(member => {

//             const remainingDays = calculateRemainingDays(member);
//             const progress = calculateProgress(member);

//             const joinDate = member.join_date
//               ? new Date(member.join_date).toLocaleDateString('en-IN')
//               : '-';

//             const endDate = member.fee_end_date
//               ? new Date(member.fee_end_date).toLocaleDateString('en-IN')
//               : '-';

//             return (
//               <Card key={member.id} className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl">
//                 <CardContent className="p-5">

//                   <div className="flex justify-between items-start mb-4">

//                     <div className="flex gap-4">
//                       <Avatar className="w-14 h-14 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
//                         {member.profile_url ? (
//                           <AvatarImage src={member.profile_url} />
//                         ) : (
//                           <AvatarFallback className="bg-transparent text-black font-bold">
//                             {member.name.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         )}
//                       </Avatar>

//                       <div>
//                         <h3 className="text-white text-lg font-bold">{member.name}</h3>
//                         <div className="flex items-center gap-2 text-zinc-400 text-sm">
//                           <Phone className="w-3 h-3" />
//                           {member.phone}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       <Button
//                         onClick={() => handleWhatsApp(member)}
//                         className="bg-[#25D366] text-white rounded-xl"
//                       >
//                         <MessageCircle className="w-4 h-4" />
//                       </Button>

//                       <Button
//                         onClick={() => handleDelete(member.id)}
//                         disabled={deletingId === member.id}
//                         className="bg-[#FF3B3B]/20 text-[#FF3B3B] hover:bg-[#FF3B3B] hover:text-white rounded-xl"
//                       >
//                         {deletingId === member.id
//                           ? <Loader2 className="w-4 h-4 animate-spin" />
//                           : <Trash2 className="w-4 h-4" />}
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="text-sm text-zinc-400 mb-3">
//                     <div>Joining: <span className="text-white">{joinDate}</span></div>
//                     <div>Valid Till: <span className="text-white">{endDate}</span></div>
//                   </div>

//                   <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden mb-2">
//                     <div
//                       className={`h-full transition-all duration-500 ${
//                         progress < 80
//                           ? 'bg-[#39FF14]'
//                           : progress < 100
//                           ? 'bg-yellow-500'
//                           : 'bg-[#FF3B3B]'
//                       }`}
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>

//                   <div className="text-sm font-semibold">
//                     {remainingDays > 0 ? (
//                       <span className="text-[#39FF14]">
//                         {remainingDays} days remaining
//                       </span>
//                     ) : (
//                       <span className="text-[#FF3B3B]">
//                         Expired
//                       </span>
//                     )}
//                   </div>

//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }








import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Search, Phone, Loader2, Trash2, MessageCircle } from 'lucide-react';
import { AdminHeader } from '../components/AdminHeader';
import { useMembersContext } from "../../context/MembersContext";

import { membersApi } from '../lib/api';
import { toast } from 'sonner';

export function MembersListScreen() {

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'paid' | 'due'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ GLOBAL CONTEXT DATA
  const { members, loading, refresh } = useMembersContext();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calculateRemainingDays = (member: any) => {
    if (!member.fee_end_date) return 0;
    const end = new Date(member.fee_end_date);
    end.setHours(0, 0, 0, 0);
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateProgress = (member: any) => {
    if (!member.fee_start_date || !member.fee_end_date) return 0;

    const start = new Date(member.fee_start_date);
    const end = new Date(member.fee_end_date);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const total = end.getTime() - start.getTime();
    const used = today.getTime() - start.getTime();

    if (total <= 0) return 0;
    if (used <= 0) return 0;
    if (used >= total) return 100;

    return Math.floor((used / total) * 100);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      setDeletingId(id);
      await membersApi.delete(id);
      toast.success("Member deleted");

      // ✅ Refresh context after delete
      await refresh();

    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const handleWhatsApp = (member: any) => {

    const remainingDays = calculateRemainingDays(member);

    let message;

    if (remainingDays > 0) {
      message = `Hi ${member.name}, your gym membership is active till ${new Date(member.fee_end_date).toLocaleDateString('en-IN')}. You have ${remainingDays} days remaining.\n\n- Banda Fitness Club`;
    } else {
      message = `Hi ${member.name}, your gym membership has expired. Please renew your membership.\n\n- Banda Fitness Club`;
    }

    const whatsappUrl = `https://wa.me/91${member.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp...");
  };

  const filteredMembers = members.filter(member => {

    const matchesSearch =
      searchQuery === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);

    const status = member.fee_status || 'Pending';

    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'paid'
        ? status === 'Paid'
        : status !== 'Paid';

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      <AdminHeader />

      <div className="px-6 pt-6">

        <div className="mb-6">
          <h2 className="text-3xl text-white mb-2 font-black tracking-tight">
            Members
          </h2>
          <p className="text-zinc-400 font-semibold">
            {filteredMembers.length} total
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 bg-zinc-900 border-zinc-800 text-white rounded-xl"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-6">
          {['all', 'paid', 'due'].map(type => (
            <Button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`flex-1 h-12 rounded-xl font-bold ${
                filter === type
                  ? type === 'due'
                    ? 'bg-[#FF3B3B] text-white'
                    : 'bg-[#39FF14] text-black'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
              }`}
            >
              {type === 'all' ? 'All' : type === 'paid' ? 'Paid' : 'Due'}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredMembers.map(member => {

            const remainingDays = calculateRemainingDays(member);
            const progress = calculateProgress(member);

            const joinDate = member.join_date
              ? new Date(member.join_date).toLocaleDateString('en-IN')
              : '-';

            const endDate = member.fee_end_date
              ? new Date(member.fee_end_date).toLocaleDateString('en-IN')
              : '-';

            return (
              <Card key={member.id} className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl">
                <CardContent className="p-5">

                  <div className="flex justify-between items-start mb-4">

                    <div className="flex gap-4">
                      <Avatar className="w-14 h-14 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
                        {member.profile_url ? (
                          <AvatarImage src={member.profile_url} />
                        ) : (
                          <AvatarFallback className="bg-transparent text-black font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div>
                        <h3 className="text-white text-lg font-bold">{member.name}</h3>
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleWhatsApp(member)}
                        className="bg-[#25D366] text-white rounded-xl"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>

                      <Button
                        onClick={() => handleDelete(member.id)}
                        disabled={deletingId === member.id}
                        className="bg-[#FF3B3B]/20 text-[#FF3B3B] hover:bg-[#FF3B3B] hover:text-white rounded-xl"
                      >
                        {deletingId === member.id
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <Trash2 className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-zinc-400 mb-3">
                    <div>Joining: <span className="text-white">{joinDate}</span></div>
                    <div>Valid Till: <span className="text-white">{endDate}</span></div>
                  </div>

                  <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden mb-2">
                    <div
                      className={`h-full transition-all duration-500 ${
                        progress < 80
                          ? 'bg-[#39FF14]'
                          : progress < 100
                          ? 'bg-yellow-500'
                          : 'bg-[#FF3B3B]'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="text-sm font-semibold">
                    {remainingDays > 0 ? (
                      <span className="text-[#39FF14]">
                        {remainingDays} days remaining
                      </span>
                    ) : (
                      <span className="text-[#FF3B3B]">
                        Expired
                      </span>
                    )}
                  </div>

                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
