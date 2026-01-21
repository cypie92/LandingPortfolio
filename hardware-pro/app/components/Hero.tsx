"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative">
            <div className="max-w-[1400px] mx-auto p-4 md:p-8">
                <div className="relative rounded-xl overflow-hidden bg-surface-dark border border-border-dark shadow-2xl">
                    <div className="grid lg:grid-cols-2 min-h-[500px]">
                        {/* Content */}
                        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 z-10 relative bg-gradient-to-r from-background-dark to-transparent lg:bg-none">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center gap-2 text-primary font-bold tracking-wider text-xs uppercase mb-4"
                            >
                                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                                New Collection
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 font-display tracking-tight"
                            >
                                BUILT FOR THE <br />
                                <span className="text-primary">BOLD.</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-text-secondary text-lg mb-8 max-w-md font-body"
                            >
                                Professional grade tools for your next masterpiece. Engineered for durability, precision, and power.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button className="h-12 px-8 bg-primary hover:bg-[#c9451e] text-white font-bold rounded-md transition-colors flex items-center justify-center gap-2 group">
                                    Shop Power Tools
                                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </button>
                                <button className="h-12 px-8 bg-transparent border border-text-secondary text-white hover:border-white font-medium rounded-md transition-colors flex items-center justify-center">
                                    View Catalog
                                </button>
                            </motion.div>
                        </div>
                        {/* Image Background (Absolute for mobile overlap, column for desktop) */}
                        <div className="absolute inset-0 lg:relative lg:inset-auto h-full w-full overflow-hidden">
                            <div className="absolute inset-0 bg-black/60 lg:hidden z-0"></div> {/* Mobile overlay */}
                            <motion.div
                                style={{ y, opacity, backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE6-xZdZZaBqA5XFIuwJJGRMZOvQzaycEoOeA99oHVnTaQrozHVtZ_IJUgV3H2sGI-IGgAoqc2Pwav6TFbeIETCh3OSXPA0npqQQ4gbbyMTearxLJOijvQJ0sUOeX7afc0rkP6BVW1yPB3g80PHPZWHlBA89mce-MJyrjoCyG8pGaJgCgwXMupo3qSugCRe4HtY9DQNMyn4DE5bHTaLEXFG201bGvNPUKCAXJMUxRZGbDvG12PmWBEUU71izSwV2PZOv2pj9_vRuw')" }}
                                className="h-[120%] w-full bg-cover bg-center lg:bg-left origin-top"
                                data-alt="Close up of sparks flying from a metal grinder tool in a dark workshop"
                            ></motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
