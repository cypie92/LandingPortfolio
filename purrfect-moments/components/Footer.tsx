import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-full flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">pets</span>
            </div>
            <h2 className="text-lg font-black tracking-tight">Purrfect Moments</h2>
          </div>
          <p className="text-sm text-gray-500">
            Making tails wag and purrs rumble since 2024.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h5 className="font-bold text-lg mb-2">Explore</h5>
          <a className="hover:text-primary transition-colors" href="#">Services Menu</a>
          <a className="hover:text-primary transition-colors" href="#">Lookbook</a>
          <a className="hover:text-primary transition-colors" href="#">Our Team</a>
          <a className="hover:text-primary transition-colors" href="#">FAQ</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h5 className="font-bold text-lg mb-2">Visit Us</h5>
          <p className="text-gray-600 dark:text-gray-400">123 Fluffy Lane,<br />Pawtown, PT 90210</p>
          <a className="font-bold mt-2 hover:text-primary" href="tel:+1234567890">555-0199</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-lg">Stay in the loop</h5>
          <div className="relative">
            <input 
              className="w-full bg-white dark:bg-paper-dark border-2 border-primary/20 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors" 
              placeholder="email@example.com" 
              type="email"
            />
            <button className="absolute right-2 top-2 bg-primary text-white p-1 rounded hover:bg-primary/90">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-400">
        <p>© 2024 Purrfect Moments. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a className="hover:text-primary" href="#">Instagram</a>
          <a className="hover:text-primary" href="#">TikTok</a>
          <a className="hover:text-primary" href="#">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;