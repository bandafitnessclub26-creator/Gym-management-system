import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Users, DollarSign, AlertCircle, TrendingUp, UserPlus, CreditCard, List, Loader2 } from 'lucide-react';
import { AdminHeader } from '../components/AdminHeader';
import { useMembers } from '../hooks/useMembers';
import { useDashboard } from '../hooks/useDashboard';
import { calculateFeeProgress } from '../utils/dateUtils';
import { MONTHS, getCurrentMonth, calculateMonthProgress } from '../utils/monthProgress';

export function DashboardScreen() {
 const { stats, loading: statsLoading } = useDashboard();


  const { members, loading: membersLoading } = useMembers();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  
  const monthProgress = calculateMonthProgress(selectedMonth);
  
  // Calculate upcoming dues (members due in next 5 days)
  const upcomingDues = members.filter(member => {
    const progress = calculateFeeProgress(member);
    return progress.daysRemaining > 0 && progress.daysRemaining <= 5;
  }).length;

  // Calculate paid vs pending percentage
  const paidPercentage = stats.totalMembers > 0 ? (stats.paidMembers / stats.totalMembers) * 100 : 0;

  if (statsLoading || membersLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      <AdminHeader />

      {/* Dashboard Content */}
      <div className="px-6 pt-6">
        <div className="mb-6">
          <h2 className="text-3xl text-white mb-2 font-black tracking-tight">Dashboard</h2>
          <p className="text-zinc-400">Track your gym's performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Total Members */}
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
            <CardContent className="p-5">
              <Users className="w-8 h-8 text-[#39FF14] mb-3" />
              <p className="text-3xl text-white mb-1 font-black">{stats.totalMembers}</p>
              <p className="text-zinc-400 text-xs font-semibold">Total Members</p>
            </CardContent>
          </Card>

          {/* Paid Members */}
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
            <CardContent className="p-5">
              <TrendingUp className="w-8 h-8 text-[#39FF14] mb-3" />
              <p className="text-3xl text-white mb-1 font-black">{stats.paidMembers}</p>
              <p className="text-zinc-400 text-xs font-semibold">Paid Members</p>
            </CardContent>
          </Card>

          {/* Pending Fees */}
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
            <CardContent className="p-5">
              <AlertCircle className="w-8 h-8 text-[#FF3B3B] mb-3" />
              <p className="text-3xl text-white mb-1 font-black">₹{stats.pendingFees.toLocaleString()}</p>
              <p className="text-zinc-400 text-xs font-semibold">Pending Fees</p>
            </CardContent>
          </Card>

          {/* Monthly Collection */}
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
            <CardContent className="p-5">
              <DollarSign className="w-8 h-8 text-[#39FF14] mb-3" />
              <p className="text-3xl text-white mb-1 font-black">₹{stats.monthlyCollection.toLocaleString()}</p>
              <p className="text-zinc-400 text-xs font-semibold">This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Month-wise Progress */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden mb-6">
          <CardContent className="p-6">
            <h3 className="text-white text-xl mb-4 font-black tracking-tight">Month Progress</h3>
            
            {/* Month Selector */}
            <div className="mb-4">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14] font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  {MONTHS.map((month) => (
                    <SelectItem key={month.name} value={month.name}>
                      {month.name} ({month.days} days)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ECC40] transition-all duration-500"
                  style={{ width: `${monthProgress.progressPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-zinc-400 font-semibold">
                  Day {monthProgress.daysPassed} of {monthProgress.totalDays}
                </span>
                <span className="text-sm text-[#39FF14] font-bold">
                  {monthProgress.progressPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Progress Overview */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden mb-6">
          <CardContent className="p-6">
            <h3 className="text-white text-xl mb-4 font-black tracking-tight">Payment Overview</h3>
            
            {/* Aggregate Progress Bar */}
            <div className="mb-4">
              <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ECC40] transition-all duration-500"
                  style={{ width: `${paidPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-zinc-400 font-semibold">
                  {stats.paidMembers} of {stats.totalMembers} paid
                </span>
                <span className="text-sm text-[#39FF14] font-bold">
                  {paidPercentage.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Upcoming Dues */}
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 rounded-xl">
              <AlertCircle className="w-5 h-5 text-[#FF3B3B]" />
              <span className="text-sm text-zinc-300 font-semibold">
                {upcomingDues} members due in next 5 days
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-white text-xl mb-4 font-black tracking-tight">Quick Actions</h3>
          <div className="space-y-4">
            <Link to="/members/add">
              <Button className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] hover:from-[#2ECC40] hover:to-[#39FF14] text-black rounded-2xl justify-start px-6 font-bold">
                <UserPlus className="w-5 h-5 mr-3" />
                Add New Member
              </Button>
            </Link>

            <Link to="/payment/add">
              <Button className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl justify-start px-6 border border-zinc-800 font-bold">
                <CreditCard className="w-5 h-5 mr-3 text-[#39FF14]" />
                Add Fee Payment
              </Button>
            </Link>

            <Link to="/members">
              <Button className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl justify-start px-6 border border-zinc-800 font-bold">
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

//   // ✅ updated hook (with paidMemberIds)
//   const { stats, paidMemberIds, loading: statsLoading } =
//     useDashboard(selectedMonth);

//   const { members, loading: membersLoading } = useMembers();

//   const monthProgress = calculateMonthProgress(selectedMonth);

//   // ✅ upcoming dues now month-based
//   const upcomingDues = members.filter(
//     (member) => !paidMemberIds.includes(member.id)
//   ).length;

//   const paidPercentage =
//     stats.totalMembers > 0
//       ? (stats.paidMembers / stats.totalMembers) * 100
//       : 0;

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
//           <h2 className="text-3xl text-white mb-2 font-black tracking-tight">
//             Dashboard
//           </h2>
//           <p className="text-zinc-400">Track your gym's performance</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
//             <CardContent className="p-5">
//               <Users className="w-8 h-8 text-[#39FF14] mb-3" />
//               <p className="text-3xl text-white mb-1 font-black">
//                 {stats.totalMembers}
//               </p>
//               <p className="text-zinc-400 text-xs font-semibold">
//                 Total Members
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
//             <CardContent className="p-5">
//               <TrendingUp className="w-8 h-8 text-[#39FF14] mb-3" />
//               <p className="text-3xl text-white mb-1 font-black">
//                 {stats.paidMembers}
//               </p>
//               <p className="text-zinc-400 text-xs font-semibold">
//                 Paid Members
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
//             <CardContent className="p-5">
//               <AlertCircle className="w-8 h-8 text-[#FF3B3B] mb-3" />
//               <p className="text-3xl text-white mb-1 font-black">
//                 ₹{stats.pendingFees.toLocaleString()}
//               </p>
//               <p className="text-zinc-400 text-xs font-semibold">
//                 Pending Fees
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden">
//             <CardContent className="p-5">
//               <DollarSign className="w-8 h-8 text-[#39FF14] mb-3" />
//               <p className="text-3xl text-white mb-1 font-black">
//                 ₹{stats.monthlyCollection.toLocaleString()}
//               </p>
//               <p className="text-zinc-400 text-xs font-semibold">
//                 This Month
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Month Progress */}
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

//         {/* Payment Overview */}
//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden mb-6">
//           <CardContent className="p-6">
//             <h3 className="text-white text-xl mb-4 font-black tracking-tight">
//               Payment Overview
//             </h3>

//             <div className="mb-4">
//               <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ECC40] transition-all duration-500"
//                   style={{ width: `${paidPercentage}%` }}
//                 />
//               </div>
//               <div className="flex items-center justify-between mt-2">
//                 <span className="text-sm text-zinc-400 font-semibold">
//                   {stats.paidMembers} of {stats.totalMembers} paid
//                 </span>
//                 <span className="text-sm text-[#39FF14] font-bold">
//                   {paidPercentage.toFixed(0)}%
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 rounded-xl">
//               <AlertCircle className="w-5 h-5 text-[#FF3B3B]" />
//               <span className="text-sm text-zinc-300 font-semibold">
//                 {upcomingDues} members pending this month
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Actions (UNCHANGED UI) */}
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
