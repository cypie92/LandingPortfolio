import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-surface-dark border-t border-border-dark mt-auto">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Newsletter */}
                    <div className="lg:col-span-5 bg-background-dark p-8 rounded-lg border border-border-dark">
                        <h3 className="text-2xl font-bold text-white font-display mb-2">Join the Workshop</h3>
                        <p className="text-text-secondary mb-6">
                            Get exclusive deals, new arrival alerts, and DIY tips delivered to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                className="flex-1 bg-surface-dark border border-border-dark text-white rounded-md px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <button
                                className="bg-primary hover:bg-[#c9451e] text-white font-bold px-6 py-3 rounded-md transition-colors whitespace-nowrap"
                                type="button"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                    {/* Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold mb-6 font-display">Shop</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Power Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Hand Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Plumbing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Electrical
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Safety Gear
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold mb-6 font-display">Support</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Order Status
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Warranty
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold mb-6 font-display">Contact</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <span>
                                    123 Industrial Ave,
                                    <br />
                                    Builder City, NY 10012
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">call</span>
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <span>support@hardwarepro.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="size-8 flex items-center justify-center bg-surface-dark border border-border-dark rounded text-white">
                            <span className="material-symbols-outlined text-xl">construction</span>
                        </div>
                        <span className="text-white font-bold font-display">HardwarePro</span>
                    </div>
                    <p className="text-text-secondary text-sm">© 2024 HardwarePro. All rights reserved.</p>
                    <div className="flex gap-4">
                        {/* Social Placeholders */}
                        <Link href="#" className="text-text-secondary hover:text-white transition-colors">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                            </svg>
                        </Link>
                        <Link href="#" className="text-text-secondary hover:text-white transition-colors">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </Link>
                        <Link href="#" className="text-text-secondary hover:text-white transition-colors">
                            <span className="sr-only">Instagram</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    clipRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.409-.06 3.809-.06h.63zm1.673 5.334c-3.254 0-5.893 2.638-5.893 5.893 0 3.254 2.639 5.893 5.893 5.893 3.254 0 5.893-2.639 5.893-5.893 0-3.254-2.639-5.893-5.893-5.893zm0 7.493a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
