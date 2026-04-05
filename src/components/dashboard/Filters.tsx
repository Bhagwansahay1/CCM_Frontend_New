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
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const presets = [
    "23rd Dec 2025 – 22nd Jan 2026",
    "Last 30 Days",
    "Last 90 Days",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCustom(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplyCustom = () => {
    if (fromDate && toDate) {
      onChange(`${fromDate} to ${toDate}`);
      setIsOpen(false);
      setIsCustom(false);
    }
  };

  return (
    <div className="relative min-w-[280px]" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center space-x-3 rounded-xl px-5 py-3 text-sm font-bold transition-all shadow-sm active:scale-95 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300"
      >
        <Calendar size={18} className="text-orange-500" />
        <span className="flex-1 text-left truncate">{value}</span>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-gray-400`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full min-w-[300px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {!isCustom ? (
            <>
              {presets.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors rounded-xl ${value === option ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {option}
                </button>
              ))}
              <button
                onClick={() => setIsCustom(true)}
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors rounded-xl border-t border-gray-50 mt-1"
              >
                Custom Range
              </button>
            </>
          ) : (
            <div className="p-3 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Custom Range</span>
                <button 
                  onClick={() => setIsCustom(false)}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  Back
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">From</label>
                  <input 
                    type="date" 
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">To</label>
                  <input 
                    type="date" 
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleApplyCustom}
                disabled={!fromDate || !toDate}
                className="w-full py-2.5 bg-orange-600 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
              >
                Apply Range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
