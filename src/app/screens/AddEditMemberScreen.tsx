// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
// import { ArrowLeft, Save, Loader2, Upload, Camera } from 'lucide-react';
// import { toast } from 'sonner';
// import { membersApi } from '../lib/api';

// export function AddEditMemberScreen() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [profilePicture, setProfilePicture] = useState<string>('');
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     plan: 'Monthly',
//     monthlyFee: '',
//     joinDate: new Date().toISOString().split('T')[0],
//   });

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result as string);
//         toast.success('Profile picture uploaded!');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.phone || !formData.monthlyFee) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       await membersApi.create({
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         plan: formData.plan as 'Monthly' | 'Quarterly' | 'Yearly',
//         monthlyFee: Number(formData.monthlyFee),
//         joinDate: new Date(formData.joinDate),
//         feeStartDate: new Date(),
//         feeEndDate: new Date(),
//         lastPaymentDate: new Date(),
//         nextDueDate: new Date(),
//         feeStatus: 'Pending',
//         profilePicture: profilePicture,
//       });
//       toast.success('Member added successfully!');
//       navigate('/members');
//     } catch (error) {
//       console.error('Error creating member:', error);
//       toast.error('Failed to add member. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black pb-24">
//       {/* Header */}
//       <div className="bg-gradient-to-b from-zinc-900 to-black pt-12 pb-6 px-6">
//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h1 className="text-2xl text-white">Add New Member</h1>
//         </div>
//       </div>

//       <div className="px-6">
//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden">
//           <CardContent className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Profile Picture */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">
//                   Profile Picture <span className="text-zinc-500 text-xs">(Optional)</span>
//                 </Label>
//                 <div className="flex items-center gap-4">
//                   <Avatar className="w-24 h-24 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
//                     {profilePicture && <AvatarImage src={profilePicture} alt="Profile" />}
//                     <AvatarFallback className="bg-transparent text-black text-2xl font-bold">
//                       {formData.name ? formData.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'UP'}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <label
//                       htmlFor="profilePictureUpload"
//                       className="flex items-center justify-center gap-2 h-12 px-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl cursor-pointer transition-colors font-semibold"
//                     >
//                       <Camera className="w-4 h-4" />
//                       {profilePicture ? 'Change Picture' : 'Upload from Gallery'}
//                       <input
//                         id="profilePictureUpload"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                       />
//                     </label>
//                     <p className="text-zinc-500 text-xs mt-2">Max size: 5MB</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Full Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-zinc-300">
//                   Full Name <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="Enter full name"
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                 />
//               </div>

//               {/* Phone Number */}
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-zinc-300">
//                   Phone Number <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <Input
//                   id="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   placeholder="+91 98765 43210"
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                 />
//               </div>

//               {/* Email (Optional) */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-zinc-300">
//                   Email <span className="text-zinc-500 text-xs">(Optional)</span>
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="email@example.com"
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                 />
//               </div>

//               {/* Membership Plan */}
//               <div className="space-y-2">
//                 <Label htmlFor="plan" className="text-zinc-300">
//                   Membership Plan <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <Select
//                   value={formData.plan}
//                   onValueChange={(value) => setFormData({ ...formData, plan: value })}
//                 >
//                   <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
//                     <SelectItem value="Monthly">Monthly</SelectItem>
//                     <SelectItem value="Quarterly">Quarterly</SelectItem>
//                     <SelectItem value="Yearly">Yearly</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Monthly Fee */}
//               <div className="space-y-2">
//                 <Label htmlFor="fee" className="text-zinc-300">
//                   Monthly Fee Amount <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">₹</span>
//                   <Input
//                     id="fee"
//                     type="number"
//                     value={formData.monthlyFee}
//                     onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
//                     placeholder="2000"
//                     className="h-12 pl-8 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                   />
//                 </div>
//               </div>

//               {/* Join Date */}
//               <div className="space-y-2">
//                 <Label htmlFor="joinDate" className="text-zinc-300">
//                   Join Date <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <Input
//                   id="joinDate"
//                   type="date"
//                   value={formData.joinDate}
//                   onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                 />
//               </div>

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
//                     Save Member
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
// import { ArrowLeft, Save, Loader2, Camera } from "lucide-react";
// import { toast } from "sonner";
// import { membersApi } from "../lib/api";

// export function AddEditMemberScreen() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [profilePicture, setProfilePicture] = useState<string>("");

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     plan: "Monthly",
//     monthlyFee: "",
//     joinDate: new Date().toISOString().split("T")[0],
//   });

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image size should be less than 5MB");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProfilePicture(reader.result as string);
//       toast.success("Profile picture uploaded!");
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.phone || !formData.monthlyFee) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       await membersApi.create({
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         plan: formData.plan as 'Monthly' | 'Quarterly' | 'Half Year' | 'Yearly',
//         monthlyFee: Number(formData.monthlyFee),
//         joinDate: new Date(formData.joinDate),

//         // ✅ IMPORTANT FIX
//         profileUrl: profilePicture,
//       });

//       toast.success("Member added successfully!");
//       navigate("/members");
//     } catch (error) {
//       toast.error("Failed to add member. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black pb-24">
//       {/* Header */}
//       <div className="bg-gradient-to-b from-zinc-900 to-black pt-12 pb-6 px-6">
//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h1 className="text-2xl text-white font-bold">Add New Member</h1>
//         </div>
//       </div>

//       <div className="px-6">
//         <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden">
//           <CardContent className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Profile Picture */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">
//                   Profile Picture{" "}
//                   <span className="text-zinc-500 text-xs">(Optional)</span>
//                 </Label>

//                 <div className="flex items-center gap-4">
//                   <Avatar className="w-24 h-24 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
//                     {profilePicture && (
//                       <AvatarImage src={profilePicture} alt="Profile" />
//                     )}
//                     <AvatarFallback className="bg-transparent text-black text-2xl font-bold">
//                       {formData.name
//                         ? formData.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")
//                             .slice(0, 2)
//                         : "UP"}
//                     </AvatarFallback>
//                   </Avatar>

//                   <div className="flex-1">
//                     <label
//                       htmlFor="profilePictureUpload"
//                       className="flex items-center justify-center gap-2 h-12 px-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl cursor-pointer transition-colors font-semibold"
//                     >
//                       <Camera className="w-4 h-4" />
//                       {profilePicture
//                         ? "Change Picture"
//                         : "Upload from Gallery"}
//                       <input
//                         id="profilePictureUpload"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                       />
//                     </label>
//                     <p className="text-zinc-500 text-xs mt-2">Max size: 5MB</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Full Name */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">
//                   Full Name <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <Input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   placeholder="Enter full name"
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                 />
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">
//                   Phone Number <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <Input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                   placeholder="+91 98765 43210"
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
//                 />
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">Email</Label>
//                 <Input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   placeholder="email@example.com"
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14]"
//                 />
//               </div>

//               {/* Plan */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">Membership Plan</Label>
//                 <Select
//                   value={formData.plan}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, plan: value })
//                   }
//                 >
//                   <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14]">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
//                     <SelectItem value="Monthly">Monthly - ₹899</SelectItem>
//                     <SelectItem value="Quarterly">Quarterly - ₹2499</SelectItem>
//                     <SelectItem value="Half Year">Half Year - ₹4599</SelectItem>
//                     <SelectItem value="Yearly">Yearly - ₹8999</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Monthly Fee */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">
//                   Monthly Fee Amount <span className="text-[#FF3B3B]">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     ₹
//                   </span>
//                   <Input
//                     type="number"
//                     value={formData.monthlyFee}
//                     onChange={(e) =>
//                       setFormData({ ...formData, monthlyFee: e.target.value })
//                     }
//                     placeholder="2000"
//                     className="h-12 pl-8 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14]"
//                   />
//                 </div>
//               </div>

//               {/* Join Date */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-300">Join Date</Label>
//                 <Input
//                   type="date"
//                   value={formData.joinDate}
//                   onChange={(e) =>
//                     setFormData({ ...formData, joinDate: e.target.value })
//                   }
//                   className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14]"
//                 />
//               </div>

//               {/* Save Button */}
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-14 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] hover:from-[#2ECC40] hover:to-[#39FF14] text-black rounded-2xl disabled:opacity-50 font-bold"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-5 h-5 mr-2" />
//                     Save Member
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





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowLeft, Save, Loader2, Camera } from "lucide-react";
import { toast } from "sonner";
import { membersApi } from "../lib/api";
import { useMembersContext } from "../../context/MembersContext";
import { useDashboardContext } from "../../context/DashboardContext"; // ✅ Added

export function AddEditMemberScreen() {
  const navigate = useNavigate();
  const { refresh } = useMembersContext();
  const { refresh: refreshDashboard } = useDashboardContext(); // ✅ Added

  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    plan: "Monthly",
    monthlyFee: "",
    joinDate: new Date().toISOString().split("T")[0],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result as string);
      toast.success("Profile picture uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.monthlyFee) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      await membersApi.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        plan: formData.plan as
          | "Monthly"
          | "Quarterly"
          | "Half Year"
          | "Yearly",
        monthlyFee: Number(formData.monthlyFee),
        joinDate: new Date(formData.joinDate),
        profileUrl: profilePicture,
      });

      // ✅ Refresh Members
      await refresh();

      // ✅ Refresh Dashboard
      await refreshDashboard();

      toast.success("Member added successfully!");
      navigate("/members");

    } catch (error) {
      toast.error("Failed to add member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-zinc-900 to-black pt-12 pb-6 px-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl text-white font-bold">Add New Member</h1>
        </div>
      </div>

      <div className="px-6">
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Profile Picture */}
              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Profile Picture{" "}
                  <span className="text-zinc-500 text-xs">(Optional)</span>
                </Label>

                <div className="flex items-center gap-4">
                  <Avatar className="w-24 h-24 bg-gradient-to-br from-[#39FF14] to-[#2ECC40]">
                    {profilePicture && (
                      <AvatarImage src={profilePicture} alt="Profile" />
                    )}
                    <AvatarFallback className="bg-transparent text-black text-2xl font-bold">
                      {formData.name
                        ? formData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        : "UP"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <label
                      htmlFor="profilePictureUpload"
                      className="flex items-center justify-center gap-2 h-12 px-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl cursor-pointer transition-colors font-semibold"
                    >
                      <Camera className="w-4 h-4" />
                      {profilePicture
                        ? "Change Picture"
                        : "Upload from Gallery"}
                      <input
                        id="profilePictureUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Full Name <span className="text-[#FF3B3B]">*</span>
                </Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-12 bg-black border-zinc-800 text-white rounded-xl"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Phone Number <span className="text-[#FF3B3B]">*</span>
                </Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-12 bg-black border-zinc-800 text-white rounded-xl"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-12 bg-black border-zinc-800 text-white rounded-xl"
                />
              </div>

              {/* Plan */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Membership Plan</Label>
                <Select
                  value={formData.plan}
                  onValueChange={(value) =>
                    setFormData({ ...formData, plan: value })
                  }
                >
                  <SelectTrigger className="h-12 bg-black border-zinc-800 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="Monthly">Monthly - ₹899</SelectItem>
                    <SelectItem value="Quarterly">Quarterly - ₹2499</SelectItem>
                    <SelectItem value="Half Year">Half Year - ₹4599</SelectItem>
                    <SelectItem value="Yearly">Yearly - ₹8999</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Monthly Fee */}
              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Monthly Fee Amount <span className="text-[#FF3B3B]">*</span>
                </Label>
                <Input
                  type="number"
                  value={formData.monthlyFee}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyFee: e.target.value })
                  }
                  className="h-12 bg-black border-zinc-800 text-white rounded-xl"
                />
              </div>

              {/* Join Date */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Join Date</Label>
                <Input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) =>
                    setFormData({ ...formData, joinDate: e.target.value })
                  }
                  className="h-12 bg-black border-zinc-800 text-white rounded-xl"
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
                    Save Member
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
