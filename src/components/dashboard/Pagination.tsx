import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import { Select } from './Filters';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: string;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: string) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  className = ""
}: PaginationProps) {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between gap-6 pb-10 ${className}`}>
      <div className="flex items-center space-x-3">
        <span className="text-sm font-bold text-gray-500">Show</span>
        <Select 
          options={['10', '25', '50', '100']} 
          value={pageSize} 
          onChange={onPageSizeChange}
          className="w-24"
        />
      </div>

      <div className="flex items-center space-x-2">
        <button 
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-400 hover:text-orange-600 transition-colors border border-gray-200 rounded-lg disabled:opacity-30 disabled:hover:text-gray-400"
        >
          <ChevronsLeft size={18} />
        </button>
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-400 hover:text-orange-600 transition-colors border border-gray-200 rounded-lg disabled:opacity-30 disabled:hover:text-gray-400"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg text-sm font-black transition-all ${
                  currentPage === page 
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' 
                    : 'text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-400 hover:text-orange-600 transition-colors border border-gray-200 rounded-lg disabled:opacity-30 disabled:hover:text-gray-400"
        >
          <ChevronRight size={18} />
        </button>
        <button 
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-400 hover:text-orange-600 transition-colors border border-gray-200 rounded-lg disabled:opacity-30 disabled:hover:text-gray-400"
        >
          <ChevronsRight size={18} />
        </button>

        <div className="h-8 w-px bg-gray-200 mx-2"></div>

        <div className="flex items-center space-x-3">
          <span className="text-sm font-bold text-gray-500">Jump to</span>
          <input 
            type="text" 
            placeholder="Page"
            className="w-20 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
        
        <span className="text-sm font-bold text-gray-500 ml-4">Total: <span className="text-gray-800">{totalRecords.toLocaleString()}</span></span>
      </div>
    </div>
  );
}
