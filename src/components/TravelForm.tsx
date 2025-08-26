import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check, Plane, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  from: string;
  to: string;
  date: Date | undefined;
  duration: string;
  budget: string;
  transport: string;
  people: string;
  style: string;
}

const TravelForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    from: '',
    to: '',
    date: undefined,
    duration: '',
    budget: '',
    transport: '',
    people: '',
    style: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const webhookUrl = 'https://adarshmiriyal.app.n8n.cloud/webhook/travel-planner';

  const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        date: formData.date ? format(formData.date, 'yyyy-MM-dd') : '',
        timestamp: new Date().toISOString(),
        source: 'journey-planner'
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            name: '',
            email: '',
            from: '',
            to: '',
            date: undefined,
            duration: '',
            budget: '',
            transport: '',
            people: '',
            style: ''
          });
        }, 3000);

        toast({
          title: "Journey Planned Successfully! ✈️",
          description: "Your travel details have been sent. We'll help you create the perfect journey!",
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="glass-strong rounded-3xl p-12 text-center animate-scale-in">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-pulse">
                <Check className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-ping"></div>
            </div>
            <h3 className="text-3xl font-bold text-gradient mb-4">Journey Planned!</h3>
            <p className="text-muted-foreground">Your perfect adventure awaits ✨</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your full name"
              className="input-glow bg-background/50 border-glass-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              className="input-glow bg-background/50 border-glass-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>

        {/* Travel Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">From</label>
            <Input
              value={formData.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              placeholder="Departure city"
              className="input-glow bg-background/50 border-glass-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">To</label>
            <Input
              value={formData.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              placeholder="Destination city"
              className="input-glow bg-background/50 border-glass-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>

        {/* Date and Duration */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">Departure Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal input-glow bg-background/50 border-glass-border text-foreground",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass-strong border-glass-border" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => handleInputChange('date', date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">Duration</label>
            <Input
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="e.g., 7 days"
              className="input-glow bg-background/50 border-glass-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>

        {/* Budget and Transport */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">Budget</label>
            <Input
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              placeholder="e.g., $2000"
              className="input-glow bg-background/50 border-glass-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">Transport</label>
            <Input
              value={formData.transport}
              onChange={(e) => handleInputChange('transport', e.target.value)}
              placeholder="Plane, Train, Car, etc."
              className="input-glow bg-background/50 border-glass-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>

        {/* People and Style */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">Number of People</label>
            <Input
              type="number"
              min="1"
              value={formData.people}
              onChange={(e) => handleInputChange('people', e.target.value)}
              placeholder="2"
              className="input-glow bg-background/50 border-glass-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent">Travel Style</label>
            <Select value={formData.style} onValueChange={(value) => handleInputChange('style', value)}>
              <SelectTrigger className="input-glow bg-background/50 border-glass-border text-foreground">
                <SelectValue placeholder="Choose your style" />
              </SelectTrigger>
              <SelectContent className="glass-strong border-glass-border">
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="relaxation">Relaxation</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-semibold btn-glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-white border-0 rounded-2xl group"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Planning Your Journey...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Plane className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Plan My Perfect Journey</span>
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default TravelForm;