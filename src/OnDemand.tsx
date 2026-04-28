import React, { useState } from 'react';
import { 
  Search, 
  Mail, 
  MessageSquare, 
  Send, 
  Bell,
  Eye,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  X,
  User,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/dashboard/Sidebar';
import Navbar from './components/dashboard/Navbar';
import DataTable, { Column } from './components/dashboard/DataTable';
import Pagination from './components/dashboard/Pagination';

interface OnDemandRequest {
  requestId: string;
  requestType: string;
  channel: 'Email' | 'Sms' | 'Whatsapp' | 'Push';
  customerRef: string;
  dateRange: string;
  srId: string;
  srStatus: 'Active' | 'In Progress' | 'Pending' | 'Failed';
  raisedAt: string;
  updatedAt: string;
  sla: 'On Time' | 'At Risk' | 'Breached';
  deliveryStatus: 'Active' | 'In Progress' | 'Pending' | 'Failed';
}

interface JourneyStep {
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
}

interface AuditLog {
  time: string;
  user: string;
  action: string;
}

const mockRequests: OnDemandRequest[] = [
  { requestId: 'REQ-2024-001', requestType: 'Statement Request', channel: 'Email', customerRef: 'AUBANK', dateRange: '01 Jan - 31 Jan 2024', srId: 'SR-45678', srStatus: 'Active', raisedAt: '2024-02-01 09:30', updatedAt: '2024-02-01 14:22', sla: 'On Time', deliveryStatus: 'Active' },
  { requestId: 'REQ-2024-002', requestType: 'Payment Confirmation', channel: 'Sms', customerRef: 'AUBANK', dateRange: '15 Jan - 15 Feb 2024', srId: 'SR-45679', srStatus: 'In Progress', raisedAt: '2024-02-02 11:15', updatedAt: '2024-02-05 08:45', sla: 'At Risk', deliveryStatus: 'In Progress' },
  { requestId: 'REQ-2024-003', requestType: 'Account Summary', channel: 'Whatsapp', customerRef: 'AUBANK', dateRange: '01 Feb - 05 Feb 2024', srId: 'SR-45680', srStatus: 'Pending', raisedAt: '2024-02-03 16:20', updatedAt: '2024-02-03 16:20', sla: 'On Time', deliveryStatus: 'Pending' },
  { requestId: 'REQ-2024-004', requestType: 'Transaction Alert', channel: 'Push', customerRef: 'AUBANK', dateRange: '20 Jan - 20 Feb 2024', srId: 'SR-45681', srStatus: 'Failed', raisedAt: '2024-02-04 07:45', updatedAt: '2024-02-04 12:30', sla: 'Breached', deliveryStatus: 'Failed' },
  { requestId: 'REQ-2024-005', requestType: 'Credit Card Statement', channel: 'Email', customerRef: 'AUBANK', dateRange: '01 Jan - 31 Jan 2024', srId: 'SR-45682', srStatus: 'Active', raisedAt: '2024-02-05 10:00', updatedAt: '2024-02-05 15:18', sla: 'On Time', deliveryStatus: 'Active' },
];

const mockJourney: JourneyStep[] = [
  { title: 'Request Created', description: 'On demand request was initiated', timestamp: '2024-02-01 09:30', status: 'completed' },
  { title: 'Template Processing', description: 'Communication template selected and processed', timestamp: '2024-02-01 10:15', status: 'completed' },
  { title: 'Data Validation', description: 'Customer data validated successfully', timestamp: '2024-02-01 11:30', status: 'completed' },
  { title: 'Channel Delivery', description: 'Sent via email', timestamp: '2024-02-01 14:22', status: 'completed' },
];

const mockLogs: AuditLog[] = [
  { time: '2024-02-01 09:30', user: 'John Doe', action: 'Created request: Statement Request' },
  { time: '2024-02-01 10:15', user: 'System', action: 'Template assigned: TPL-5678' },
  { time: '2024-02-01 11:30', user: 'System', action: 'Data validated: All fields valid' },
  { time: '2024-02-01 14:22', user: 'System', action: 'Delivery attempted: Status delivered' },
];

function RequestDrawer({ request, onClose }: { request: OnDemandRequest; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-lg bg-white h-screen shadow-2xl overflow-y-auto"
      >
        <div className="p-8 space-y-8 pb-12">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-black text-xl">
                AU
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-gray-800 tracking-tight">{request.requestId}</h2>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black tracking-widest uppercase rounded flex items-center space-x-1">
                    <CheckCircle2 size={10} className="fill-current" />
                    <span>Complete</span>
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={24} />
            </button>
          </div>

          {/* Request Summary Card */}
          <div className="bg-[#FFF9F4] rounded-2xl p-6 space-y-6 border border-orange-100/50">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Request Summary</h3>
            
            <div className="grid grid-cols-2 gap-y-6 text-sm">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Request Type</p>
                <p className="font-bold text-gray-700">{request.requestType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Channel</p>
                <p className="font-bold text-gray-700">{request.channel}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer Ref</p>
                <p className="font-bold text-gray-700">CUST-10234</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SR ID</p>
                <p className="font-bold text-gray-700">{request.srId}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date Range</p>
                <p className="font-bold text-gray-700">{request.dateRange}</p>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="space-y-6">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Journey Timeline</h3>
            
            <div className="space-y-8">
              {mockJourney.map((step, idx) => (
                <div key={idx} className="flex space-x-4 relative">
                  {/* Line */}
                  {idx !== mockJourney.length - 1 && (
                    <div className="absolute left-3 top-6 w-[2px] h-full bg-gray-100 -z-10" />
                  )}
                  
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    step.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.status === 'completed' && <CheckCircle2 size={14} fill="currentColor" className="text-white bg-green-500 rounded-full" />}
                  </div>
                  
                  <div className="space-y-0.5">
                    <p className="font-black text-gray-800 text-sm">{step.title}</p>
                    <p className="text-xs text-gray-400 font-bold">{step.description}</p>
                    <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 font-bold tabular-nums">
                      <Clock size={10} />
                      <span>{step.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logs */}
          <div className="space-y-6 pt-4">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Audit Logs</h3>
            
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/30">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-orange-50 border-b border-orange-100/50">
                    <th className="px-4 py-3 font-black text-gray-500 uppercase tracking-widest text-[9px]">Time</th>
                    <th className="px-4 py-3 font-black text-gray-500 uppercase tracking-widest text-[9px]">User</th>
                    <th className="px-4 py-3 font-black text-gray-500 uppercase tracking-widest text-[9px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-orange-50/20 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-500 tabular-nums whitespace-nowrap">{log.time}</td>
                      <td className="px-4 py-3 font-black text-gray-800">{log.user}</td>
                      <td className="px-4 py-3 font-bold text-gray-400 leading-relaxed">{log.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function OnDemand() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10');
  const [selectedRequest, setSelectedRequest] = useState<OnDemandRequest | null>(null);

  const getChannelIcon = (channel: OnDemandRequest['channel']) => {
    switch (channel) {
      case 'Email': return <Mail size={16} className="text-blue-500" />;
      case 'Sms': return <MessageSquare size={16} className="text-orange-500" />;
      case 'Whatsapp': return <Send size={16} className="text-green-500" />;
      case 'Push': return <Bell size={16} className="text-purple-500" />;
    }
  };

  const getStatusStyle = (status: OnDemandRequest['srStatus']) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-600 border-green-100';
      case 'In Progress': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Failed': return 'bg-red-50 text-red-600 border-red-100';
    }
  };

  const getSLAStyle = (sla: OnDemandRequest['sla']) => {
    switch (sla) {
      case 'On Time': return 'text-green-600';
      case 'At Risk': return 'text-orange-500';
      case 'Breached': return 'text-red-500';
    }
  };

  const columns: Column<OnDemandRequest>[] = [
    { 
      header: 'REQUEST ID', 
      key: 'requestId',
      render: (val) => <span className="text-red-500 font-bold">{val}</span>
    },
    { header: 'REQUEST TYPE', key: 'requestType' },
    { 
      header: 'CHANNEL', 
      key: 'channel',
      render: (val) => (
        <div className="flex items-center space-x-2">
          {getChannelIcon(val)}
          <span>{val}</span>
        </div>
      )
    },
    { 
      header: 'CUSTOMER REF', 
      key: 'customerRef',
      render: (val) => (
        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black tracking-widest uppercase border border-orange-100/50">
          {val}
        </span>
      )
    },
    { header: 'DATE RANGE', key: 'dateRange', className: 'text-gray-500 text-xs' },
    { header: 'SR ID', key: 'srId' },
    { 
      header: 'SR STATUS', 
      key: 'srStatus',
      render: (val) => (
        <div className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border flex items-center justify-center space-x-1.5 ${getStatusStyle(val)}`}>
          {val === 'Active' && <CheckCircle2 size={10} fill="currentColor" className="text-white bg-green-600 rounded-full" />}
          <span>{val}</span>
        </div>
      )
    },
    { header: 'RAISED AT', key: 'raisedAt', className: 'text-gray-500 text-xs leading-tight' },
    { header: 'UPDATED AT', key: 'updatedAt', className: 'text-gray-500 text-xs leading-tight' },
    { 
      header: 'SLA', 
      key: 'sla',
      render: (val) => (
        <div className={`flex items-center space-x-2 font-bold ${getSLAStyle(val)}`}>
          {val === 'On Time' && <CheckCircle2 size={14} />}
          {val === 'At Risk' && <Clock size={14} />}
          {val === 'Breached' && <XCircle size={14} />}
          <span>{val}</span>
        </div>
      )
    },
    { 
      header: 'DELIVERY STATUS', 
      key: 'deliveryStatus',
      render: (val) => (
        <div className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border flex items-center justify-center space-x-1.5 ${getStatusStyle(val)}`}>
          <span>{val}</span>
        </div>
      )
    },
    { 
      header: 'LOGS', 
      key: 'logs',
      render: (_, record) => (
        <Eye 
          size={18} 
          className="text-gray-400 cursor-pointer hover:text-orange-600 transition-colors" 
          onClick={() => setSelectedRequest(record)}
        />
      )
    },
    { 
      header: 'ACTIONS', 
      key: 'actions',
      render: () => <MoreVertical size={18} className="text-gray-400 cursor-pointer" />
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
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">On Demand Services</h1>
              </div>
              <p className="text-sm font-bold text-gray-400 ml-4">Tracking customer communication journeys</p>
            </div>

            <div className="flex items-center space-x-3">
              {/* Buttons removed as per request */}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search requests..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Table Container */}
          <div className="relative">
            <DataTable columns={columns} data={mockRequests} className="shadow-2xl shadow-orange-900/5" />
          </div>

          {/* Footer Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <span className="text-sm font-bold text-gray-400">Showing 1 to 10 of 12 results</span>

            <Pagination 
              currentPage={currentPage}
              totalPages={2}
              pageSize={pageSize}
              totalRecords={12}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <RequestDrawer 
            request={selectedRequest} 
            onClose={() => setSelectedRequest(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
