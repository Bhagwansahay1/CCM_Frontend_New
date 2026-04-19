import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Settings, 
  Briefcase, 
  FileText, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  key?: React.Key;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={`w-full flex flex-col items-center space-y-1 group py-2 px-1 transition-all ${active ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
  >
    <div className={`p-2.5 rounded-xl transition-colors ${active ? 'bg-orange-50 shadow-sm' : 'group-hover:bg-gray-50'}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold text-center leading-tight">{label}</span>
  </button>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Database size={20} />, label: 'Data', path: '/data' },
    { icon: <Layers size={20} />, label: 'Advance Data', path: '#' },
    { icon: <Database size={20} />, label: 'Master DB', path: '#' },
    { icon: <Briefcase size={20} />, label: 'Jobs & Status', path: '/jobs-status' },
    { icon: <Layers size={20} />, label: 'Orchestration', path: '#' },
    { icon: <FileText size={20} />, label: 'Template', path: '#' },
    { icon: <Settings size={20} />, label: 'Settings', path: '#' },
    { icon: <Database size={20} />, label: 'Reports', path: '#' },
    { icon: <Layers size={20} />, label: 'Logs', path: '#' },
    { icon: <Settings size={20} />, label: 'Profile', path: '#' },
  ];

  return (
    <aside className="w-20 md:w-24 bg-white border-r border-gray-100 flex flex-col h-screen z-20">
      {/* Logo/Avatar Area */}
      <div className="flex flex-col items-center py-6 border-b border-gray-50 mb-2">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg shadow-sm border-2 border-white">
          JD
        </div>
      </div>

      {/* Scrollable Nav Area */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2 space-y-4">
        {navItems.map((item, idx) => (
          <NavItem 
            key={idx} 
            icon={item.icon} 
            label={item.label} 
            active={location.pathname === item.path}
            onClick={() => item.path !== '#' && navigate(item.path)}
          />
        ))}
      </nav>

      {/* Bottom Action */}
      <div className="py-4 border-t border-gray-50 flex justify-center">
        <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </aside>
  );
}
