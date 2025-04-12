
import React from 'react';
import { CreditCard, Twitter, Facebook, Instagram, Mail, Shield, Info, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cardwise-blue-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-6 w-6 text-cardwise-mint-400" />
              <h2 className="text-xl font-bold">CardWise</h2>
            </div>
            <p className="text-cardwise-blue-100 mb-6">
              Maximize your credit card rewards and benefits with personalized recommendations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                  Card Recommendations
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                  Benefit Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                  Card Comparison
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                  Reward Optimization
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                  Financial Profile
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors flex items-center gap-1">
                  Blog
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors flex items-center gap-1">
                  Credit Card Guides
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors flex items-center gap-1">
                  Reward Calculators
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors flex items-center gap-1">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors flex items-center gap-1">
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-cardwise-blue-100 hover:text-white transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cardwise-blue-400 mt-8 pt-8 text-center text-cardwise-blue-100 text-sm">
          <p>© {new Date().getFullYear()} CardWise. All rights reserved.</p>
          <p className="mt-2">
            CardWise is not affiliated with any credit card issuer. Card offers are subject to change.
            We may receive compensation from our partners when you apply through our links.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
