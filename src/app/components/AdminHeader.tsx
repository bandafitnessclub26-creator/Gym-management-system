import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import { toast } from 'sonner';

export function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('banda_fitness_auth');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="Banda Fitness Club" className="w-12 h-12 rounded-full" />
          <h1 className="text-white text-lg font-bold tracking-wider">BANDA FITNESS CLUB</h1>
        </div>
        <Button
          onClick={handleLogout}
          className="bg-[#FF3B3B] hover:bg-[#DC2626] text-white h-10 px-4 rounded-xl font-bold"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}