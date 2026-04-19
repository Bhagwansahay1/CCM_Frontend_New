import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  ChevronDown, 
  CheckCircle2, 
  MoreVertical,
  ArrowUpDown
} from 'lucide-react';
import Sidebar from './components/dashboard/Sidebar';
import Navbar from './components/dashboard/Navbar';
import DataTable, { Column } from './components/dashboard/DataTable';
import Pagination from './components/dashboard/Pagination';
import { Select } from './components/dashboard/Filters';

interface TemplateRecord {
  id: string;
  name: string;
  dltId: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  status: 'Active' | 'Inactive';
}

const mockTemplates: TemplateRecord[] = [
  { id: '1', name: 'Account Statement SMS', dltId: 'DLT1234567890123', senderId: 'AUBANK', createdAt: '2025-01-15 10:30 AM', updatedAt: '2025-01-20 02:15 PM', createdBy: 'John Smith', updatedBy: 'Sarah Johnson', status: 'Active' },
  { id: '2', name: 'Payment Confirmation', dltId: 'DLT2345678901234', senderId: 'AUBANK', createdAt: '2025-01-10 09:45 AM', updatedAt: '2025-01-18 11:30 AM', createdBy: 'Emily Davis', updatedBy: 'Michael Brown', status: 'Active' },
  { id: '3', name: 'Transaction Alert', dltId: 'DLT3456789012345', senderId: 'AUBANK', createdAt: '2025-01-08 02:20 PM', updatedAt: '2025-01-22 04:45 PM', createdBy: 'David Wilson', updatedBy: 'Jessica Lee', status: 'Active' },
  { id: '4', name: 'OTP Verification', dltId: 'DLT4567890123456', senderId: 'AUBANK', createdAt: '2025-01-05 08:15 AM', updatedAt: '2025-01-19 01:30 PM', createdBy: 'Robert Taylor', updatedBy: 'Amanda White', status: 'Active' },
  { id: '5', name: 'Balance Inquiry Response', dltId: 'DLT5678901234567', senderId: 'AUBANK', createdAt: '2025-01-12 11:00 AM', updatedAt: '2025-01-21 03:20 PM', createdBy: 'Lisa Anderson', updatedBy: 'James Martinez', status: 'Active' },
  { id: '6', name: 'Loan Approval Notice', dltId: 'DLT6789012345678', senderId: 'AUBANK', createdAt: '2025-01-07 03:30 PM', updatedAt: '2025-01-17 10:15 AM', createdBy: 'Kevin Garcia', updatedBy: 'Sophia Rodriguez', status: 'Active' },
  { id: '7', name: 'Card Activation Alert', dltId: 'DLT7890123456789', senderId: 'AUBANK', createdAt: '2025-01-14 01:45 PM', updatedAt: '2025-01-23 09:00 AM', createdBy: 'Daniel Kim', updatedBy: 'Olivia Chen', status: 'Active' },
  { id: '8', name: 'Promotional Offer SMS', dltId: 'DLT8901234567890', senderId: 'AUBANK', createdAt: '2025-01-11 10:20 AM', updatedAt: '2025-01-24 02:40 PM', createdBy: 'Chris Johnson', updatedBy: 'Emma Davis', status: 'Active' },
  { id: '9', name: 'Bill Payment Reminder', dltId: 'DLT9012345678901', senderId: 'AUBANK', createdAt: '2025-01-09 04:15 PM', updatedAt: '2025-01-16 11:50 AM', createdBy: 'Matthew Wilson', updatedBy: 'Isabella Moore', status: 'Active' },
  { id: '10', name: 'Account Closure Confirmation', dltId: 'DLT0123456789012', senderId: 'AUBANK', createdAt: '2025-01-13 09:30 AM', updatedAt: '2025-01-25 03:10 PM', createdBy: 'Ryan Thomas', updatedBy: 'Mia Jackson', status: 'Active' },
];

export default function TemplateManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10');

  const columns: Column<TemplateRecord>[] = [
    { 
      header: '#', 
      key: 'index',
      render: (_, __, idx) => <span className="font-bold text-gray-800">{idx + 1}</span>,
      className: 'w-12'
    },
    { 
      header: (
        <div className="flex items-center space-x-1 cursor-pointer hover:text-orange-600 transition-colors">
          <span>TEMPLATE NAME</span>
          <ArrowUpDown size={12} />
        </div>
      ), 
      key: 'name',
      className: 'font-black text-gray-900 min-w-[200px]'
    },
    { 
      header: (
        <div className="flex items-center space-x-1 cursor-pointer hover:text-orange-600 transition-colors">
          <span>DLT ID</span>
          <ArrowUpDown size={12} />
        </div>
      ), 
      key: 'dltId' 
    },
    { 
      header: 'SENDER ID', 
      key: 'senderId',
      render: (val) => (
        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black tracking-widest uppercase border border-orange-100/50">
          {val}
        </span>
      )
    },
    { 
      header: (
        <div className="flex items-center space-x-1 cursor-pointer hover:text-orange-600 transition-colors">
          <span>CREATED AT</span>
          <ArrowUpDown size={12} />
        </div>
      ), 
      key: 'createdAt',
      className: 'text-gray-500 whitespace-nowrap'
    },
    { 
      header: (
        <div className="flex items-center space-x-1 cursor-pointer hover:text-orange-600 transition-colors">
          <span>UPDATED AT</span>
          <ArrowUpDown size={12} />
        </div>
      ), 
      key: 'updatedAt',
      className: 'text-gray-500 whitespace-nowrap'
    },
    { header: 'CREATED BY', key: 'createdBy' },
    { header: 'UPDATED BY', key: 'updatedBy' },
    { 
      header: 'STATUS', 
      key: 'status',
      render: (val) => (
        <div className="flex items-center space-x-1.5 text-green-500">
          <CheckCircle2 size={16} fill="currentColor" className="text-white bg-green-500 rounded-full" />
          <span className="text-[11px] font-black uppercase tracking-wider">{val}</span>
        </div>
      )
    },
    { 
      header: 'ACTION', 
      key: 'action',
      render: () => (
        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
          <MoreVertical size={20} />
        </button>
      ),
      className: 'text-center'
    }
  ];

  return (
    <div className="flex h-screen bg-[#FDF8F4] font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-orange-600 rounded-full"></div>
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Template Management</h1>
              </div>
              <p className="text-sm font-bold text-gray-400 ml-4">Manage your communication templates and configurations</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <button className="flex items-center space-x-3 bg-white border border-gray-100 px-5 py-3 rounded-2xl text-sm font-bold text-gray-700 shadow-sm hover:border-gray-200 transition-all active:scale-95 group">
                  <span>Template Options</span>
                  <ChevronDown size={18} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                </button>
              </div>
              
              <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-orange-600 hover:border-orange-100 transition-all active:scale-95">
                <Filter size={20} />
              </button>

              <button className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-2xl font-black tracking-widest uppercase shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95 group">
                <Plus size={20} className="stroke-[3px]" />
                <span>Create Template</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="relative">
            <DataTable columns={columns} data={mockTemplates} />
          </div>

          {/* Footer Section - Reusing Pagination with slight tweaks for layout */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-gray-400">Show</span>
              <div className="w-20">
                <input 
                  type="text" 
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                />
              </div>
              <span className="text-sm font-bold text-gray-400 tracking-tight">119 Total Rows</span>
            </div>

            <Pagination 
              currentPage={currentPage}
              totalPages={12}
              pageSize={pageSize}
              totalRecords={119}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
