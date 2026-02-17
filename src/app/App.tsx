// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from './components/ui/sonner';
// import { BottomNav } from './components/BottomNav';
// import { HomeScreen } from './screens/HomeScreen';
// import { LoginScreen } from './screens/LoginScreen';
// import { DashboardScreen } from './screens/DashboardScreen';
// import { MembersListScreen } from './screens/MembersListScreen';
// import { MemberProfileScreen } from './screens/MemberProfileScreen';
// import { AddEditMemberScreen } from './screens/AddEditMemberScreen';
// import { AddFeePaymentScreen } from './screens/AddFeePaymentScreen';

// export default function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-black">
//         <Routes>
//           <Route path="/" element={<HomeScreen />} />
//           <Route path="/login" element={<LoginScreen />} />
//           <Route path="/dashboard" element={<DashboardScreen />} />
//           <Route path="/members" element={<MembersListScreen />} />
//           <Route path="/members/:id" element={<MemberProfileScreen />} />
//           <Route path="/members/add" element={<AddEditMemberScreen />} />
//           <Route path="/payment/add" element={<AddFeePaymentScreen />} />
//         </Routes>
//         <BottomNav />
//         <Toaster 
//           position="top-center"
//           toastOptions={{
//             style: {
//               background: '#18181b',
//               color: '#fff',
//               border: '1px solid #27272a',
//             },
//           }}
//         />
//       </div>
//     </Router>
//   );
// }







import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { MembersListScreen } from './screens/MembersListScreen';
import { MemberProfileScreen } from './screens/MemberProfileScreen';
import { AddEditMemberScreen } from './screens/AddEditMemberScreen';
import { AddFeePaymentScreen } from './screens/AddFeePaymentScreen';

import { MembersProvider } from "../context/MembersContext";
import { DashboardProvider } from "../context/DashboardContext"; // ✅ NEW

export default function App() {
  return (
    <MembersProvider>
      <DashboardProvider> {/* ✅ NEW WRAPPER */}
        <Router>
          <div className="min-h-screen bg-black">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/members" element={<MembersListScreen />} />
              <Route path="/members/:id" element={<MemberProfileScreen />} />
              <Route path="/members/add" element={<AddEditMemberScreen />} />
              <Route path="/payment/add" element={<AddFeePaymentScreen />} />
            </Routes>
            <BottomNav />
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: '#18181b',
                  color: '#fff',
                  border: '1px solid #27272a',
                },
              }}
            />
          </div>
        </Router>
      </DashboardProvider>
    </MembersProvider>
  );
}

