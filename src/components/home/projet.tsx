import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from 'lucide-react';

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  // Données des projets (remplacez par vos vrais projets)
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Une plateforme e-commerce moderne avec React et Node.js, intégrant Stripe pour les paiements et une interface admin complète.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      color: "from-blue-500 to-purple-600",
      year: "2024",
      mockup: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop"
    },
    {
      id: 2,
      title: "AI Dashboard",
      category: "Data Science",
      description: "Tableau de bord intelligent utilisant l'IA pour analyser les données business en temps réel avec des visualisations interactives.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      technologies: ["Python", "TensorFlow", "React", "D3.js"],
      color: "from-green-500 to-teal-600",
      year: "2024",
      mockup: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "Mobile Development", 
      description: "Application bancaire mobile sécurisée avec authentification biométrique et gestion des transactions en temps réel.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
      technologies: ["React Native", "TypeScript", "Firebase"],
      color: "from-orange-500 to-red-600",
      year: "2023",
      mockup: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop"
    },
    {
      id: 4,
      title: "SaaS Analytics Platform",
      category: "Full Stack",
      description: "Plateforme SaaS d'analytics avancée avec API REST, authentification JWT et tableaux de bord personnalisables.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      technologies: ["Vue.js", "Laravel", "PostgreSQL", "Redis"],
      color: "from-pink-500 to-rose-600",
      year: "2023",
      mockup: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
    },
    {
      id: 5,
      title: "IoT Monitoring System",
      category: "IoT & Hardware",
      description: "Système de monitoring IoT pour smart cities avec capteurs connectés et interface de contrôle centralisée.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop",
      technologies: ["Arduino", "Raspberry Pi", "MQTT", "Angular"],
      color: "from-indigo-500 to-blue-600",
      year: "2024",
      mockup: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, projects.length]);

  const nextProject = () => {
    setDirection(1);
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setDirection(index > currentProject ? 1 : -1);
    setCurrentProject(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const project = projects[currentProject];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Nos Réalisations
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez le design et l'interface de nos projets
          </p>
        </motion.div>

        {/* Main Project Display */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentProject}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
              }}
              className="relative"
            >
              {/* Project Design Preview - Full Width */}
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {/* Main Design Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-8">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5`}
                    animate={{ 
                      opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Browser/Device Frame */}
                  <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 mx-4 h-6 bg-white rounded-md flex items-center px-3">
                        <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
                        <div className="h-2 bg-gray-200 rounded flex-1"></div>
                      </div>
                    </div>
                    
                    {/* Website/App Design */}
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>

                  {/* Floating Project Info */}
                  <motion.div
                    className="absolute top-12 left-12 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-sm"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.span 
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${project.color} mb-3`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{project.year}</span>
                      <motion.button
                        onClick={() => setShowDetails(!showDetails)}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
                      >
                        Voir plus
                        <ArrowUpRight size={16} />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Year Badge */}
                  <motion.div
                    className="absolute top-12 right-12 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {project.year}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-12">
            {/* Previous Button */}
            <motion.button
              onClick={prevProject}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <ChevronLeft size={24} className="text-gray-700 group-hover:text-black transition-colors" />
            </motion.button>

            {/* Project Indicators */}
            <div className="flex gap-3">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToProject(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentProject 
                      ? `bg-gradient-to-r ${projects[index].color} shadow-lg` 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextProject}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <ChevronRight size={24} className="text-gray-700 group-hover:text-black transition-colors" />
            </motion.button>

            {/* Auto-play Toggle */}
            <motion.button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all ml-4 ${
                isAutoPlay 
                  ? 'bg-green-500 text-white shadow-green-200' 
                  : 'bg-white/90 backdrop-blur-sm text-gray-700'
              }`}
            >
              {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto mt-8 bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${project.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentProject + 1) / projects.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Quick Navigation Thumbnails */}
        <motion.div 
          className="flex justify-center gap-4 max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {projects.map((proj, index) => (
            <motion.div
              key={proj.id}
              onClick={() => goToProject(index)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-all relative ${
                index === currentProject 
                  ? 'ring-4 ring-blue-500 shadow-xl shadow-blue-200' 
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="w-24 h-16 relative">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${proj.color} opacity-20`} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-2">
                <h4 className="text-xs font-bold text-gray-800 truncate">
                  {proj.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Details Modal/Overlay */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${project.color}`}>
                    {project.category}
                  </span>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Technologies utilisées :</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="flex-1 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Voir le projet
                </button>
                <button className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors">
                  Code source
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;