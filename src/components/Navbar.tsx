'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="z-50 h-16 bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/dashboard">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Finance APP</span>
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link href="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Dashboard
          </Link>
          <Link href="/new" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Nueva Inversión
          </Link>
          <Link href="/investments" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Inversiones
          </Link>
          <Link href="/settings" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Configuración
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} type="button" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white dark:bg-gray-800 shadow absolute top-16 left-0 w-full z-40">
          <Link href="/dashboard" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/new" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Nueva Inversión
          </Link>
          <Link href="/investments" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Inversiones
          </Link>
          <Link href="/settings" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Configuración
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
