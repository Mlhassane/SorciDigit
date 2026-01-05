// import { motion } from "framer-motion";

// export default function LandingPage() {
//   return (
//     <div className="bg-black text-white font-sans">
//       {/* Hero Section */}
//       <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-5xl md:text-6xl font-bold mb-4 text-white"
//         >
//           Développez votre business grâce au <span className="text-yellow-400">marketing qui convertit</span>
//         </motion.h1>
//         <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl">
//           Branding, contenu, publicité digitale et stratégie. Vous avez une mission, on la rend visible et rentable.
//         </p>
//         <div className="flex gap-4 flex-col sm:flex-row">
//           <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Planifiez un appel stratégique</Button>
//           <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
//             Télécharger le guide gratuit
//           </Button>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 px-6 bg-white text-black">
//         <h2 className="text-4xl font-bold text-center mb-12">Nos Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//           {[
//             { title: "Stratégie Digitale", desc: "Positionnement, tunnel de conversion, message de marque" },
//             { title: "Design & Branding", desc: "Identité visuelle, logos, charte graphique" },
//             { title: "Contenu & Réseaux Sociaux", desc: "Storytelling, vidéos, planning" },
//             { title: "Publicité Digitale", desc: "Meta Ads, Google Ads, ROAS optimisé" }
//           ].map((service, idx) => (
//             <motion.div
//               key={idx}
//               whileHover={{ scale: 1.05 }}
//               className="p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl"
//             >
//               <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
//               <p className="text-gray-600">{service.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 px-6 bg-gray-900 text-white">
//         <h2 className="text-4xl font-bold text-center mb-12">Ils nous ont fait confiance</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           <blockquote className="bg-gray-800 p-6 rounded-xl shadow-md">
//             <p className="italic">“Grâce à Sorci Digit, j’ai multiplié mes ventes par 3 en 2 mois.”</p>
//             <footer className="mt-4 text-yellow-400">— Aïcha, Natural Glow</footer>
//           </blockquote>
//           <blockquote className="bg-gray-800 p-6 rounded-xl shadow-md">
//             <p className="italic">“Leur branding a changé la perception de toute notre boîte.”</p>
//             <footer className="mt-4 text-yellow-400">— Moustapha, CEO SaharaTech</footer>
//           </blockquote>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 px-6 bg-yellow-400 text-black text-center">
//         <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre business ?</h2>
//         <p className="mb-6">Réservez votre appel stratégique maintenant ou téléchargez notre guide gratuit.</p>
//         <div className="flex gap-4 justify-center flex-col sm:flex-row">
//           <Button className="bg-black text-white hover:bg-gray-800">Réserver un appel</Button>
//           <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
//             Télécharger le guide
//           </Button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-10 px-6 bg-black text-center text-gray-400">
//         <p>Sorci Digit © {new Date().getFullYear()} — Tous droits réservés</p>
//         <p className="text-sm mt-2">📧 contact@sorcidigit.com | 📱 +227 XX XX XX XX</p>
//       </footer>
//     </div>
//   );
// }
