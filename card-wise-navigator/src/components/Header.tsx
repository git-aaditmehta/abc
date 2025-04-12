import React, { useState } from 'react';
import { Menu, X, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Allow time for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <CreditCard className="h-7 w-7 text-cardwise-teal-500" />
          </Link>
          <Link to="/" className="text-xl font-bold text-cardwise-blue-500">CardWise</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigateToSection('features')} className="text-foreground/80 hover:text-cardwise-teal-500 transition-colors">Features</button>
          <button onClick={() => navigateToSection('compare')} className="text-foreground/80 hover:text-cardwise-teal-500 transition-colors">Compare Cards</button>
          <Link to="/learning-center" className="text-foreground/80 hover:text-cardwise-teal-500 transition-colors">Learning Center</Link>
          <button onClick={() => navigateToSection('profile')} className="text-foreground/80 hover:text-cardwise-teal-500 transition-colors">Create Profile</button>
          <Button className="bg-cardwise-teal-500 hover:bg-cardwise-teal-600" asChild>
            <Link to="/">Get Started</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-border">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <button 
              onClick={() => navigateToSection('features')}
              className="text-left text-foreground/80 hover:text-cardwise-teal-500 transition-colors py-2"
            >
              Features
            </button>
            <button 
              onClick={() => navigateToSection('compare')}
              className="text-left text-foreground/80 hover:text-cardwise-teal-500 transition-colors py-2"
            >
              Compare Cards
            </button>
            <Link 
              to="/learning-center" 
              className="text-foreground/80 hover:text-cardwise-teal-500 transition-colors py-2"
              onClick={toggleMenu}
            >
              Learning Center
            </Link>
            <button 
              onClick={() => navigateToSection('profile')}
              className="text-left text-foreground/80 hover:text-cardwise-teal-500 transition-colors py-2"
            >
              Create Profile
            </button>
            <Button className="bg-cardwise-teal-500 hover:bg-cardwise-teal-600 w-full" asChild>
              <Link to="/" onClick={toggleMenu}>Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
