"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { title: "Showcase", href: "#showcase" },
  { title: "Services", href: "#services" },
];

const socialLinks = [
  { icon: "/icons/youtube.svg", href: "#" },
  { icon: "/icons/whatsapp.svg", href: "#" },
  { icon: "/icons/instagram.svg", href: "#" },
];

function getDayAndTime() {
  const date = new Date();
  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const day = days[date.getDay()];
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  return { day, time: `${hour}:${min}` };
}

const Navbar = () => {
  const [{ day, time }, setDate] = useState(getDayAndTime());

  useEffect(() => {
    const interval = setInterval(() => setDate(getDayAndTime()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center pt-6">
      <nav
        className="flex items-center justify-between w-full max-w-2xl px-4 py-2
                   rounded-full bg-[#D9D9D9]/90 shadow-md
                   text-gray-700 text-sm font-medium
                   backdrop-blur-md"
      >
        {/* Social icons */}
        <div className="flex items-center gap-2">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
              <Image src={s.icon} alt="" width={22} height={22} className="opacity-70 hover:opacity-100 transition" />
            </a>
          ))}
        </div>

        {/* Center nav links */}
        <div className="hidden sm:flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-pink-500 transition">
              {link.title}
            </Link>
          ))}
        </div>

        {/* Day, time, flag */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">{day}</span>
          <span>{time}</span>
          <Image src="/icons/france.svg" alt="FR" width={20} height={20} className="rounded-full" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;