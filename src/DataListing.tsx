import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Sidebar from './components/dashboard/Sidebar';
import Navbar from './components/dashboard/Navbar';
import { Select, DateRangePicker } from './components/dashboard/Filters';
import DataTable, { Column } from './components/dashboard/DataTable';
import Pagination from './components/dashboard/Pagination';

interface DataRecord {
  id: string;
  name: string;
  mobile: string;
  email: string;
  jobName: string;
  batchId: string;
  remarks: string;
  status: 'DELIVERED' | 'UNDELIVERED';
  deliveredDate: string;
}

const mockData: DataRecord[] = Array.from({ length: 7 }).map((_, i) => ({
  id: `16990326530350585${i + 3}`,
  name: `${String.fromCharCode(68 + i)}*******${['AN', 'HA', 'TH', 'MA', 'AN', 'RI', 'EY'][i]}`,
  mobile: `${9 - i}********${[19, 45, 82, 33, 67, 21, 95][i]}`,
  email: `${['g', 'k', 'm', 'p', 'j', 'n', 's'][i]}*******${i + 2}@***.com`,
  jobName: 'RetailCreditCard',
  batchId: 'e335ded95849',
  remarks: i % 2 === 0 ? 'Indicator 1' : 'Email and SMS',
  status: 'UNDELIVERED',
  deliveredDate: '—'
}));

export default function DataListing() {
  const [dateRange, setDateRange] = useState('23rd Dec 2025 – 22nd Jan 2026');
  const [jobType, setJobType] = useState('RetailCreditCard');
  const [pageSize, setPageSize] = useState('100');
  const [currentPage, setCurrentPage] = useState(1);

  const columns: Column<DataRecord>[] = [
    { header: 'Unique ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { 
      header: <div className="leading-tight">Mobile<br/>Number</div>, 
      key: 'mobile' 
    },
    { header: 'Email', key: 'email' },
    { 
      header: <div className="leading-tight">Job Name /<br/>Template ID</div>, 
      key: 'jobName' 
    },
    { header: 'Batch ID', key: 'batchId' },
    { 
      header: 'Remarks', 
      key: 'remarks',
      className: 'text-gray-500'
    },
    { 
      header: (
        <div className="flex items-center space-x-1">
          <span>Email Status</span>
          <ChevronDown size={12} />
        </div>
      ), 
      key: 'status',
      render: (status) => (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
          status === 'UNDELIVERED' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
        }`}>
          {status}
        </span>
      )
    },
    { 
      header: <div className="leading-tight">Email<br/>Delivered Date</div>, 
      key: 'deliveredDate',
      className: 'text-gray-400'
    },
  ];

  return (
    <div className="flex h-screen bg-[#FDF8F4] font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-orange-600 rounded-full"></div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">Communications Data Listing</h2>
              </div>
              <p className="text-sm font-bold text-gray-400 ml-4">View and manage communication records</p>
            </div>

            <div className="flex items-center space-x-4">
               <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Select 
              options={['RetailCreditCard', 'PersonalLoan', 'HomeLoan']} 
              value={jobType} 
              onChange={setJobType}
              className="min-w-[200px]"
            />
          </div>

          {/* Table Container */}
          <DataTable columns={columns} data={mockData} />

          {/* Pagination Section */}
          <Pagination 
            currentPage={currentPage}
            totalPages={3}
            pageSize={pageSize}
            totalRecords={4382}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </main>
      </div>
    </div>
  );
}
