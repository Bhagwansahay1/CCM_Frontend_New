import { useState, useEffect } from 'react';
import { Image as ImageIcon, Shield, TrendingUp, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    id: 1,
    title: "Secure Banking,\nBetter Future",
    description: "Experience world-class digital banking services",
    icon: <Shield className="w-full h-full" />,
    image: "https://picsum.photos/seed/banking-secure/1200/800"
  },
  {
    id: 2,
    title: "Manage Your\nWealth Smarter",
    description: "Smart tools to help you grow and protect your assets",
    icon: <TrendingUp className="w-full h-full" />,
    image: "https://picsum.photos/seed/wealth-management/1200/800"
  },
  {
    id: 3,
    title: "24/7 Dedicated\nSupport",
    description: "Our expert team is always here to help you succeed",
    icon: <Headphones className="w-full h-full" />,
    image: "https://picsum.photos/seed/customer-support/1200/800"
  }
];

export default function PromoSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
      {/* Background Images with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt="" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Abstract background shapes (kept for extra texture) */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl z-[1]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl z-[1]"></div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 text-white/60"
          >
            {slides[currentSlide].icon}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <h2 className="text-4xl font-bold text-white leading-tight drop-shadow-lg whitespace-pre-line">
                {slides[currentSlide].title}
              </h2>
              <p className="text-white/90 text-lg font-medium drop-shadow-md">
                {slides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Indicators */}
        <div className="flex space-x-2 pt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-12 bg-white shadow-lg' : 'w-6 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
