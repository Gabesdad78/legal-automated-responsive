import React from 'react';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">
                AI Lawsuit Defense Generator
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional legal document generation powered by AI. 
              Defend yourself against any lawsuit with state-specific, 
              court-ready responses.
            </p>
            <div className="text-sm text-gray-500">
              <p>© 2024 AI Lawsuit Defense Generator. All rights reserved.</p>
              <p className="mt-1">
                This service provides legal document templates and should not 
                replace professional legal advice.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-gray-400">support@lawsuitdefense.ai</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-gray-400">1-800-DEFENSE</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-gray-400">Available in all 50 states</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            <strong>Legal Disclaimer:</strong> This website provides legal document templates 
            and information for educational purposes only. It does not constitute legal advice 
            and should not replace consultation with a qualified attorney.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;