import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/719ebe3c-450b-43b2-beb7-24a67b55231c.png" 
              alt="Healplix Logo" 
              className="h-12 w-auto" // Increased from h-8 to h-12
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