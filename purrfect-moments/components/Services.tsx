import React from 'react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  return (
    <section className="px-6 md:px-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b-2 border-lavender/20 pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 relative inline-block">
            The Spa Menu
            <span className="absolute -top-6 -right-8 text-6xl text-lavender/30 select-none rotate-12">*</span>
          </h2>
          <p className="text-lg max-w-xl">Curated grooming experiences designed for relaxation and style.</p>
        </div>
        <div className="pb-2">
          <span className="text-sm font-bold uppercase tracking-widest text-lavender">Est. 2024</span>
        </div>
      </div>

      {/* Staggered Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative min-h-[500px]">
        {/* Decorative line */}
        <div className="hidden md:block absolute top-20 left-0 w-full h-[2px] border-t-2 border-dashed border-primary/20 -z-10 rotate-1"></div>

        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-paper-dark p-4 pb-8 rounded-xl shadow-hard hover:shadow-hard-hover border-2 border-black/5 dark:border-white/10 -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 md:mt-0 flex flex-col group"
        >
          <div className="aspect-square w-full rounded-lg overflow-hidden mb-6 border-2 border-black/5 relative">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJEYik6x220OVoLkPKPpKEBRElcpX5cA24dms9ckRtGAjyiTCPgf1Xo8wr-J5v4TOZnjQOSy2G2BNZLbF5i4gVBzqRaQ6ESmJjszOT85gAv6Wwhf_6D50HeperglTAq9J_gxjUlJlFkZQjJmilKL9rUTelGlciyTrTXmqDIiJInXb837arieSFvoq9dJ75kz8FWTUKVsMc7eLiA3FqbxOAgG6M627k1-KUR0wjjI20s3hEsCW92bbW1_GLrJcnekvQiNmh2wABbg")' }} data-alt="Dog getting a bath with bubbles"></div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold">Bath & Fluff</h3>
            <span className="bg-lavender-light text-lavender-dark text-xs font-bold px-2 py-1 rounded">Starts $40</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Refreshing wash with premium organic shampoos, blow dry, and a thorough brush out.</p>
        </motion.div>

        {/* Card 2 (Offset down) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-paper-dark p-4 pb-8 rounded-xl shadow-hard hover:shadow-hard-hover border-2 border-black/5 dark:border-white/10 rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 md:mt-12 flex flex-col relative z-10 group"
        >
          <div className="absolute -top-4 -right-4 bg-primary text-white size-12 rounded-full flex items-center justify-center font-bold text-xs rotate-12 shadow-md z-20">HOT</div>
          <div className="aspect-square w-full rounded-lg overflow-hidden mb-6 border-2 border-black/5 relative">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJKZdUL9g0or5e344aX3x-QuMLafJ4RW7aUPPNnwYiIz66DJBK25oyraxPbAKMjTFSQaA5KpHAsu-fewHimLm_AoQeAVqZlOYuxL7hsi6V5MPLW5V7fShJQpuu7VrnPxjSvcgi38-ehOHz6bfTvCvVqRv2wTiOdhIg0Ok0HuaCExfpuRPZgm-QyI7wteoxdA8sR7JFTC7tDr3vuLNt3s_AHNFnof3Fn5RvrWawcVE29N78ro_Guo_EOsuj-5r2HhVzx6HZy8-7Gw")' }} data-alt="Dog getting hair trimmed by professional"></div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold">The Full Groom</h3>
            <span className="bg-lavender-light text-lavender-dark text-xs font-bold px-2 py-1 rounded">Starts $85</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Complete styling, custom haircut, ear cleaning, and relaxing spa treatment.</p>
        </motion.div>

        {/* Card 3 (Offset further down) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-paper-dark p-4 pb-8 rounded-xl shadow-hard hover:shadow-hard-hover border-2 border-black/5 dark:border-white/10 -rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 md:mt-24 flex flex-col group"
        >
          <div className="aspect-square w-full rounded-lg overflow-hidden mb-6 border-2 border-black/5 relative">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_Dyzhbi6-g40eQsfLBOASL1hdtoggFcNYh78q1HAQSBUAsnUUD5M538rceOK7EpjsAALRvnHBg6kMkdTHHkicDgTKw-JjZgA5E5_W7TZ9NJdic_g9w5UNxdMKWjqKpapdsraS4xLSE4GjSZuxl-Llvm-EESAQ7weziblGwXjYY93-fzgMAIhHQiWu5XnSh8v3IfBGNUSE3bfz5Sb99IZP57DHgHjULoUP014GIGmb4sAcjAgZslPMu15Ng7OCu4goR9xantcLMw")' }} data-alt="Close up of dog paw getting nails trimmed"></div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold">Pawdicure</h3>
            <span className="bg-lavender-light text-lavender-dark text-xs font-bold px-2 py-1 rounded">Starts $25</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Nail trimming, filing, shaping, and a moisturizing paw balm application.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;