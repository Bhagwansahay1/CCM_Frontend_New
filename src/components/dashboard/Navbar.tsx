import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
}

export default function Navbar({ userName = "JD", userAvatar }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">AU</div>
        <h1 className="text-lg font-bold text-gray-800 tracking-tight">AU CCM Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-50 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 border-2 border-white rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-indigo-500 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100"></div>
          <span className="text-sm font-bold text-gray-700 hidden sm:block">{userName}</span>
        </div>

        <div className="h-8 w-px bg-gray-200"></div>
        
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center space-x-2 text-gray-500 hover:text-red-600 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
        
        <div className="h-8 w-px bg-gray-200"></div>
        
        <button className="flex items-center space-x-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          <span>Last 7 Days</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
