import { useState } from 'react';
import { Menu, X, ArrowRight, Monitor, Palette, BarChart3, ChevronRight } from 'lucide-react';
import HeroGeometric from './home';

export default function AgencyWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      title: "Digital Experience",
      icon: <Monitor className="w-6 h-6" />,
      description: "Creating seamless digital experiences that engage and convert."
    },
    {
      title: "Brand Design",
      icon: <Palette className="w-6 h-6" />,
      description: "Crafting memorable brand identities that leave lasting impressions."
    },
    {
      title: "Marketing Strategy",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "Developing data-driven strategies for measurable growth."
    }
  ];

  return (
    <div className=" bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-semibold">Agency</span>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-black">Home</a>
              <a href="#services" className="text-gray-600 hover:text-black">Services</a>
              <a href="#work" className="text-gray-600 hover:text-black">Work</a>
              <a href="#contact" className="text-gray-600 hover:text-black">Contact</a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b">
              <a href="#home" className="block px-3 py-2 text-gray-600">Home</a>
              <a href="#services" className="block px-3 py-2 text-gray-600">Services</a>
              <a href="#work" className="block px-3 py-2 text-gray-600">Work</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <HeroGeometric/>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="mb-4 text-black">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href="#contact" className="inline-flex items-center text-black hover:opacity-70">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Featured Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Project Title</h3>
                    <p className="text-sm opacity-90">Branding & Digital Design</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-gray-400 mb-8">
              Let's create something extraordinary together. Get in touch to discuss your next project.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-gray-500 text-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-gray-500 text-white"
              />
              <textarea
                placeholder="Tell us about your project"
                rows={4}
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-gray-500 text-white"
              />
              <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}