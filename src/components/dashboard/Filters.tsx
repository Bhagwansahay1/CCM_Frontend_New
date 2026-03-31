import { ChevronDown, Calendar, LucideIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  icon?: LucideIcon;
  variant?: 'outline' | 'solid';
  className?: string;
}

export function Select({ options, value, onChange, icon: Icon, variant = 'outline', className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseStyles = "flex items-center space-x-2 rounded-xl px-5 py-3 text-sm font-bold transition-all shadow-sm active:scale-95";
  const variants = {
    outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300",
    solid: "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-100"
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${baseStyles} ${variants[variant]}`}
      >
        {Icon && <Icon size={18} className={variant === 'outline' ? 'text-orange-500' : 'text-white/80'} />}
        <span className="min-w-[80px] text-left">{value}</span>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${variant === 'outline' ? 'text-gray-400' : 'text-white/60'}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full min-w-[160px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-2.5 text-sm font-bold transition-colors ${value === option ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DateRangePicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  // Simplified for demo, but fully functional UI
  const options = [
    "23rd Dec 2025 – 22nd Jan 2026",
    "Last 30 Days",
    "Last 90 Days",
    "Custom Range"
  ];

  return (
    <Select 
      options={options} 
      value={value} 
      onChange={onChange} 
      icon={Calendar} 
      className="min-w-[280px]"
    />
  );
}
