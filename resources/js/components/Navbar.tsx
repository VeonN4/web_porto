import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onContactClick: () => void;
  onTerminalClick: () => void;
}

export default function Navbar({ activeSection, setActiveSection, onContactClick, onTerminalClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'OVERVIEW', id: 'hero' },
    { label: 'ABOUT', id: 'about' },
    { label: 'EXP', id: 'exp' },
    { label: 'STACK', id: 'stack' },
    { label: 'PROJECTS', id: 'projects' }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-background border-b border-outline-variant sticky top-0 z-50 transition-colors duration-200">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-7xl mx-auto">
        <button
          onClick={() => handleNavClick('hero')}
          className="font-headline-md text-xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity"
          id="nav-logo"
        >
            Veonise
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-semibold text-xs tracking-wider">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`nav-${item.id}`}
                className={`transition-all duration-200 uppercase pb-1 border-b ${
                  isActive
                    ? 'text-white border-white font-bold'
                    : 'text-on-surface-variant border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={onTerminalClick}
            className="border border-outline-variant px-4 py-2 text-on-surface-variant hover:text-white hover:border-white text-xs uppercase tracking-wider transition-colors duration-200"
            id="nav-terminal-btn"
          >
            TERMINAL
          </button>
          <button
            onClick={onContactClick}
            className="brutalist-btn text-xs px-4 py-2 uppercase tracking-wider font-semibold"
            id="nav-contact-btn"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden gap-3 items-center">
          <button
            onClick={onTerminalClick}
            className="border border-outline-variant px-3 py-1.5 text-on-surface-variant hover:text-white text-xs uppercase tracking-wider"
            id="mobile-nav-terminal"
          >
            [ &gt;_ ]
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-1 hover:text-on-surface-variant focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-outline-variant bg-background px-4 py-6 flex flex-col gap-4 animate-fadeIn" id="mobile-menu-drawer">
          <div className="flex flex-col gap-4 font-semibold text-sm tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`mobile-nav-${item.id}`}
                  className={`text-left uppercase py-2 border-l-2 pl-4 ${
                    isActive
                      ? 'text-white border-white font-bold bg-white/5'
                      : 'text-on-surface-variant border-transparent hover:text-white hover:border-white/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-outline-variant">
            <button
              onClick={() => {
                setIsOpen(false);
                onTerminalClick();
              }}
              className="border border-outline-variant px-4 py-2.5 text-center text-xs uppercase tracking-wider text-white"
            >
              Terminal
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onContactClick();
              }}
              className="brutalist-btn text-center text-xs py-2.5 uppercase tracking-wider font-semibold"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
