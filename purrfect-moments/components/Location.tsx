import React from 'react';
import mapImage from '../assets/map_preview.png';

const Location: React.FC = () => {
    return (
        <section className="px-6 md:px-12 py-12">
            <div className="bg-white dark:bg-paper-dark rounded-[2rem] p-8 md:p-12 shadow-hard border-2 border-gray-100 dark:border-gray-800 relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Info */}
                    <div className="flex flex-col gap-8 z-10">

                        {/* Tag */}
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light text-indigo-900 text-xs font-bold tracking-wider uppercase">
                                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                                Come say hi
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
                            <span className="text-primary block">Visit Our</span>
                            <span className="text-gray-900 dark:text-white">Pamper Palace</span>
                        </h2>

                        {/* Details List */}
                        <div className="flex flex-col gap-8 mt-2">

                            {/* Address */}
                            <div className="flex gap-4">
                                <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-primary">
                                    <span className="material-symbols-outlined">storefront</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">The Studio</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        123 Fluffy Lane, Suite 100<br />
                                        Pawtown, PT 90210
                                    </p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex gap-4">
                                <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-primary">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <div className="w-full max-w-xs">
                                    <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                                    <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-1 text-gray-600 dark:text-gray-400">
                                        <span>Mon - Fri</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-200">8am - 7pm</span>
                                        <span>Saturday</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-200">9am - 6pm</span>
                                        <span>Sunday</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-200">10am - 4pm</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="flex gap-4">
                                <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-primary">
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Get in Touch</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-1">hello@purrfectmoments.com</p>
                                    <p className="text-primary font-bold text-xl">555-0199</p>
                                </div>
                            </div>

                        </div>

                        {/* CTA Button */}
                        <div className="mt-4">
                            <button className="bg-primary hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-hard-primary hover:translate-y-[-2px] hover:shadow-lg transition-all flex items-center gap-2">
                                Get Directions
                                <span className="material-symbols-outlined">arrow_outward</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Map */}
                    <div className="relative h-full min-h-[400px] w-full bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-100 dark:border-gray-700">

                        {/* Map Image */}
                        <img src={mapImage} alt="Map View" className="absolute inset-0 w-full h-full object-cover" />

                        {/* Map Popup Overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140%] bg-white p-4 rounded-lg shadow-xl w-64 text-sm animate-bounce px-4 py-3" style={{ animationDuration: '3s' }}>
                            <h4 className="font-bold text-gray-900 text-base mb-1">The Studio</h4>
                            <p className="text-gray-500 mb-2 leading-snug">123 Fluffy Lane, Suite 100</p>
                            <div className="flex items-center gap-1 mb-2">
                                <span className="text-orange-400 font-bold">4.9</span>
                                <div className="flex text-orange-400 text-xs">
                                    <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                </div>
                                <span className="text-gray-400 ml-1">(128)</span>
                            </div>
                            <a href="#" className="text-blue-500 hover:underline text-xs">View larger map</a>

                            {/* Pointer triangle */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 size-4 bg-white rotate-45 shadow-sm"></div>
                        </div>

                        {/* Parking Badge */}
                        <div className="absolute bottom-6 left-6 bg-white size-20 rounded-full border-2 border-primary shadow-lg flex flex-col items-center justify-center rotate-[-10deg] animate-pulse z-10">
                            <span className="text-primary font-black text-2xl leading-none">15</span>
                            <span className="text-[0.6rem] font-bold tracking-tight leading-none text-center">MIN<br />PARKING</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Location;
