export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 border-t border-[#9b87f5]/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/0c9b5516-6d0d-4761-b5f8-d3ab135daffb.png" 
                alt="Healplix Logo" 
                className="h-8 md:h-12 w-auto"
              />
            </div>
            <p className="text-[#7E69AB] text-sm md:text-base">
              Making healthcare accessible and convenient for everyone.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#9b87f5] text-sm md:text-base mb-3 md:mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">About Us</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">Careers</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#9b87f5] text-sm md:text-base mb-3 md:mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">Blog</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">Help Center</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#9b87f5] text-sm md:text-base mb-3 md:mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">Terms</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">Privacy</a></li>
              <li><a href="#" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#9b87f5]/10 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-[#7E69AB] text-sm md:text-base">&copy; {new Date().getFullYear()} Healplix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};