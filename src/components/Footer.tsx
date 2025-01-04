export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 border-t border-[#9b87f5]/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/09637a17-236d-44c0-8a5f-aa2d26ea3cd2.png" 
                alt="Healplix Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-[#9b87f5]">Healplix</span>
            </div>
            <p className="text-[#7E69AB]">
              Making healthcare accessible and convenient for everyone.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#9b87f5] mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">About Us</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#9b87f5] mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#9b87f5] mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">Terms</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">Privacy</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#9b87f5]/10 mt-8 pt-8 text-center text-[#7E69AB]">
          <p>&copy; {new Date().getFullYear()} Healplix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};