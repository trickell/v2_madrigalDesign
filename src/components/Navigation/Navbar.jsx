import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PushableButton from '../UI/PushableButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Creations / Projects', target: 'portfolio' },
    { name: 'About Me', target: 'about' },
    { name: 'Get In Contact', target: 'contact' },
  ];

  return (
    <>
      <nav className="navbar-container">
        <div className="container nav-content">
          {/* Brand - Desktop Only */}
          <a
            href="#"
            className="nav-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Madrigal.Design
          </a>

          {/* Nav Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-item"
              >
                <PushableButton
                  onClick={() => scrollToSection(link.target)}
                  frontStyle={{ fontSize: '0.9rem', padding: '8px 16px' }}
                >
                  {link.name}
                </PushableButton>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      <style>{`
        /* Desktop Defaults (Top Nav) */
        .navbar-container {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          // background: rgba(17, 57, 74, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-blue-mid);
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          padding: 15px;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .nav-brand {
          font-family: var(--font-caviar-bold);
          font-size: 1.5rem;
          color: var(--color-cyan);
          text-shadow: 2px 2px 4px black;
        }
        .nav-links {
          display: flex;
          gap: 15px;
        }
        .nav-btn {
          background: var(--color-blue-mid);
          border: 2px solid var(--color-cyan);
          border-radius: 4px;
          padding: 8px 16px;
          color: #081c25;
          font-family: var(--font-caviar-bold);
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          outline: none;
        }

        /* Mobile Styles (Bottom Nav) */
        @media (max-width: 768px) {
          .navbar-container {
            top: auto;
            bottom: 0;
            border-bottom: none;
            border-top: 1px solid var(--color-blue-mid);
            box-shadow: 0 -4px 6px rgba(0,0,0,0.3); /* Adjust shadow for bottom */
            padding-bottom: env(safe-area-inset-bottom); /* iOS safe area */
          }
          .nav-content {
            flex-direction: column; /* Stack brand and links */
            padding: 10px 5px;
            width: 100%;
          }
          .nav-brand {
            display: none; /* Hide brand on bottom nav to save space */
          }
          .nav-links {
            width: 100%;
            justify-content: space-around;
            gap: 5px;
          }
          .nav-btn {
            font-size: 0.9rem;
            padding: 8px 10px;
            background: transparent;
            border: none;
            color: var(--color-cyan);
            text-shadow: 0 0 5px black;
          }
          /* Indicate active state or touch target */
          .nav-btn:active {
            color: #fff;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
