

// import { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { ArrowLeft, Save, Loader2 } from 'lucide-react';
// import { useMembers, useMember } from '../hooks/useMembers';
// import { paymentsApi } from '../lib/api';
// import { MONTHS, getCurrentMonth } from '../utils/monthProgress';
// import { toast } from 'sonner';

// export function AddFeePaymentScreen() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const memberId = searchParams.get('memberId');

//   const { members } = useMembers();
//   const { member: selectedMemberData } = useMember(memberId || undefined);

//   const [selectedMember, setSelectedMember] = useState(memberId || '');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

//   const [formData, setFormData] = useState({
//     amount: '',
//     paymentMethod: 'UPI',
//     transactionId: '',
//   });

//   const member =
//     selectedMemberData || members.find((m) => m.id === selectedMember);

//   const monthlyFee = member?.monthlyFee ?? member?.monthly_fee ?? 0;

//   useEffect(() => {
//     if (monthlyFee) {
//       setFormData((prev) => ({
//         ...prev,
//         amount: String(monthlyFee),
//       }));
//     }
//   }, [monthlyFee]);

//   const filteredMembers = members.filter((m) =>
//     m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     m.phone.includes(searchQuery)
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedMember || !formData.amount) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     try {
//       setLoading(true);

//       await paymentsApi.create({
//         memberId: selectedMember,
//         amount: Number(formData.amount),
//         month: selectedMonth,
//         paymentMethod: formData.paymentMethod as 'UPI' | 'Cash',
//         transactionId: formData.transactionId,
//         status: 'Paid',
//         date: new Date(),
//       });

//       toast.success(`Payment saved for ${selectedMonth}!`);
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Failed to save payment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black pb-24">
//       <div className="bg-gradient-to-b from-zinc-900 to-black pt-12 pb-6 px-6">
//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h1 className="text-2xl text-white">Add Fee Payment</h1>
//         </div>
//       </div>

//       <div className="px-6">
//         {member && (
//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden mb-6">
//             <CardContent className="p-5">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-zinc-400 text-xs mb-1">Payment for</p>
//                   <p className="text-white text-lg">{member.name}</p>
//                   <p className="text-zinc-500 text-sm">{member.plan}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-zinc-400 text-xs mb-1">Total Fee</p>
//                   <p className="text-[#39FF14] text-2xl">
//                     ₹{monthlyFee.toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden">
//           <CardContent className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">

//               {!memberId && (
//                 <div className="space-y-2">
//                   <Label className="text-zinc-300">Search & Select Member *</Label>

//                   <Input
//                     type="text"
//                     placeholder="Search by name or phone..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="h-12 bg-black border-zinc-800 text-white rounded-xl mb-2"
//                   />

//                   <div className="max-h-48 overflow-y-auto border border-zinc-800 rounded-xl bg-black">
//                     {filteredMembers.map((m) => (
//                       <div
//                         key={m.id}
//                         onClick={() => {
//                           setSelectedMember(m.id);
//                           setSearchQuery('');
//                         }}
//                         className={`p-3 cursor-pointer hover:bg-zinc-800 text-white ${
//                           selectedMember === m.id ? 'bg-zinc-800' : ''
//                         }`}
//                       >
//                         {m.name} - {m.phone}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Month Selector */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">Select Month *</Label>
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                   className="w-full h-12 bg-black border border-zinc-800 text-white rounded-xl px-3"
//                 >
//                   {MONTHS.map((month) => (
//                     <option key={month.name} value={month.name}>
//                       {month.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-zinc-300">Amount Paid *</Label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     ₹
//                   </span>
//                   <Input
//                     type="number"
//                     value={formData.amount}
//                     onChange={(e) =>
//                       setFormData({ ...formData, amount: e.target.value })
//                     }
//                     className="h-12 pl-8 bg-black border-zinc-800 text-white rounded-xl"
//                   />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] text-black rounded-2xl"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-5 h-5 mr-2" />
//                     Save Payment
//                   </>
//                 )}
//               </Button>

//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }






import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useMembersContext } from '../../context/MembersContext';
import { useDashboardContext } from '../../context/DashboardContext'; // ✅ NEW
import { paymentsApi } from '../lib/api';
import { MONTHS, getCurrentMonth } from '../utils/monthProgress';
import { toast } from 'sonner';

export function AddFeePaymentScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberId = searchParams.get('memberId');

  const { members, refresh } = useMembersContext();
  const { refresh: refreshDashboard } = useDashboardContext(); // ✅ NEW

  const [selectedMember, setSelectedMember] = useState(memberId || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'UPI',
    transactionId: '',
  });

  const member = members.find((m) => m.id === selectedMember);
  const monthlyFee = member?.monthly_fee ?? 0;

  useEffect(() => {
    if (monthlyFee) {
      setFormData((prev) => ({
        ...prev,
        amount: String(monthlyFee),
      }));
    }
  }, [monthlyFee]);

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.phone.includes(searchQuery)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMember) {
      toast.error('Please select a member');
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error('Please enter valid amount');
      return;
    }

    try {
      setLoading(true);

      await paymentsApi.create({
        memberId: selectedMember,
        amount: Number(formData.amount),
        month: selectedMonth,
        paymentMethod: formData.paymentMethod as 'UPI' | 'Cash',
        transactionId: formData.transactionId,
        status: 'Paid',
        date: new Date(),
      });

      // ✅ Refresh members
      await refresh();

      // ✅ Refresh dashboard
      await refreshDashboard();

      toast.success(`Payment saved for ${selectedMonth}!`);
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      toast.error('Failed to save payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="bg-gradient-to-b from-zinc-900 to-black pt-12 pb-6 px-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl text-white font-bold">
            Add Fee Payment
          </h1>
        </div>
      </div>

      <div className="px-6">

        {member && (
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl mb-6">
            <CardContent className="p-5">
              <p className="text-white text-lg font-bold">
                {member.name}
              </p>
              <p className="text-zinc-400 text-sm">
                {member.plan}
              </p>
              <p className="text-[#39FF14] text-xl mt-2 font-bold">
                ₹{monthlyFee.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {!memberId && (
                <div className="space-y-2">
                  <Label className="text-zinc-300">
                    Search & Select Member *
                  </Label>

                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or phone"
                    className="bg-black border-zinc-800 text-white"
                  />

                  <div className="max-h-40 overflow-y-auto mt-2 bg-black border border-zinc-800 rounded-xl">
                    {filteredMembers.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setSelectedMember(m.id);
                          setSearchQuery('');
                        }}
                        className={`p-2 cursor-pointer hover:bg-zinc-800 text-white ${
                          selectedMember === m.id ? 'bg-zinc-800' : ''
                        }`}
                      >
                        {m.name} - {m.phone}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Select Month *
                </Label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full h-12 bg-black border border-zinc-800 text-white rounded-xl px-3"
                >
                  {MONTHS.map((month) => (
                    <option key={month.name} value={month.name}>
                      {month.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Amount *
                </Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="bg-black border-zinc-800 text-white"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] text-black rounded-2xl font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Payment
                  </>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
