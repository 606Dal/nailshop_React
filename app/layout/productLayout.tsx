import { Link, Outlet } from "react-router";
import { useState } from "react";

export default function ProductLayout() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Navigation Bar */}
            <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Left: Logo */}
                    <Link to="/" className="text-2xl font-extrabold text-gray-800 tracking-tight">
                        Nail Shop
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-gray-700 hover:text-pink-500 font-medium"
                            >
                                Product ▾
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute mt-2 bg-white border rounded-md shadow-lg z-50">
                                    <Link
                                        to="/products/list"
                                        className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Nail
                                    </Link>
                                    <Link
                                        to="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Pedi
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link to="/products/add" className="text-gray-700 hover:text-pink-500 font-medium">➕ Add</Link>
                        <Link to="/login" className="text-gray-700 hover:text-pink-500 font-medium">🔐 Login</Link>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? "❌" : "☰"}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t shadow px-6 py-4 space-y-3">
                        <Link to="/products/list/nail" className="block text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Nail</Link>
                        <Link to="/products/list/pedi" className="block text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Pedi</Link>
                        <Link to="/products/add" className="block text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>➕ Add</Link>
                        <Link to="/login" className="block text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>🔐 Login</Link>
                    </div>
                )}
            </header>

            {/* Content */}
            <main className="flex-grow pt-24 max-w-7xl mx-auto px-6">
                <Outlet />
            </main>
        </div>
    );
}
