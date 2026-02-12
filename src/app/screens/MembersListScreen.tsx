// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Input } from '../components/ui/input';
// import { Button } from '../components/ui/button';
// import { Card, CardContent } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
// import { Search, Phone, Loader2, MessageCircle } from 'lucide-react';
// import { AdminHeader } from '../components/AdminHeader';
// import { useMembers } from '../hooks/useMembers';
// import { FeeProgressBar } from '../components/FeeProgressBar';
// import { toast } from 'sonner';

// export function MembersListScreen() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState<'all' | 'paid' | 'due'>('all');
//   const { members, loading, error } = useMembers();

//   console.log('Members data:', { members, loading, error, count: members.length });

//   const filteredMembers = members.filter(member => {
//     const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       member.phone.includes(searchQuery);

//     const matchesFilter =
//       filter === 'all' ? true :
//       filter === 'paid' ? member.feeStatus === 'Paid' :
//       member.feeStatus !== 'Paid';

//     return matchesSearch && matchesFilter;
//   });

//   const handleWhatsApp = (member: typeof members[0]) => {
//     const message = `Hi ${member.name}, this is a reminder from Banda Fitness Club. Your membership fee is ${member.feeStatus.toLowerCase()}.`;
//     const whatsappUrl = `https://wa.me/918960653217?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//     toast.success('Opening WhatsApp...');
//   };

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

//       {/* Content */}
//       <div className="px-6 pt-6">
//         <div className="mb-6">
//           <h2 className="text-3xl text-white mb-2 font-black tracking-tight">Members</h2>
//           <p className="text-zinc-400 font-semibold">{filteredMembers.length} total</p>
//         </div>

//         {/* Search Bar */}
//         <div className="relative mb-4">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//           <Input
//             type="text"
//             placeholder="Search by name or phone..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-12 pl-12 bg-zinc-900 border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14] font-semibold"
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex gap-3 mb-6">
//           <Button
//             onClick={() => setFilter('all')}
//             className={`flex-1 h-12 rounded-xl font-bold transition-all ${
//               filter === 'all'
//                 ? 'bg-[#39FF14] text-black'
//                 : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
//             }`}
//           >
//             All Members
//           </Button>
//           <Button
//             onClick={() => setFilter('paid')}
//             className={`flex-1 h-12 rounded-xl font-bold transition-all ${
//               filter === 'paid'
//                 ? 'bg-[#39FF14] text-black'
//                 : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
//             }`}
//           >
//             Paid
//           </Button>
//           <Button
//             onClick={() => setFilter('due')}
//             className={`flex-1 h-12 rounded-xl font-bold transition-all ${
//               filter === 'due'
//                 ? 'bg-[#FF3B3B] text-white'
//                 : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
//             }`}
//           >
//             Due
//           </Button>
//         </div>

//         {/* Members List */}
//         <div className="space-y-4">
//           {filteredMembers.map((member) => {
//             return (
//               <Card
//                 key={member.id}
//                 className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden"
//               >
//                 <CardContent className="p-5">
//                   <Link to={`/members/${member.id}`}>
//                     <div className="flex items-start gap-4 mb-4">
//                       {/* Avatar */}
//                       <Avatar className="w-14 h-14 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
//                         {member.profilePicture && <AvatarImage src={member.profilePicture} alt={member.name} />}
//                         <AvatarFallback className="bg-transparent text-black text-lg font-bold">
//                           {member.name.split(' ').map(n => n[0]).join('')}
//                         </AvatarFallback>
//                       </Avatar>

//                       {/* Info */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between mb-1">
//                           <h3 className="text-white text-lg truncate font-bold">{member.name}</h3>
//                           <Badge
//                             className={`
//                               ${member.feeStatus === 'Paid' ? 'bg-[#39FF14]/20 text-[#39FF14] border-[#39FF14]/30' : ''}
//                               ${member.feeStatus === 'Pending' ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30' : ''}
//                               ${member.feeStatus === 'Overdue' ? 'bg-[#FF3B3B]/20 text-[#FF3B3B] border-[#FF3B3B]/30' : ''}
//                               border rounded-full px-3 py-1 text-xs font-bold
//                             `}
//                           >
//                             {member.feeStatus}
//                           </Badge>
//                         </div>

//                         <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
//                           <Phone className="w-3 h-3" />
//                           <span className="font-semibold">{member.phone}</span>
//                         </div>

//                         <p className="text-zinc-500 text-xs font-semibold">{member.plan} Plan</p>
//                       </div>
//                     </div>

//                     {/* Progress Bar */}
//                     <FeeProgressBar member={member} size="small" />
//                   </Link>

//                   {/* WhatsApp Button */}
//                   <Button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleWhatsApp(member);
//                     }}
//                     className="w-full h-12 mt-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-bold"
//                   >
//                     <MessageCircle className="w-4 h-4 mr-2" />
//                     Send WhatsApp Notification
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}

//           {filteredMembers.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-zinc-500 font-semibold">No members found</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Input } from '../components/ui/input';
// import { Button } from '../components/ui/button';
// import { Card, CardContent } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
// import { Search, Phone, Loader2, MessageCircle } from 'lucide-react';
// import { AdminHeader } from '../components/AdminHeader';
// import { useMembers } from '../hooks/useMembers';
// import { FeeProgressBar } from '../components/FeeProgressBar';
// import { toast } from 'sonner';

// export function MembersListScreen() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState<'all' | 'paid' | 'due'>('all');
//   const { members, loading } = useMembers();

//   const filteredMembers = members.filter(member => {
//     const matchesSearch =
//       member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       member.phone.includes(searchQuery);

//     const matchesFilter =
//       filter === 'all'
//         ? true
//         : filter === 'paid'
//         ? member.feeStatus === 'Paid'
//         : member.feeStatus !== 'Paid';

//     return matchesSearch && matchesFilter;
//   });

//   const handleWhatsApp = (member: typeof members[0]) => {
//     const message = `Hi ${member.name}, this is a reminder from Banda Fitness Club.`;
//     const whatsappUrl = `https://wa.me/918960653217?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//     toast.success('Opening WhatsApp...');
//   };

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

//         <div className="space-y-4">
//           {filteredMembers.map((member) => (
//             <Card
//               key={member.id}
//               className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden"
//             >
//               <CardContent className="p-5">
//                 <Link to={`/members/${member.id}`}>
//                   <div className="flex items-start gap-4 mb-4">
//                     {/* ✅ FIXED AVATAR */}
//                     <Avatar className="w-14 h-14">
//                       {member.profile_url ? (
//                         <AvatarImage
//                           src={member.profile_url}
//                           alt={member.name}
//                         />
//                       ) : (
//                         <AvatarImage
//                           src={`https://ui-avatars.com/api/?name=${member.name}&background=39FF14&color=000`}
//                           alt={member.name}
//                         />
//                       )}
//                       <AvatarFallback>
//                         {member.name
//                           .split(' ')
//                           .map((n) => n[0])
//                           .join('')}
//                       </AvatarFallback>
//                     </Avatar>

//                     <div className="flex-1">
//                       <div className="flex justify-between mb-1">
//                         <h3 className="text-white text-lg font-bold">
//                           {member.name}
//                         </h3>
//                         <Badge className="bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/30">
//                           {member.feeStatus || 'Active'}
//                         </Badge>
//                       </div>

//                       <div className="flex items-center gap-2 text-zinc-400 text-sm">
//                         <Phone className="w-3 h-3" />
//                         <span>{member.phone}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <FeeProgressBar member={member} size="small" />
//                 </Link>

//                 <Button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleWhatsApp(member);
//                   }}
//                   className="w-full h-12 mt-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-bold"
//                 >
//                   <MessageCircle className="w-4 h-4 mr-2" />
//                   Send WhatsApp Notification
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Input } from '../components/ui/input';
// import { Button } from '../components/ui/button';
// import { Card, CardContent } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
// import { Search, Phone, Loader2, MessageCircle } from 'lucide-react';
// import { AdminHeader } from '../components/AdminHeader';
// import { useMembers } from '../hooks/useMembers';
// import { FeeProgressBar } from '../components/FeeProgressBar';
// import { toast } from 'sonner';

// export function MembersListScreen() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState<'all' | 'paid' | 'due'>('all');
//   const { members, loading } = useMembers();

//   const filteredMembers = members.filter(member => {
//     const matchesSearch =
//       member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       member.phone.includes(searchQuery);

//     const matchesFilter =
//       filter === 'all'
//         ? true
//         : filter === 'paid'
//         ? member.feeStatus === 'Paid'
//         : member.feeStatus !== 'Paid';

//     return matchesSearch && matchesFilter;
//   });

//   const handleWhatsApp = (member: typeof members[0]) => {
//     const message = `Hi ${member.name}, this is a reminder from Banda Fitness Club. Your membership fee is ${member.feeStatus?.toLowerCase() || 'active'}.`;
//     const whatsappUrl = `https://wa.me/918960653217?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//     toast.success('Opening WhatsApp...');
//   };

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

//         {/* Search Bar */}
//         <div className="relative mb-4">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//           <Input
//             type="text"
//             placeholder="Search by name or phone..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-12 pl-12 bg-zinc-900 border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14] font-semibold"
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex gap-3 mb-6">
//           <Button
//             onClick={() => setFilter('all')}
//             className={`flex-1 h-12 rounded-xl font-bold transition-all ${
//               filter === 'all'
//                 ? 'bg-[#39FF14] text-black'
//                 : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
//             }`}
//           >
//             All Members
//           </Button>
//           <Button
//             onClick={() => setFilter('paid')}
//             className={`flex-1 h-12 rounded-xl font-bold transition-all ${
//               filter === 'paid'
//                 ? 'bg-[#39FF14] text-black'
//                 : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
//             }`}
//           >
//             Paid
//           </Button>
//           <Button
//             onClick={() => setFilter('due')}
//             className={`flex-1 h-12 rounded-xl font-bold transition-all ${
//               filter === 'due'
//                 ? 'bg-[#FF3B3B] text-white'
//                 : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
//             }`}
//           >
//             Due
//           </Button>
//         </div>

//         {/* Members List */}
//         <div className="space-y-4">
//           {filteredMembers.map((member) => (
//             <Card
//               key={member.id}
//               className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden"
//             >
//               <CardContent className="p-5">
//                 <Link to={`/members/${member.id}`}>
//                   <div className="flex items-start gap-4 mb-4">

//                     {/* ✅ AVATAR FIXED */}
//                     <Avatar className="w-14 h-14 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
//                       {member.profile_url ? (
//                         <AvatarImage src={member.profile_url} alt={member.name} />
//                       ) : (
//                         <AvatarImage
//                           src={`https://ui-avatars.com/api/?name=${member.name}&background=39FF14&color=000`}
//                           alt={member.name}
//                         />
//                       )}
//                       <AvatarFallback className="bg-transparent text-black text-lg font-bold">
//                         {member.name.split(' ').map(n => n[0]).join('')}
//                       </AvatarFallback>
//                     </Avatar>

//                     {/* Info */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between mb-1">
//                         <h3 className="text-white text-lg truncate font-bold">
//                           {member.name}
//                         </h3>

//                         <Badge
//                           className={`
//                             ${member.feeStatus === 'Paid' ? 'bg-[#39FF14]/20 text-[#39FF14] border-[#39FF14]/30' : ''}
//                             ${member.feeStatus === 'Pending' ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30' : ''}
//                             ${member.feeStatus === 'Overdue' ? 'bg-[#FF3B3B]/20 text-[#FF3B3B] border-[#FF3B3B]/30' : ''}
//                             border rounded-full px-3 py-1 text-xs font-bold
//                           `}
//                         >
//                           {member.feeStatus || 'Active'}
//                         </Badge>
//                       </div>

//                       <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
//                         <Phone className="w-3 h-3" />
//                         <span className="font-semibold">{member.phone}</span>
//                       </div>

//                       <p className="text-zinc-500 text-xs font-semibold">
//                         {member.plan} Plan
//                       </p>
//                     </div>
//                   </div>

//                   <FeeProgressBar member={member} size="small" />
//                 </Link>

//                 {/* WhatsApp Button */}
//                 <Button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleWhatsApp(member);
//                   }}
//                   className="w-full h-12 mt-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-bold"
//                 >
//                   <MessageCircle className="w-4 h-4 mr-2" />
//                   Send WhatsApp Notification
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}

//           {filteredMembers.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-zinc-500 font-semibold">
//                 No members found
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Search, Phone, Loader2, MessageCircle } from 'lucide-react';
import { AdminHeader } from '../components/AdminHeader';
import { useMembers } from '../hooks/useMembers';
import { FeeProgressBar } from '../components/FeeProgressBar';
import { toast } from 'sonner';

export function MembersListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'paid' | 'due'>('all');
  const { members, loading } = useMembers();

  const filteredMembers = members.filter(member => {

    // ✅ FIX: use fee_status instead of feeStatus
    const status = member.fee_status || member.feeStatus || 'Pending';

    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);

    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'paid'
        ? status === 'Paid'
        : status !== 'Paid';

    return matchesSearch && matchesFilter;
  });

  const handleWhatsApp = (member: any) => {
    const status = member.fee_status || member.feeStatus || 'Pending';

    const message = `Hi ${member.name}, this is a reminder from Banda Fitness Club. Your membership fee is ${status.toLowerCase()}.`;

    const whatsappUrl = `https://wa.me/918960653217?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Opening WhatsApp...');
  };

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
            className="h-12 pl-12 bg-zinc-900 border-zinc-800 text-white rounded-xl focus:border-[#39FF14]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={() => setFilter('all')}
            className={`flex-1 h-12 rounded-xl font-bold ${
              filter === 'all'
                ? 'bg-[#39FF14] text-black'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            All
          </Button>

          <Button
            onClick={() => setFilter('paid')}
            className={`flex-1 h-12 rounded-xl font-bold ${
              filter === 'paid'
                ? 'bg-[#39FF14] text-black'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            Paid
          </Button>

          <Button
            onClick={() => setFilter('due')}
            className={`flex-1 h-12 rounded-xl font-bold ${
              filter === 'due'
                ? 'bg-[#FF3B3B] text-white'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            Due
          </Button>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filteredMembers.map((member) => {
            const status = member.fee_status || member.feeStatus || 'Pending';
            console.log("MEMBER DEBUG:", member);


            return (
              <Card
                key={member.id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden"
              >
                <CardContent className="p-5">
                  <Link to={`/members/${member.id}`}>
                    <div className="flex items-start gap-4 mb-4">

                      <Avatar className="w-14 h-14 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
                        {member.profile_url ? (
                          <AvatarImage src={member.profile_url} />
                        ) : (
                          <AvatarFallback className="bg-transparent text-black font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h3 className="text-white text-lg font-bold">
                            {member.name}
                          </h3>

                          <Badge
                            className={`
                              ${status === 'Paid' ? 'bg-[#39FF14]/20 text-[#39FF14]' : ''}
                              ${status !== 'Paid' ? 'bg-[#FF3B3B]/20 text-[#FF3B3B]' : ''}
                              border rounded-full px-3 py-1 text-xs font-bold
                            `}
                          >
                            {status}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </div>
                      </div>
                    </div>

                    <FeeProgressBar member={member} size="small" />
                  </Link>

                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleWhatsApp(member);
                    }}
                    className="w-full h-12 mt-4 bg-[#25D366] text-white rounded-xl font-bold"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send WhatsApp
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

