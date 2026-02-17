






// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// import { Users, DollarSign, AlertCircle, TrendingUp, UserPlus, CreditCard, List, Loader2 } from 'lucide-react';
// import { AdminHeader } from '../components/AdminHeader';
// import { useMembers } from '../hooks/useMembers';
// import { useDashboard } from '../hooks/useDashboard';
// import { calculateFeeProgress } from '../utils/dateUtils';
// import { MONTHS, getCurrentMonth, calculateMonthProgress } from '../utils/monthProgress';

// export function DashboardScreen() {

//   const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

//   // ✅ FIXED: selectedMonth pass kiya
//   const { stats, loading: statsLoading } = useDashboard(selectedMonth);

//   const { members, loading: membersLoading } = useMembers();
  
//   const monthProgress = calculateMonthProgress(selectedMonth);
  
//   const upcomingDues = members.filter(member => {
//     const progress = calculateFeeProgress(member);
//     return progress.daysRemaining > 0 && progress.daysRemaining <= 5;
//   }).length;

//   const paidPercentage = stats.totalMembers > 0 
//     ? (stats.paidMembers / stats.totalMembers) * 100 
//     : 0;

//   if (statsLoading || membersLoading) {
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
//           <h2 className="text-3xl text-white mb-2 font-black tracking-tight">Dashboard</h2>
//           <p className="text-zinc-400">Track your gym's performance</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
//             <CardContent className="p-5">
//               <Users className="w-8 h-8 text-[#39FF14] mb-3" />
//               <p className="text-3xl text-white mb-1 font-black">{stats.totalMembers}</p>
//               <p className="text-zinc-400 text-xs font-semibold">Total Members</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
//             <CardContent className="p-5">
//               <TrendingUp className="w-8 h-8 text-[#39FF14] mb-3" />
//               <p className="text-3xl text-white mb-1 font-black">{stats.paidMembers}</p>
//               <p className="text-zinc-400 text-xs font-semibold">Paid Members</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
//             <CardContent className="p-5">
//               <AlertCircle className="w-8 h-8 text-[#FF3B3B] mb-3" />
//               <p className="text-3xl text-white mb-1 font-black">
//                 ₹{stats.pendingFees.toLocaleString()}
//               </p>
//               <p className="text-zinc-400 text-xs font-semibold">Pending Fees</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
//             <CardContent className="p-5">
//               <DollarSign className="w-8 h-8 text-[#39FF14] mb-3" />
//               <p className="text-3xl text-white mb-1 font-black">
//                 ₹{stats.monthlyCollection.toLocaleString()}
//               </p>
//               <p className="text-zinc-400 text-xs font-semibold">This Month</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Month-wise Progress */}
//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden mb-6">
//           <CardContent className="p-6">
//             <h3 className="text-white text-xl mb-4 font-black tracking-tight">
//               Month Progress
//             </h3>

//             <div className="mb-4">
//               <Select value={selectedMonth} onValueChange={setSelectedMonth}>
//                 <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14] font-semibold">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
//                   {MONTHS.map((month) => (
//                     <SelectItem key={month.name} value={month.name}>
//                       {month.name} ({month.days} days)
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="mb-4">
//               <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ECC40] transition-all duration-500"
//                   style={{ width: `${monthProgress.progressPercentage}%` }}
//                 />
//               </div>
//               <div className="flex items-center justify-between mt-2">
//                 <span className="text-sm text-zinc-400 font-semibold">
//                   Day {monthProgress.daysPassed} of {monthProgress.totalDays}
//                 </span>
//                 <span className="text-sm text-[#39FF14] font-bold">
//                   {monthProgress.progressPercentage.toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Actions */}
//         <div>
//           <h3 className="text-white text-xl mb-4 font-black tracking-tight">
//             Quick Actions
//           </h3>
//           <div className="space-y-4">
//             <Link to="/members/add">
//               <Button className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] hover:from-[#2ECC40] hover:to-[#39FF14] text-black rounded-2xl justify-start px-6 font-bold">
//                 <UserPlus className="w-5 h-5 mr-3" />
//                 Add New Member
//               </Button>
//             </Link>

//             <Link to="/payment/add">
//               <Button className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl justify-start px-6 border border-zinc-800 font-bold">
//                 <CreditCard className="w-5 h-5 mr-3 text-[#39FF14]" />
//                 Add Fee Payment
//               </Button>
//             </Link>

//             <Link to="/members">
//               <Button className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl justify-start px-6 border border-zinc-800 font-bold">
//                 <List className="w-5 h-5 mr-3 text-[#39FF14]" />
//                 View All Members
//               </Button>
//             </Link>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }







import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Users, DollarSign, AlertCircle, TrendingUp, UserPlus, CreditCard, List, Loader2 } from 'lucide-react';
import { AdminHeader } from '../components/AdminHeader';
import { useMembersContext } from '../../context/MembersContext';
import { calculateFeeProgress } from '../utils/dateUtils';
import { MONTHS, getCurrentMonth, calculateMonthProgress } from '../utils/monthProgress';
import { useState } from 'react';

export function DashboardScreen() {

  const { members, loading } = useMembersContext();

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const monthProgress = calculateMonthProgress(selectedMonth);

  // ✅ CALCULATE STATS FROM MEMBERS (NO API)
  const totalMembers = members.length;

  const paidMembers = members.filter(
    m => m.fee_status === "Paid"
  ).length;

  const pendingFees = members
    .filter(m => m.fee_status !== "Paid")
    .reduce((sum, m) => sum + (m.monthly_fee || 0), 0);

  const monthlyCollection = members
    .filter(m => m.fee_status === "Paid")
    .reduce((sum, m) => sum + (m.monthly_fee || 0), 0);

  const upcomingDues = members.filter(member => {
    const progress = calculateFeeProgress(member);
    return progress.daysRemaining > 0 && progress.daysRemaining <= 5;
  }).length;

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

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl text-white mb-2 font-black tracking-tight">
            Dashboard
          </h2>
          <p className="text-zinc-400">
            Track your gym's performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl">
            <CardContent className="p-5">
              <Users className="w-8 h-8 text-[#39FF14] mb-3" />
              <p className="text-3xl text-white font-black">{totalMembers}</p>
              <p className="text-zinc-400 text-xs font-semibold">Total Members</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl">
            <CardContent className="p-5">
              <TrendingUp className="w-8 h-8 text-[#39FF14] mb-3" />
              <p className="text-3xl text-white font-black">{paidMembers}</p>
              <p className="text-zinc-400 text-xs font-semibold">Paid Members</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl">
            <CardContent className="p-5">
              <AlertCircle className="w-8 h-8 text-[#FF3B3B] mb-3" />
              <p className="text-3xl text-white font-black">
                ₹{pendingFees.toLocaleString()}
              </p>
              <p className="text-zinc-400 text-xs font-semibold">Pending Fees</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl">
            <CardContent className="p-5">
              <DollarSign className="w-8 h-8 text-[#39FF14] mb-3" />
              <p className="text-3xl text-white font-black">
                ₹{monthlyCollection.toLocaleString()}
              </p>
              <p className="text-zinc-400 text-xs font-semibold">Collection</p>
            </CardContent>
          </Card>

        </div>

        {/* Month Progress */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl mb-6">
          <CardContent className="p-6">
            <h3 className="text-white text-xl mb-4 font-black">Month Progress</h3>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl mb-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                {MONTHS.map((month) => (
                  <SelectItem key={month.name} value={month.name}>
                    {month.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ECC40]"
                style={{ width: `${monthProgress.progressPercentage}%` }}
              />
            </div>

          </CardContent>
        </Card>

        {/* Upcoming Dues */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl mb-6">
          <CardContent className="p-5">
            <h3 className="text-white text-lg font-bold mb-2">
              Upcoming Dues (Next 5 Days)
            </h3>
            <p className="text-[#FF3B3B] text-2xl font-black">
              {upcomingDues}
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-white text-xl mb-4 font-black">Quick Actions</h3>

          <div className="space-y-4">
            <Link to="/members/add">
              <Button className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] text-black rounded-2xl justify-start px-6 font-bold">
                <UserPlus className="w-5 h-5 mr-3" />
                Add New Member
              </Button>
            </Link>

            <Link to="/payment/add">
              <Button className="w-full h-14 bg-zinc-900 text-white rounded-2xl justify-start px-6 border border-zinc-800 font-bold">
                <CreditCard className="w-5 h-5 mr-3 text-[#39FF14]" />
                Add Fee Payment
              </Button>
            </Link>

            <Link to="/members">
              <Button className="w-full h-14 bg-zinc-900 text-white rounded-2xl justify-start px-6 border border-zinc-800 font-bold">
                <List className="w-5 h-5 mr-3 text-[#39FF14]" />
                View All Members
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
