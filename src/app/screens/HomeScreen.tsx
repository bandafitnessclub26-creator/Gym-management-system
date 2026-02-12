import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Dumbbell, Heart, Users, TrendingUp, MapPin, Phone } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import heroImage from '../../assets/hero.png';

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Banda Fitness Club" className="w-12 h-12 rounded-full" />
            <h1 className="text-white text-lg font-bold tracking-wider">BANDA FITNESS CLUB</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={heroImage}
          alt="Gym interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-5xl text-white mb-4 font-black tracking-tight leading-tight">
              Never Give Up.<br />Stay Strong.
            </h2>
            <p className="text-[#39FF14] text-lg tracking-widest font-semibold">
              Premium Gym • Strength • Discipline
            </p>
          </div>
        </div>
      </div>

      {/* Gym Details Card */}
      <div className="px-6 -mt-8 relative z-10">
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-xl text-white mb-1 font-bold">Owner</h3>
              <p className="text-[#39FF14] text-lg">Shivam Dwivedi</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-300">
                <MapPin className="w-5 h-5 text-[#39FF14]" />
                <span>Banda, Uttar Pradesh</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Phone className="w-5 h-5 text-[#39FF14]" />
                <span>+91 8960653217</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Section */}
      <div className="px-6 mt-8">
        <h3 className="text-2xl text-white mb-4 font-black tracking-tight">Our Services</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Dumbbell, title: 'Strength Training', color: '#39FF14' },
            { icon: Heart, title: 'Cardio Zone', color: '#FF3B3B' },
            { icon: Users, title: 'Personal Training', color: '#39FF14' },
            { icon: TrendingUp, title: 'Weight Loss', color: '#FF3B3B' },
          ].map((service, idx) => (
            <Card 
              key={idx} 
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-5 text-center">
                <service.icon 
                  className="w-8 h-8 mx-auto mb-3" 
                  style={{ color: service.color }}
                />
                <p className="text-white text-sm font-semibold">{service.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Membership Plans */}
      <div className="px-6 mt-8">
        <h3 className="text-2xl text-white mb-4 font-black tracking-tight">Membership Plans</h3>
        <div className="space-y-3">
          {[
            { name: '1 Month', price: '₹899', duration: '30 Days' },
            { name: '3 Months', price: '₹2,499', duration: '90 Days', badge: 'Popular' },
            { name: '6 Months', price: '₹4,599', duration: '180 Days', badge: 'Save 15%' },
            { name: '1 Year', price: '₹8,999', duration: '365 Days', badge: 'Best Value' },
          ].map((plan, idx) => (
            <Card 
              key={idx}
              className="bg-gradient-to-r from-zinc-900 to-zinc-950 border-zinc-800 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white text-lg font-bold">{plan.name}</h4>
                      {plan.badge && (
                        <span className="text-xs bg-[#39FF14] text-black px-2 py-1 rounded-full font-bold">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm">{plan.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#39FF14] text-3xl font-black">{plan.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 mt-8">
        <Link to="/login">
          <Button 
            className="w-full h-16 bg-gradient-to-r from-[#39FF14] to-[#2ECC40] hover:from-[#2ECC40] hover:to-[#39FF14] text-black text-xl font-black rounded-2xl shadow-lg shadow-[#39FF14]/30"
          >
            ADMIN LOGIN
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="text-center text-zinc-500 text-xs mt-8 px-6">
        <p>© 2026 Banda Fitness Club. All rights reserved.</p>
      </div>
    </div>
  );
}