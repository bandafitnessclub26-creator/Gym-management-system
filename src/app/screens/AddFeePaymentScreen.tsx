// import { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
// import { ArrowLeft, Save, MessageCircle, Loader2 } from 'lucide-react';
// import { useMembers, useMember } from '../hooks/useMembers';
// import { paymentsApi } from '../lib/api';
// import { toast } from 'sonner';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';

// export function AddFeePaymentScreen() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const memberId = searchParams.get('memberId');
  
//   const { members } = useMembers();
//   const { member: selectedMemberData } = useMember(memberId || undefined);
  
//   const [selectedMember, setSelectedMember] = useState(memberId || '');
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     amount: '',
//     month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
//     paymentMethod: 'UPI',
//     transactionId: '',
//     status: 'Paid',
//   });
//   const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);

//   const member = selectedMemberData || members.find(m => m.id === selectedMember);

//   useEffect(() => {
//     if (member) {
//       setFormData(prev => ({ ...prev, amount: member.monthlyFee.toString() }));
//     }
//   }, [member]);

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
//         month: formData.month,
//         paymentMethod: formData.paymentMethod as 'UPI' | 'Cash',
//         transactionId: formData.transactionId,
//         date: new Date(),
//         status: formData.status as 'Paid' | 'Pending',
//       });
//       toast.success('Payment saved successfully!');
//       setShowWhatsAppDialog(true);
//     } catch (error) {
//       console.error('Error saving payment:', error);
//       toast.error('Failed to save payment. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWhatsAppSend = () => {
//     if (member) {
//       const message = `Hi ${member.name}, your payment of ₹${formData.amount} for ${formData.month} has been received. Thank you! - Banda Fitness Club`;
//       const whatsappUrl = `https://wa.me/918960653217?text=${encodeURIComponent(message)}`;
//       window.open(whatsappUrl, '_blank');
//       toast.success('Opening WhatsApp...');
//     }
//     setShowWhatsAppDialog(false);
//     navigate('/dashboard');
//   };

//   const handleSkipWhatsApp = () => {
//     setShowWhatsAppDialog(false);
//     navigate('/dashboard');
//   };

//   // Calculate new dates after payment
//   const today = new Date();
//   const newFeeEndDate = new Date(today);
//   newFeeEndDate.setDate(newFeeEndDate.getDate() + 30);

//   return (
//     <div className="min-h-screen bg-black pb-24">
//       {/* Header */}
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
//         {/* Member Info */}
//         {member && (
//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden mb-6">
//             <CardContent className="p-5">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-zinc-400 text-xs mb-1">Payment for</p>
//                   <p className="text-white text-lg">{member.name}</p>
//                   <p className="text-zinc-500 text-sm">{member.plan} Plan</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-zinc-400 text-xs mb-1">Monthly Fee</p>
//                   <p className="text-[#39FF14] text-2xl">₹{member.monthlyFee.toLocaleString()}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Payment Form */}
//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden">
//           <CardContent className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Select Member (if not pre-selected) */}
//               {!memberId && (
//                 <div className="space-y-2">
//                   <Label htmlFor="member" className="text-zinc-300">
//                     Select Member <span className="text-[#FF3B3B]">*</span>
//                   </Label>
//                   <Select
//                     value={selectedMember}
//                     onValueChange={setSelectedMember}
//                   >
//                     <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]">
//                       <SelectValue placeholder="Choose a member" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-zinc-900 border-zinc-800 text-white max-h-[300px]">
//                       {members.map((m) => (
//                         <SelectItem key={m.id} value={m.id}>
//                           {m.name} - {m.plan}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

//               {/* Amount Paid */}
//               <div className="space-y-2">
//                 <Label htmlFor="amount" className="text-zinc-300">
//                   Amount Paid <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">₹</span>
//                   <Input
//                     id="amount"
//                     type="number"
//                     value={formData.amount}
//                     onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//                     placeholder="2000"
//                     className="h-12 pl-8 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                   />
//                 </div>
//               </div>

//               {/* Month Selection */}
//               <div className="space-y-2">
//                 <Label htmlFor="month" className="text-zinc-300">
//                   Month <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <Input
//                   id="month"
//                   type="text"
//                   value={formData.month}
//                   onChange={(e) => setFormData({ ...formData, month: e.target.value })}
//                   placeholder="January 2026"
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                 />
//               </div>

//               {/* Payment Method */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">
//                   Payment Method <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <RadioGroup 
//                   value={formData.paymentMethod}
//                   onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
//                   className="flex gap-4"
//                 >
//                   <div className="flex items-center space-x-2 flex-1">
//                     <RadioGroupItem value="UPI" id="upi" className="border-[#39FF14] text-[#39FF14]" />
//                     <Label htmlFor="upi" className="text-white cursor-pointer flex-1 py-3 px-4 bg-black rounded-xl border border-zinc-800">
//                       UPI
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2 flex-1">
//                     <RadioGroupItem value="Cash" id="cash" className="border-[#39FF14] text-[#39FF14]" />
//                     <Label htmlFor="cash" className="text-white cursor-pointer flex-1 py-3 px-4 bg-black rounded-xl border border-zinc-800">
//                       Cash
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               {/* Transaction ID (Optional) */}
//               <div className="space-y-2">
//                 <Label htmlFor="transactionId" className="text-zinc-300">
//                   UTR / Transaction ID <span className="text-zinc-500 text-xs">(Optional)</span>
//                 </Label>
//                 <Input
//                   id="transactionId"
//                   type="text"
//                   value={formData.transactionId}
//                   onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
//                   placeholder="Enter transaction ID"
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                 />
//               </div>

//               {/* Updated Fee Cycle Preview */}
//               {member && (
//                 <div className="p-4 bg-black rounded-xl border border-zinc-800 space-y-2">
//                   <p className="text-zinc-400 text-sm">After payment:</p>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-zinc-500">Fee Start Date:</span>
//                     <span className="text-white">{today.toLocaleDateString('en-IN')}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-zinc-500">Fee End Date:</span>
//                     <span className="text-white">{newFeeEndDate.toLocaleDateString('en-IN')}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-zinc-500">Status:</span>
//                     <span className="text-[#39FF14]">Paid</span>
//                   </div>
//                 </div>
//               )}

//               {/* Save Button */}
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] hover:from-[#2ECC40] hover:to-[#39FF14] text-black rounded-2xl disabled:opacity-50"
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

//       {/* WhatsApp Dialog */}
//       <Dialog open={showWhatsAppDialog} onOpenChange={setShowWhatsAppDialog}>
//         <DialogContent className="bg-zinc-900 border-zinc-800 text-white rounded-3xl max-w-sm">
//           <DialogHeader>
//             <DialogTitle className="text-center text-xl">Send Receipt via WhatsApp?</DialogTitle>
//           </DialogHeader>
          
//           <div className="py-6 text-center">
//             <div className="w-16 h-16 mx-auto mb-4 bg-[#25D366] rounded-2xl flex items-center justify-center">
//               <MessageCircle className="w-8 h-8 text-white" />
//             </div>
//             <p className="text-zinc-400">
//               Send payment confirmation to {member?.name}?
//             </p>
//           </div>

//           <DialogFooter className="flex gap-3">
//             <Button
//               onClick={handleSkipWhatsApp}
//               className="flex-1 h-12 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl"
//             >
//               Skip
//             </Button>
//             <Button
//               onClick={handleWhatsAppSend}
//               className="flex-1 h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl"
//             >
//               <MessageCircle className="w-4 h-4 mr-2" />
//               Open WhatsApp
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }















// import { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// import { ArrowLeft, Save, Loader2 } from 'lucide-react';
// import { useMembers, useMember } from '../hooks/useMembers';
// import { paymentsApi } from '../lib/api';
// import { toast } from 'sonner';

// export function AddFeePaymentScreen() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const memberId = searchParams.get('memberId');

//   const { members } = useMembers();
//   const { member: selectedMemberData } = useMember(memberId || undefined);

//   const [selectedMember, setSelectedMember] = useState(memberId || '');
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     amount: '',
//     month: new Date().toLocaleDateString('en-US', {
//       month: 'long',
//       year: 'numeric',
//     }),
//     paymentMethod: 'UPI',
//     transactionId: '',
//     status: 'Paid',
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

//   // ========================================
//   // PLAN MONTHS
//   // ========================================
//   const getPlanMonths = (plan?: string) => {
//     switch (plan) {
//       case 'Monthly':
//         return 1;
//       case 'Quarterly':
//         return 3;
//       case 'Half Year':
//         return 6;
//       case 'Yearly':
//         return 12;
//       default:
//         return 1;
//     }
//   };

//   // ========================================
//   // SAFE DATE PARSER (Handles All Formats)
//   // ========================================
//   const parseDateSafely = (dateValue: any): Date | null => {
//     if (!dateValue) return null;

//     // Try normal ISO parsing first
//     const isoDate = new Date(dateValue);
//     if (!isNaN(isoDate.getTime())) return isoDate;

//     // Handle DD-MM-YYYY format
//     if (typeof dateValue === 'string' && dateValue.includes('-')) {
//       const parts = dateValue.split('-');
//       if (parts.length === 3) {
//         const [day, month, year] = parts;
//         const customDate = new Date(
//           Number(year),
//           Number(month) - 1,
//           Number(day)
//         );
//         if (!isNaN(customDate.getTime())) return customDate;
//       }
//     }

//     return null;
//   };

//   // ========================================
//   // FIXED PREVIEW LOGIC
//   // Fee Start = Always Join Date
//   // ========================================

//    let previewStart: Date | null = null;
// let previewEnd: Date | null = null;

// if (member?.join_date || member?.joinDate) {
//   const joinRaw = member.join_date || member.joinDate;

//   const joinDate = new Date(joinRaw);

//   if (!isNaN(joinDate.getTime())) {
//     joinDate.setHours(0, 0, 0, 0);

//     previewStart = joinDate;

//     previewEnd = new Date(joinDate);
//     previewEnd.setMonth(
//       previewEnd.getMonth() + getPlanMonths(member?.plan)
//     );
//     previewEnd.setHours(0, 0, 0, 0);
//   }
// }


//   // ========================================
//   // SUBMIT
//   // ========================================
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
//         month: formData.month,
//         paymentMethod: formData.paymentMethod as 'UPI' | 'Cash',
//         transactionId: formData.transactionId,
//         date: new Date(),
//         status: formData.status as 'Paid' | 'Pending',
//       });

//       toast.success('Payment saved successfully!');
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
//                   <p className="text-zinc-400 text-xs mb-1">Monthly Fee</p>
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
//                   <Label className="text-zinc-300">Select Member *</Label>
//                   <Select value={selectedMember} onValueChange={setSelectedMember}>
//                     <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14]">
//                       <SelectValue placeholder="Choose a member" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-zinc-900 border-zinc-800 text-white max-h-[300px]">
//                       {members.map((m) => (
//                         <SelectItem key={m.id} value={m.id}>
//                           {m.name} - {m.plan}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

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
//                     className="h-12 pl-8 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14]"
//                   />
//                 </div>
//               </div>

//               <div className="p-4 bg-black rounded-xl border border-zinc-800 space-y-2">
//                 <p className="text-zinc-400 text-sm">After payment:</p>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-zinc-500">Fee Start Date:</span>
//                   <span className="text-white">
//                     {previewStart?.toLocaleDateString('en-IN')}

//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-zinc-500">Fee End Date:</span>
//                   <span className="text-white">
//                     {previewEnd?.toLocaleDateString('en-IN')}

//                   </span>
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









// import { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
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
//   const [loading, setLoading] = useState(false);

//   // ✅ DEFAULT MONTH SAME FORMAT AS DASHBOARD
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
//         month: selectedMonth, // 👈 KEY SYNC LINE
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
//                   <Label className="text-zinc-300">Select Member *</Label>
//                   <Select value={selectedMember} onValueChange={setSelectedMember}>
//                     <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl">
//                       <SelectValue placeholder="Choose a member" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-zinc-900 border-zinc-800 text-white max-h-[300px]">
//                       {members.map((m) => (
//                         <SelectItem key={m.id} value={m.id}>
//                           {m.name} - {m.plan}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

//               {/* 🔥 MONTH SELECTOR */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">Select Month *</Label>
//                 <Select value={selectedMonth} onValueChange={setSelectedMonth}>
//                   <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
//                     {MONTHS.map((month) => (
//                       <SelectItem key={month.name} value={month.name}>
//                         {month.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
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
import { useMembers, useMember } from '../hooks/useMembers';
import { paymentsApi } from '../lib/api';
import { MONTHS, getCurrentMonth } from '../utils/monthProgress';
import { toast } from 'sonner';

export function AddFeePaymentScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberId = searchParams.get('memberId');

  const { members } = useMembers();
  const { member: selectedMemberData } = useMember(memberId || undefined);

  const [selectedMember, setSelectedMember] = useState(memberId || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'UPI',
    transactionId: '',
  });

  const member =
    selectedMemberData || members.find((m) => m.id === selectedMember);

  const monthlyFee = member?.monthlyFee ?? member?.monthly_fee ?? 0;

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

    if (!selectedMember || !formData.amount) {
      toast.error('Please fill in all required fields');
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

      toast.success(`Payment saved for ${selectedMonth}!`);
      navigate('/dashboard');
    } catch (error) {
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
          <h1 className="text-2xl text-white">Add Fee Payment</h1>
        </div>
      </div>

      <div className="px-6">
        {member && (
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden mb-6">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-xs mb-1">Payment for</p>
                  <p className="text-white text-lg">{member.name}</p>
                  <p className="text-zinc-500 text-sm">{member.plan}</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-400 text-xs mb-1">Total Fee</p>
                  <p className="text-[#39FF14] text-2xl">
                    ₹{monthlyFee.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {!memberId && (
                <div className="space-y-2">
                  <Label className="text-zinc-300">Search & Select Member *</Label>

                  <Input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 bg-black border-zinc-800 text-white rounded-xl mb-2"
                  />

                  <div className="max-h-48 overflow-y-auto border border-zinc-800 rounded-xl bg-black">
                    {filteredMembers.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setSelectedMember(m.id);
                          setSearchQuery('');
                        }}
                        className={`p-3 cursor-pointer hover:bg-zinc-800 text-white ${
                          selectedMember === m.id ? 'bg-zinc-800' : ''
                        }`}
                      >
                        {m.name} - {m.phone}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Month Selector */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Select Month *</Label>
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
                <Label className="text-zinc-300">Amount Paid *</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    ₹
                  </span>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="h-12 pl-8 bg-black border-zinc-800 text-white rounded-xl"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] text-black rounded-2xl"
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
