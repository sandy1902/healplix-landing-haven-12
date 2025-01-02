import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/8e3afadf-e6ef-4bd1-bc6a-974cb21eb2d7.png" 
              alt="Healplix Logo" 
              className="h-12 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-primary hover:text-secondary transition-colors">Features</a>
            <a href="#how-it-works" className="text-primary hover:text-secondary transition-colors">How it Works</a>
            <a href="#testimonials" className="text-primary hover:text-secondary transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};