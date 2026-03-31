import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "w-full font-bold py-3.5 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center space-x-2";
  
  const variants = {
    primary: "bg-[#F25C05] hover:bg-[#D94E04] text-white shadow-orange-200",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-slate-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
