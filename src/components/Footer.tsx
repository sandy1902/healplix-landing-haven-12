import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 border-t border-[#9b87f5]/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/0c9b5516-6d0d-4761-b5f8-d3ab135daffb.png" 
                alt="Healplix Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-[#7E69AB] text-sm md:text-base">
              Making healthcare accessible and convenient for everyone through innovative digital solutions.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-semibold text-[#9b87f5] text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faqs" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="font-semibold text-[#9b87f5] text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#9b87f5] mt-1 flex-shrink-0" />
                <span className="text-[#7E69AB] text-sm md:text-base">
                  Alibagh Road, Road No:3, Banjara Hills-500034
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#9b87f5] flex-shrink-0" />
                <a 
                  href="mailto:info@healplix.com" 
                  className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base"
                >
                  info@healplix.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#9b87f5] flex-shrink-0" />
                <a 
                  href="tel:+919704183466" 
                  className="text-[#7E69AB] hover:text-[#9b87f5] transition-colors text-sm md:text-base"
                >
                  +91 9704183466
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#9b87f5]/10 mt-8 pt-8 text-center">
          <p className="text-[#7E69AB] text-sm">
            &copy; {new Date().getFullYear()} Healplix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};