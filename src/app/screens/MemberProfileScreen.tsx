// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Avatar, AvatarFallback } from '../components/ui/avatar';
// import { Badge } from '../components/ui/badge';
// import { ArrowLeft, Phone, Mail, Calendar, DollarSign, CreditCard, MessageCircle, Loader2 } from 'lucide-react';
// import { useMember } from '../hooks/useMembers';
// import { FeeProgressBar } from '../components/FeeProgressBar';
// import { formatDateLong } from '../utils/dateUtils';
// import { toast } from 'sonner';

// export function MemberProfileScreen() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { member, loading } = useMember(id);

//   const handleWhatsAppNotification = () => {
//     if (member) {
//       const message = `Hi ${member.name}, this is a reminder from Banda Fitness Club. Your membership fee is ${member.feeStatus.toLowerCase()}.`;
//       const whatsappUrl = `https://wa.me/918960653217?text=${encodeURIComponent(message)}`;
//       window.open(whatsappUrl, '_blank');
//       toast.success('Opening WhatsApp...');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
//       </div>
//     );
//   }

//   if (!member) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center px-6">
//         <div className="text-center">
//           <p className="text-zinc-400 mb-4">Member not found</p>
//           <Link to="/members">
//             <Button className="bg-[#39FF14] text-black hover:bg-[#2ECC40]">
//               Back to Members
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black pb-24">
//       {/* Header */}
//       <div className="bg-gradient-to-b from-zinc-900 to-black pt-12 pb-6 px-6">
//         <div className="flex items-center gap-4 mb-6">
//           <button 
//             onClick={() => navigate('/members')}
//             className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h1 className="text-2xl text-white">Member Profile</h1>
//         </div>
//       </div>

//       <div className="px-6">
//         {/* Profile Header Card */}
//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden mb-6">
//           <CardContent className="p-6">
//             <div className="flex items-start gap-4 mb-6">
//               <Avatar className="w-20 h-20 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
//                 <AvatarFallback className="bg-transparent text-black text-2xl">
//                   {member.name.split(' ').map(n => n[0]).join('')}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="flex-1">
//                 <h2 className="text-2xl text-white mb-2">{member.name}</h2>
//                 <Badge 
//                   className={`
//                     ${member.feeStatus === 'Paid' ? 'bg-[#39FF14]/20 text-[#39FF14] border-[#39FF14]/30' : ''}
//                     ${member.feeStatus === 'Pending' ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30' : ''}
//                     ${member.feeStatus === 'Overdue' ? 'bg-[#FF3B3B]/20 text-[#FF3B3B] border-[#FF3B3B]/30' : ''}
//                     border rounded-full px-3 py-1 text-sm
//                   `}
//                 >
//                   {member.feeStatus}
//                 </Badge>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="space-y-3 mb-6">
//               <div className="flex items-center gap-3 text-zinc-300">
//                 <Phone className="w-5 h-5 text-[#39FF14]" />
//                 <span>{member.phone}</span>
//               </div>
//               {member.email && (
//                 <div className="flex items-center gap-3 text-zinc-300">
//                   <Mail className="w-5 h-5 text-[#39FF14]" />
//                   <span className="text-sm">{member.email}</span>
//                 </div>
//               )}
//             </div>

//             {/* Plan Badge */}
//             <div className="inline-block px-4 py-2 bg-zinc-800 rounded-xl">
//               <span className="text-[#FFD700] text-sm">{member.plan} Plan</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Details Section */}
//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden mb-6">
//           <CardContent className="p-6">
//             <h3 className="text-white text-lg mb-4">Membership Details</h3>
            
//             <div className="space-y-4">
//               <div className="flex items-center justify-between py-3 border-b border-zinc-800">
//                 <div className="flex items-center gap-3">
//                   <Calendar className="w-5 h-5 text-[#39FF14]" />
//                   <span className="text-zinc-400">Join Date</span>
//                 </div>
//                 <span className="text-white">{formatDateLong(member.joinDate)}</span>
//               </div>

//               <div className="flex items-center justify-between py-3 border-b border-zinc-800">
//                 <div className="flex items-center gap-3">
//                   <DollarSign className="w-5 h-5 text-[#39FF14]" />
//                   <span className="text-zinc-400">Monthly Fee</span>
//                 </div>
//                 <span className="text-white text-lg">₹{member.monthlyFee.toLocaleString()}</span>
//               </div>

//               <div className="flex items-center justify-between py-3">
//                 <div className="flex items-center gap-3">
//                   <CreditCard className="w-5 h-5 text-[#39FF14]" />
//                   <span className="text-zinc-400">Last Payment</span>
//                 </div>
//                 <span className="text-white">{formatDateLong(member.lastPaymentDate)}</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Fee Timeline */}
//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden mb-6">
//           <CardContent className="p-6">
//             <h3 className="text-white text-lg mb-4">Fee Timeline</h3>
            
//             <FeeProgressBar member={member} size="large" showDetails={true} />
//           </CardContent>
//         </Card>

//         {/* Action Buttons */}
//         <div className="space-y-3">
//           <Link to={`/payment/add?memberId=${member.id}`}>
//             <Button className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] hover:from-[#2ECC40] hover:to-[#39FF14] text-black rounded-2xl">
//               <CreditCard className="w-5 h-5 mr-2" />
//               Add Fee Payment
//             </Button>
//           </Link>

//           <Button 
//             onClick={handleWhatsAppNotification}
//             className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl border border-zinc-800"
//           >
//             <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" />
//             Send WhatsApp Notification
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  CreditCard,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import { useMember } from '../hooks/useMembers';
import { useDashboard } from '../hooks/useDashboard';
import { FeeProgressBar } from '../components/FeeProgressBar';
import { formatDateLong } from '../utils/dateUtils';
import { getCurrentMonth } from '../utils/monthProgress';
import { toast } from 'sonner';

export function MemberProfileScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { member, loading } = useMember(id);

  // ✅ Always calculate based on CURRENT MONTH
  const currentMonth = getCurrentMonth();
  const { paidMemberIds } = useDashboard(currentMonth);

  const handleWhatsAppNotification = () => {
    if (member) {
      const status = paidMemberIds.includes(member.id)
        ? 'Paid'
        : 'Pending';

      const message = `Hi ${member.name}, this is a reminder from Banda Fitness Club. Your membership fee is ${status.toLowerCase()}.`;

      const whatsappUrl = `https://wa.me/918960653217?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, '_blank');
      toast.success('Opening WhatsApp...');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">Member not found</p>
          <Link to="/members">
            <Button className="bg-[#39FF14] text-black hover:bg-[#2ECC40]">
              Back to Members
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Month-based dynamic status
  const dynamicStatus = paidMemberIds.includes(member.id)
    ? 'Paid'
    : 'Pending';

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-zinc-900 to-black pt-12 pb-6 px-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/members')}
            className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl text-white">Member Profile</h1>
        </div>
      </div>

      <div className="px-6">
        {/* Profile Header Card */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-20 h-20 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
                <AvatarFallback className="bg-transparent text-black text-2xl">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl text-white mb-2">
                  {member.name}
                </h2>

                <Badge
                  className={`
                    ${
                      dynamicStatus === 'Paid'
                        ? 'bg-[#39FF14]/20 text-[#39FF14] border-[#39FF14]/30'
                        : ''
                    }
                    ${
                      dynamicStatus === 'Pending'
                        ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                        : ''
                    }
                    border rounded-full px-3 py-1 text-sm
                  `}
                >
                  {dynamicStatus}
                </Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-zinc-300">
                <Phone className="w-5 h-5 text-[#39FF14]" />
                <span>{member.phone}</span>
              </div>

              {member.email && (
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="w-5 h-5 text-[#39FF14]" />
                  <span className="text-sm">{member.email}</span>
                </div>
              )}
            </div>

            {/* Plan Badge */}
            <div className="inline-block px-4 py-2 bg-zinc-800 rounded-xl">
              <span className="text-[#FFD700] text-sm">
                {member.plan} Plan
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Membership Details */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden mb-6">
          <CardContent className="p-6">
            <h3 className="text-white text-lg mb-4">
              Membership Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#39FF14]" />
                  <span className="text-zinc-400">
                    Join Date
                  </span>
                </div>
                <span className="text-white">
                  {formatDateLong(member.joinDate)}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-[#39FF14]" />
                  <span className="text-zinc-400">
                    Monthly Fee
                  </span>
                </div>
                <span className="text-white text-lg">
                  ₹{member.monthlyFee.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#39FF14]" />
                  <span className="text-zinc-400">
                    Last Payment
                  </span>
                </div>
                <span className="text-white">
                  {formatDateLong(member.lastPaymentDate)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Timeline */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden mb-6">
          <CardContent className="p-6">
            <h3 className="text-white text-lg mb-4">
              Fee Timeline
            </h3>

            <FeeProgressBar
              member={member}
              size="large"
              showDetails={true}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to={`/payment/add?memberId=${member.id}`}>
            <Button className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] hover:from-[#2ECC40] hover:to-[#39FF14] text-black rounded-2xl">
              <CreditCard className="w-5 h-5 mr-2" />
              Add Fee Payment
            </Button>
          </Link>

          <Button
            onClick={handleWhatsAppNotification}
            className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl border border-zinc-800"
          >
            <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" />
            Send WhatsApp Notification
          </Button>
        </div>
      </div>
    </div>
  );
}
