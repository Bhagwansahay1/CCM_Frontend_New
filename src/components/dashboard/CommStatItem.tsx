import React, { ReactNode } from 'react';

interface CommStatItemProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  key?: React.Key;
}

export default function CommStatItem({ label, value, icon }: CommStatItemProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center space-x-5 group hover:shadow-md hover:border-orange-100 transition-all duration-300">
      <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-50 transition-colors">
        {icon}
      </div>
      <div className="space-y-0.5">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-gray-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
