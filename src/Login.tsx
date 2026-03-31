import { motion } from 'motion/react';
import Logo from './components/Logo';
import LoginForm from './components/LoginForm';
import PromoSection from './components/PromoSection';

export default function Login() {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-orange-50 to-indigo-50 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl h-full max-h-[800px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
        id="login-card"
      >
        {/* Left Side - Login Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="mb-8">
              <Logo />
              <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Welcome!</h1>
              <p className="text-slate-500 text-lg">Enter your username and password.</p>
            </div>

            <LoginForm />
          </div>

          {/* Decorative circle at bottom left */}
          <div className="pt-6 hidden md:block">
            <div className="w-12 h-12 bg-slate-100 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Right Side - Promo Section */}
        <PromoSection />
      </motion.div>
    </div>
  );
}
