import React, { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  accentColor?: string;
}

export default function ChartCard({ title, children, accentColor = 'bg-orange-500' }: ChartCardProps) {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-8 hover:shadow-xl transition-all duration-500 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-1.5 h-7 ${accentColor} rounded-full shadow-sm group-hover:scale-y-125 transition-transform duration-300`}></div>
          <h3 className="text-xl font-black text-gray-800 tracking-tight">{title}</h3>
        </div>
        <div className="w-2.5 h-2.5 bg-gray-200 rounded-full group-hover:bg-orange-300 transition-colors"></div>
      </div>
      <div className="h-[320px] w-full relative">
        {children}
      </div>
    </div>
  );
}
