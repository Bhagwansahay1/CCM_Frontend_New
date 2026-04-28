import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download,
  FileText,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Sidebar from './components/dashboard/Sidebar';
import Navbar from './components/dashboard/Navbar';
import DataTable, { Column } from './components/dashboard/DataTable';
import Pagination from './components/dashboard/Pagination';
import { Select, DateRangePicker } from './components/dashboard/Filters';
import StatCard from './components/dashboard/StatCard';

interface CampaignJob {
  id: string;
  jobName: string;
  batchId: string;
  records: number;
  processed: number;
  status: 'Completed' | 'Processing' | 'Failed';
  duration: string;
  createdAt: string;
}

const mockJobs: CampaignJob[] = [
  { id: '1', jobName: 'Retail_CC_Statement_Jan', batchId: 'B-8821', records: 1250, processed: 1250, status: 'Completed', duration: '4m 12s', createdAt: '2026-01-20 10:30 AM' },
  { id: '2', jobName: 'Retail_CC_Statement_Feb', batchId: 'B-8822', records: 1400, processed: 1400, status: 'Completed', duration: '5m 02s', createdAt: '2026-02-21 09:15 AM' },
  { id: '3', jobName: 'Retail_CC_Onboarding', batchId: 'B-8901', records: 500, processed: 450, status: 'Processing', duration: '2m 30s', createdAt: '2026-03-25 02:45 PM' },
  { id: '4', jobName: 'Retail_CC_Alerts', batchId: 'B-9012', records: 2100, processed: 2100, status: 'Completed', duration: '8m 45s', createdAt: '2026-04-10 11:00 AM' },
];

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10');
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const campaignMap: Record<string, string> = {
    'retail-credit': 'Retail Credit Card Campaign',
    'personal-loan': 'Personal Loan Promotion',
    'home-loan': 'Home Loan Awareness',
    'insurance': 'Insurance Premium Renewal'
  };

  const campaignName = campaignMap[id || ''] || 'Campaign Details';

  const columns: Column<CampaignJob>[] = [
    { 
      header: 'JOB NAME', 
      key: 'jobName',
      render: (val) => (
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-blue-500" />
          <span className="font-bold">{val}</span>
        </div>
      )
    },
    { header: 'BATCH ID', key: 'batchId' },
    { 
      header: 'RECORDS', 
      key: 'records',
      render: (val) => val.toLocaleString()
    },
    { 
      header: 'PROCESSED', 
      key: 'processed',
      render: (val) => val.toLocaleString()
    },
    { 
      header: 'STATUS', 
      key: 'status',
      render: (val) => (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
          val === 'Completed' ? 'bg-green-50 text-green-500' : 
          val === 'Processing' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'
        }`}>
          {val}
        </span>
      )
    },
    { header: 'DURATION', key: 'duration' },
    { header: 'CREATED AT', key: 'createdAt', className: 'text-gray-500' },
  ];

  return (
    <div className="flex h-screen bg-[#FDF8F4] font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-orange-600 transition-all active:scale-95"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-8 bg-orange-600 rounded-full"></div>
                  <h1 className="text-3xl font-black text-gray-800 tracking-tight">{campaignName}</h1>
                </div>
                <p className="text-sm font-bold text-gray-400 ml-4">Detailed view of campaign jobs and status</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black tracking-widest uppercase shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                <Download size={20} />
                <span>Export data</span>
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard label="TOTAL JOBS" value="48" icon={<Layers size={22} className="text-white" />} color="bg-indigo-500" />
            <StatCard label="SUCCESSFUL" value="42" icon={<CheckCircle2 size={22} className="text-white" />} color="bg-green-500" />
            <StatCard label="IN PROGRESS" value="4" icon={<Calendar size={22} className="text-white" />} color="bg-blue-500" />
            <StatCard label="FAILED" value="2" icon={<AlertCircle size={22} className="text-white" />} color="bg-red-500" />
          </div>

          {/* Table Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs by name or batch ID..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>
            <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-orange-600 transition-all">
              <Filter size={20} />
            </button>
          </div>

          {/* Jobs Table */}
          <DataTable columns={columns} data={mockJobs} />

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={5}
            pageSize={pageSize}
            totalRecords={48}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </main>
      </div>
    </div>
  );
}
