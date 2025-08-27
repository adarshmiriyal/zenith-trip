import React, { useEffect, useState } from 'react';
import { Plane, MapPin, Calendar, Users, DollarSign, Sparkles } from 'lucide-react';
import TravelForm from '@/components/TravelForm';
import ParticleBackground from '@/components/ParticleBackground';
import heroImage from '@/assets/travel-hero-bg.jpg';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(59, 130, 246, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero Overlay */}
      <div className="hero-bg absolute inset-0 z-10" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen">
        {/* Navigation */}
        <nav className="p-6">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center btn-glow">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">AI TRAVEL PLANNER</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
              <a href="#form" className="text-foreground/80 hover:text-foreground transition-colors">Plan Journey</a>
              <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">About</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black">
              Plan Your Perfect
              <br />
              Journey ✈️
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              Discover breathtaking destinations with our AI-powered travel planning platform. 
              Create unforgettable experiences tailored just for you.
            </p>
            
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
              {[
                { icon: MapPin, title: "Smart Destinations", desc: "AI-curated locations" },
                { icon: Calendar, title: "Perfect Timing", desc: "Optimal travel dates" },
                { icon: Users, title: "Group Planning", desc: "Seamless coordination" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`glass rounded-2xl p-6 group hover:scale-105 transition-all duration-300 delay-${index * 100}`}
                >
                  <feature.icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Start Your Journey</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Tell us about your dream trip and we'll create a personalized itinerary just for you
            </p>
          </div>
          
          <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <TravelForm />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose AI TRAVEL PLANNER?</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Experience the future of travel planning with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "AI-Powered", desc: "Smart recommendations based on your preferences" },
              { icon: DollarSign, title: "Budget Optimized", desc: "Get the most value for your money" },
              { icon: MapPin, title: "Global Coverage", desc: "Destinations worldwide at your fingertips" },
              { icon: Users, title: "Group Friendly", desc: "Perfect for solo trips to large groups" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 floating"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent mx-auto mb-4 flex items-center justify-center btn-glow">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 text-center border-t border-glass-border/30">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-black">AI TRAVEL PLANNER</span>
          </div>
          <p className="text-muted-foreground">
            Built with ❤️ for modern travelers. Start your next adventure today.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;