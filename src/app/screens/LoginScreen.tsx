import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Dumbbell, Lock } from 'lucide-react';
import { toast } from 'sonner';

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Secure credentials
  const ADMIN_EMAIL = 'admin@bandafitness.com';
  const ADMIN_PASSWORD = 'Banda@2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate a brief loading state for security
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store authentication token
        localStorage.setItem('banda_fitness_auth', 'authenticated');
        toast.success('Login successful! Welcome back.');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#39FF14] to-[#FFD700] rounded-2xl flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-2xl text-white mb-1">Admin Login</h1>
          <p className="text-zinc-500 text-sm">Banda Fitness Club</p>
        </div>

        {/* Login Card */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300 text-sm">
                  Email / Username
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300 text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 bg-black border-zinc-800 text-white rounded-xl focus:border-[#39FF14] focus:ring-[#39FF14]"
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] hover:from-[#2ECC40] hover:to-[#39FF14] text-black rounded-xl shadow-lg shadow-[#39FF14]/20"
              >
                <Lock className="w-4 h-4 mr-2" />
                Login to Dashboard
              </Button>
            </form>

            {/* Footer Text */}
            <div className="mt-6 text-center">
              <p className="text-zinc-500 text-xs flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Authorized access only
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-zinc-400 text-sm hover:text-[#39FF14] transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}