
// components/Navbar.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems: MenuItem[] = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-center w-full py-6 px-4 fixed top-0 z-50">
        <motion.div
          className="flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200/50 backdrop-blur-sm w-full max-w-3xl"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center">
            <motion.div
              className="w-8 h-8 mr-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1, rotate: 360 }}
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Image
                src="/1.png"
                alt="Sorci Digit Logo"
                width={32}
                height={32}
                className="relative z-10"
                priority
              />
            </motion.div>
          </div>

          <nav className="flex items-center space-x-8">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  textShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Link
                  href={item.href}
                  className="text-sm text-black hover:text-gray-700 transition-all duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 font-medium shadow-lg"
            >
              Appellez nous
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between w-full px-4 py-4 fixed top-0 z-50">
        <motion.div
          className="w-8 h-8 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1, rotate: 360 }}
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Image
            src="/1.png"
            alt="Sorci Digit Logo"
            width={32}
            height={32}
            className="relative z-10"
            priority
          />
        </motion.div>

        <motion.button
          className="p-2 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 relative overflow-hidden group"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <span className="h-6 w-6 text-black relative z-10" > 
            Menu </span>
        </motion.button>
      </div>

      {/* Mobile Menu Full-Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl z-0"></div>

            <div className="relative w-full h-full flex flex-col justify-center items-center">
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 z-20 group"
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, rotate: 180 }}
                aria-label="Close menu"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                <span className="h-6 w-6 text-black relative z-10">
                  Fermer </span>
              </motion.button>

              {/* Menu Content */}
              <motion.div
                className="flex flex-col items-center justify-center h-full space-y-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: i * 0.1 + 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    exit={{ opacity: 0, x: -20, scale: 0.8 }}
                    whileHover={{
                      scale: 1.1,
                      x: 10,
                      textShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block py-4 px-6 text-2xl text-black hover:text-gray-700 hover:bg-gray-50/50 rounded-2xl transition-all duration-300 font-medium relative group"
                      onClick={toggleMenu}
                    >
                      <span className="absolute left-0 top-1/2 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full transform -translate-y-1/2"></span>
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.8,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-10 py-5 text-lg text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 font-semibold shadow-lg relative overflow-hidden group"
                    onClick={toggleMenu}
                  >
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Invoquez votre succès</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { Navbar };
