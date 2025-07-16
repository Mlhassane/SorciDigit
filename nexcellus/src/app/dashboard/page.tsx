"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("apercu");

  const stats = [
    { label: "Rendez-vous", value: "12", icon: "📅" },
    { label: "Consultations", value: "48", icon: "👨‍⚕️" },
    { label: "Ordonnances", value: "24", icon: "📝" },
    { label: "Messages", value: "8", icon: "✉️" },
  ];

  const appointments = [
    { doctor: "Dr. Martin", date: "26 Avril", time: "14:30", type: "Consultation" },
    { doctor: "Dr. Durant", date: "28 Avril", time: "10:00", type: "Suivi" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4"
          >
            <span className="text-teal-600 text-xl font-bold">HealthTech</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-700">Dashboard</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-gray-600">John Doe</span>
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold">JD</span>
            </div>
          </motion.div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Prochains rendez-vous</h2>
            <div className="space-y-4">
              {appointments.map((apt, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{apt.doctor}</p>
                    <p className="text-gray-500 text-sm">{apt.date} - {apt.time}</p>
                  </div>
                  <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm">
                    {apt.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Documents récents</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800">Ordonnance</p>
                <p className="text-gray-500 text-sm">23 Avril 2025</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800">Analyse sang</p>
                <p className="text-gray-500 text-sm">20 Avril 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}