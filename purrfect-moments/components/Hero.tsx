import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  // Typewriter variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section ref={ref} className="relative px-6 md:px-12 pt-10 md:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Text */}
        <div className="lg:col-span-5 flex flex-col gap-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-lavender-light dark:bg-lavender/20 text-lavender-dark px-3 py-1 rounded-full w-fit border border-lavender/30 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">stars</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6b4c85] dark:text-[#dcd1eb]">Premium Pet Spa</span>
          </motion.div>
          
          <motion.h1 
            variants={sentence}
            initial="hidden"
            animate="visible"
            style={{ y, opacity: textOpacity }}
            className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-[#1a120f]"
          >
            {"Pampering".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))} 
            <br />
            <span className="italic text-primary relative inline-block">
              <span className="relative z-10">
                {"Your Pet".split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-lavender -z-10" preserveAspectRatio="none" viewBox="0 0 100 10">
                <motion.path 
                  d="M0 5 Q 50 10 100 5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                ></motion.path>
              </svg>
            </span>
            <br /> 
            {"Deserves.".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md font-medium leading-relaxed"
          >
            Experience the ultimate spa moments for your furry companion. Where style meets snuggles in a curated environment.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, type: "spring", stiffness: 100 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-hard-primary hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all border-2 border-primary -rotate-1 active:scale-95">
              Book Appointment
            </button>
            <button className="bg-white/50 backdrop-blur-sm border-2 border-lavender text-lavender hover:bg-lavender hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all rotate-1 active:scale-95 shadow-sm">
              View Menu
            </button>
          </motion.div>
        </div>

        {/* Hero Collage */}
        <div className="lg:col-span-7 relative min-h-[500px] lg:h-[600px] w-full flex justify-center items-center p-8">
          {/* Doodles/Vectors */}
          <svg className="absolute top-10 left-10 w-24 h-24 text-primary animate-pulse" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L55 35L90 40L60 60L70 95L40 70L10 85L25 55L0 30L35 25L50 0Z" fill="currentColor" opacity="0.2"></path>
          </svg>

          {/* Image 1: Large Tilted */}
          <motion.div 
            initial={{ opacity: 0, rotate: 15, x: 100 }}
            animate={{ opacity: 1, rotate: 3, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            className="absolute top-10 right-10 lg:right-20 w-64 md:w-80 aspect-[4/5] bg-white dark:bg-paper-dark p-3 shadow-hard rotate-3 z-10 hover:rotate-0 transition-transform duration-500 hover:z-30 group/img1"
          >
            <div className="w-full h-full bg-cover bg-center rounded-sm grayscale group-hover/img1:grayscale-0 transition-all duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCRJYochrhCSc_52fdvMvGT_ECtqgxhdymYUYnL72B4CTG27VyHZvBJ_j6ubS4x6qJs3VsalvQatQ96co_alRdFLnwl_sEx0WLxvVionMOq8p9DJqhlT_k0AB62w1xfgd2mvUkj9y1ObpA7MeXgABNnhUNsJzN-UONMbGWSXrtes4EpLXreO4zNmcmiEwBDrsulkYyYp-_LURrNcMXnC317YvF0uKIxP_w8NGlVnjZfbrJvDJM8vpnpZHPejlae5p0kF6GAb6TXdQ")' }} data-alt="Close up of a fluffy golden retriever smiling after grooming"></div>
            <div className="text-center pt-2 font-handwriting text-gray-500 text-sm italic">So fresh!</div>
          </motion.div>

          {/* Image 2: Circle Overlapping */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6, type: "spring", bounce: 0.5 }}
            className="absolute bottom-20 left-10 lg:left-20 w-48 md:w-64 aspect-square rounded-full border-8 border-white dark:border-paper-dark shadow-xl -rotate-6 z-20 overflow-hidden hover:scale-110 transition-transform duration-500"
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCo8Oh_g9ALKlaAg-wPMsrynYOUHDL2WtfRmkoca1269ZqdUYtsgaBtBMXf11n87nOw0f2ifW7t_3BJNGIoL5vGt_qtv46domznZWUSddXhpHJ80s6MWGI86PupNPhxVTc70GXf0Jcz6qtmZzckTBOCfXRokRyrNC8vhPnV8JK1T1A4gSatcMb85s61gVgZJ5k26UDglTShap4JiromEfiqRtmdF_XYZ0DZw0yuv0P9k4BI3WBsUhzf9yNz1pkDxAjQO5PCiJYXOA")' }} data-alt="A cat looking relaxed with eyes closed getting a head massage"></div>
          </motion.div>

          {/* Image 3: Small Polaroid */}
          <motion.div 
            initial={{ opacity: 0, rotate: -20, y: 100 }}
            animate={{ opacity: 1, rotate: -12, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
            className="absolute top-40 left-0 lg:left-10 w-40 aspect-square bg-white dark:bg-paper-dark p-2 shadow-hard -rotate-12 z-0 hover:z-30 hover:rotate-0 transition-all duration-300"
          >
            <div className="w-full h-[85%] bg-cover bg-center bg-gray-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvBfWaRcYmcblJ4FGZXpE4RHilwPbOOu2ZlVLDZUJxsaFjSsmum9Tp5VALQivIOQyOPNkKN7-fMxCKbiTzQFnpOEFfSokdrWHNCW-8xYPPUqXdzuWiSnpnoG0yxrPyyNyF6BjhSlM0MnSV9fmSKbrEgX7ghPLY6jPQqrUQQ_YiU553lzWoOYYYxDCNPWSwAkFHynQZZQkxmyWmatj95MJLB-DKCGIgAATEEdTikLH_VQQvDZlTO8PHs8cQDgsYVc9GWt854oP9yg")' }} data-alt="Small dog with a cute bow tie"></div>
            <div className="text-center pt-1 text-xs font-bold text-primary">#Purrfect</div>
          </motion.div>

          {/* Sticker Graphic */}
          <motion.div 
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            className="absolute bottom-10 right-20 lg:right-40 size-24 bg-primary rounded-full flex items-center justify-center text-white font-black text-center text-xs rotate-12 shadow-lg z-30 animate-bounce-slow"
          >
            OPEN<br />7 DAYS<br />A WEEK
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;