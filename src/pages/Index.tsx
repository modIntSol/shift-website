import { ArrowRight, CheckCircle, Zap, Shield, Users, Mail, Phone, MapPin, Building, Code, Database, Cloud, Lock, Smartphone, Globe, TrendingUp, Award, Target, Briefcase, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, useRef } from 'react';

const Index = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home' },
        { id: 'services' },
        { id: 'process' },
        { id: 'client-results' },
        { id: 'contact' }
      ];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Video loading handlers
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    console.warn('Video failed to load, falling back to static background');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, and Message).",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission (replace with actual submission logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">shift*</div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className={`${activeSection === 'home' ? 'text-white' : 'text-white/30'} hover:text-white transition-colors`}>Home</a>
            <a href="#services" className={`${activeSection === 'services' ? 'text-white' : 'text-white/30'} hover:text-white transition-colors`}>Services</a>
            <a href="#process" className={`${activeSection === 'process' ? 'text-white' : 'text-white/30'} hover:text-white transition-colors`}>Process</a>
            <a href="#client-results" className={`${activeSection === 'client-results' ? 'text-white' : 'text-white/30'} hover:text-white transition-colors`}>Results</a>
            <a href="/blog" className={`text-white/30 hover:text-white transition-colors`}>Blog</a>
            <a href="#contact" className={`${activeSection === 'contact' ? 'text-white' : 'text-white/30'} hover:text-white transition-colors`}>Contact</a>
          </div>
          <div className="flex gap-4">
            <Button 
              asChild 
              variant="ghost" 
              className="text-white border border-white hover:bg-white hover:text-black"
            >
              <a href="https://calendly.com/abe-sshift/15-minute-meeting-for-shift" target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Video background with lazy loading and fallback */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          preload="metadata"
        >
          <source src="/video/hero-bg.webm" type="video/webm" />
          <source src="/video/hero-bg.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        
        {/* Loading placeholder */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 z-0">
            {/* Subtle loading animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        
        {/* Fallback background for video errors */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 z-0" />
        )}
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="container mx-auto text-center relative z-20">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your 
              <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"> Growth</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Professional marketing services for businesses that want to leverage technology for exponential results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToContact} size="lg" className="bg-white hover:bg-transparent hover:border-white border border-transparent text-black hover:text-white text-lg px-8 py-3 transition-all duration-300">
                GET STARTED
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white border border-white hover:bg-white hover:text-black text-lg px-8 py-3">
                <a href="/software-development">
                  Build your software
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30 hover:bg-black/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Lead Generation</h3>
                <p className="text-white/80">
                  Our proprietary algorithms identify and engage your ideal customers with precision targeting and personalized outreach.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30 hover:bg-black/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">Full-Funnel Paid Ad Campaigns</h3>
                <p className="text-white/80">
                  Strategic campaigns that guide prospects from awareness to conversion with optimized messaging at every touchpoint.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30 hover:bg-black/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">Conversion-Focused Landing Pages</h3>
                <p className="text-white/80">
                  High-performance landing pages designed to convert visitors into leads with persuasive copy and frictionless UX.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30 hover:bg-black/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">CRM & Email Automation Setup</h3>
                <p className="text-white/80">
                  Streamlined systems that nurture leads, automate follow-ups, and provide actionable insights for your sales team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 bg-blue-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/30 backdrop-blur-md border-blue-500/30 hover:bg-black/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-4">01</div>
                <h3 className="text-xl font-semibold text-white mb-3">Audit</h3>
                <p className="text-white/80">
                  We analyze your current marketing efforts, identify opportunities, and pinpoint areas for improvement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-md border-blue-500/30 hover:bg-black/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-4">02</div>
                <h3 className="text-xl font-semibold text-white mb-3">Strategy</h3>
                <p className="text-white/80">
                  We develop a tailored plan that aligns with your business goals and leverages the right channels.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-md border-blue-500/30 hover:bg-black/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-4">03</div>
                <h3 className="text-xl font-semibold text-white mb-3">Scale</h3>
                <p className="text-white/80">
                  We execute, measure, and continuously optimize to drive sustainable growth for your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Results Section */}
      <section id="client-results" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Client Results</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">300%</div>
                <p className="text-white/80 text-sm">
                  Increase in qualified leads for TechNova's enterprise software
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">8.5x</div>
                <p className="text-white/80 text-sm">
                  ROAS for GrowthMax's e-commerce campaigns
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">65%</div>
                <p className="text-white/80 text-sm">
                  Reduction in cost per acquisition for SaaS clients
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">12+</div>
                <p className="text-white/80 text-sm">
                  Months of consistent growth for our average client
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-blue-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Growth?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Schedule a free strategy call to discuss how we can help your business.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-black/50 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-white font-medium mb-2">Your Name *</Label>
                      <Input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-blue-400"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label className="block text-white font-medium mb-2">Your Email *</Label>
                      <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-blue-400"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-white font-medium mb-2">Company Name</Label>
                    <Input 
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-blue-400"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <Label className="block text-white font-medium mb-2">Service Needed</Label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="">Select a service</option>
                      <option value="lead-generation">AI-Powered Lead Generation</option>
                      <option value="paid-ads">Full-Funnel Paid Ad Campaigns</option>
                      <option value="landing-pages">Conversion-Focused Landing Pages</option>
                      <option value="crm-automation">CRM & Email Automation Setup</option>
                    </select>
                  </div>

                  <div>
                    <Label className="block text-white font-medium mb-2">Your Message *</Label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-blue-400 resize-none"
                      placeholder="Tell us about your business goals..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  >
                    {isSubmitting ? 'SENDING...' : 'GET STARTED'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-blue-500/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">shift*</div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-white/70 hover:text-white transition-colors">Home</a>
                <a href="#services" className="block text-white/70 hover:text-white transition-colors">Services</a>
                <a href="#process" className="block text-white/70 hover:text-white transition-colors">Process</a>
                <a href="#client-results" className="block text-white/70 hover:text-white transition-colors">Results</a>
                <a href="/blog" className="block text-white/70 hover:text-white transition-colors">Blog</a>
                <a href="#contact" className="block text-white/70 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Terms of Service</a>
                <a href="/admin/login" className="block text-white/70 hover:text-white transition-colors">Admin</a>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-blue-500/30">
            <div className="text-white/50 text-sm">
              © 2024 shift*. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
