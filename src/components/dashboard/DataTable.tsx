import React, { ReactNode } from 'react';

export interface Column<T> {
  header: ReactNode;
  key: keyof T | string;
  render?: (value: any, record: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (record: T) => void;
  className?: string;
}

export default function DataTable<T>({ 
  columns, 
  data, 
  onRowClick,
  className = "" 
}: DataTableProps<T>) {
  return (
    <div className={`bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/30">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={`px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest ${col.headerClassName || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr 
                  key={rowIdx} 
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors group ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : 'hover:bg-gray-50/50'}`}
                >
                  {columns.map((col, colIdx) => (
                    <td 
                      key={colIdx} 
                      className={`px-6 py-5 text-sm font-bold text-gray-600 ${col.className || ''}`}
                    >
                      {col.render 
                        ? col.render((row as any)[col.key], row) 
                        : (row as any)[col.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400 font-bold">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
