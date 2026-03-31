import React, { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  key?: React.Key;
}

export default function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="space-y-1">
        <p className="text-[11px] font-extrabold text-gray-400 tracking-widest uppercase">{label}</p>
        <h3 className="text-4xl font-black text-gray-800 tracking-tighter">{value}</h3>
      </div>
      <div className={`${color} p-4 rounded-2xl shadow-lg relative transform group-hover:scale-110 transition-transform duration-300`}>
        {icon}
        <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-orange-400 border-3 border-white rounded-full shadow-sm"></div>
      </div>
    </div>
  );
}
