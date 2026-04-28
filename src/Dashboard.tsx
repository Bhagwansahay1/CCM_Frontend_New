import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  MessageSquare,
  Send,
  Printer,
  Cloud,
  Layers,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

// Reusable Components
import Sidebar from './components/dashboard/Sidebar';
import Navbar from './components/dashboard/Navbar';
import StatCard from './components/dashboard/StatCard';
import CommStatItem from './components/dashboard/CommStatItem';
import ChartCard from './components/dashboard/ChartCard';
import { Select, DateRangePicker } from './components/dashboard/Filters';

const emailData = [
  { name: 'Delivered', count: 5, color: '#E5E7EB' },
  { name: 'Read', count: 25, color: '#3B82F6' },
  { name: 'Undelivered', count: 300, color: '#D1D5DB' },
];

const smsData = [
  { name: 'Delivered', count: 45 },
  { name: 'Undelivered', count: 10 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Communication');
  const [dateRange, setDateRange] = useState('23rd Dec 2025 – 22nd Jan 2026');
  const [dataType, setDataType] = useState('All Data');
  const [goldPl, setGoldPl] = useState('Gold-PL');

  const platforms = [
    { id: 'retail-credit', name: 'Retail Credit Card', jobs: 24, progress: 85, color: 'bg-blue-600', icon: <Mail size={20} /> },
    { id: 'personal-loan', name: 'Personal Loan Promo', jobs: 12, progress: 45, color: 'bg-orange-600', icon: <MessageSquare size={20} /> },
    { id: 'home-loan', name: 'Home Loan Awareness', jobs: 8, progress: 100, color: 'bg-green-600', icon: <Send size={20} /> },
    { id: 'insurance', name: 'Insurance Renewal', jobs: 18, progress: 20, color: 'bg-red-600', icon: <Briefcase size={20} /> },
  ];

  const summaryCards = [
    { label: 'TOTAL JOBS', value: 61, icon: <Briefcase className="text-white" />, color: 'bg-purple-500' },
    { label: 'LIVE JOBS', value: 9, icon: <FileText className="text-white" />, color: 'bg-orange-500' },
    { label: 'COMPLETED JOBS', value: 52, icon: <CheckCircle2 className="text-white" />, color: 'bg-green-500' },
    { label: 'ERROR JOBS', value: 0, icon: <AlertCircle className="text-white" />, color: 'bg-red-500' },
  ];

  const commSummary = [
    { label: 'Total Records', value: 334, icon: <Layers className="text-orange-500" /> },
    { label: 'Email', value: 326, icon: <Mail className="text-blue-500" /> },
    { label: 'SMS', value: 57, icon: <MessageSquare className="text-orange-400" /> },
    { label: 'WhatsApp', value: 0, icon: <Send className="text-green-500" /> },
    { label: 'Print', value: 0, icon: <Printer className="text-gray-500" /> },
    { label: 'Print & Digital (Both)', value: 0, icon: <Cloud className="text-blue-400" /> },
  ];

  return (
    <div className="flex h-screen bg-[#FDF8F4] font-sans overflow-hidden">
      {/* Sidebar - Now scrollable and reusable */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar - Reusable */}
        <Navbar />

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth">
          {/* Summary Cards - Reusable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {summaryCards.map((card, idx) => (
              <StatCard 
                key={idx} 
                label={card.label} 
                value={card.value} 
                icon={card.icon} 
                color={card.color} 
              />
            ))}
          </div>

          {/* Tabs and Filters - Reusable Components */}
          <div className="space-y-8 bg-white/50 p-6 rounded-[32px] border border-white/80 backdrop-blur-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-10">
                {['Communication', 'Analytics', 'Reports'].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-4 text-sm font-black tracking-widest uppercase border-b-4 transition-all duration-300 ${activeTab === tab ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex flex-wrap gap-6 items-center">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
              <Select 
                options={['All Data', 'Filtered Data', 'Raw Data']} 
                value={dataType} 
                onChange={setDataType} 
              />
              <Select 
                options={['Gold-PL', 'Silver-PL', 'Platinum-PL']} 
                value={goldPl} 
                onChange={setGoldPl} 
                variant="solid"
              />
            </div>
          </div>

          {/* Running Campaigns Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-orange-600 rounded-full"></div>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Running Campaigns</h2>
              </div>
              <button className="text-sm font-black text-orange-600 hover:orange-700 uppercase tracking-widest transition-all">
                View All Campaigns
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((campaign) => (
                <div 
                  key={campaign.id}
                  onClick={() => navigate(`/campaign-details/${campaign.id}`)}
                  className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
                >
                  {/* Decorative background circle */}
                  <div className={`absolute -right-6 -top-6 w-24 h-24 ${campaign.color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl ${campaign.color} bg-opacity-10 text-${campaign.color.split('-')[1]}-600`}>
                        {React.cloneElement(campaign.icon as React.ReactElement, { className: `text-${campaign.color.split('-')[1]}-600` })}
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{campaign.jobs} Jobs</span>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-base font-black text-gray-800 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">{campaign.name}</h3>
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Progress</span>
                        <span className="text-gray-800">{campaign.progress}%</span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${campaign.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-orange-600 transition-all pt-2">
                      <span>View details</span>
                      <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Summary - Reusable */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Communication Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {commSummary.map((item, idx) => (
                <CommStatItem 
                  key={idx} 
                  label={item.label} 
                  value={item.value} 
                  icon={item.icon} 
                />
              ))}
            </div>
          </div>

          {/* Charts Row - Reusable ChartCard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10">
            {/* Email Delivery Report */}
            <ChartCard title="Email Delivery Report" accentColor="bg-orange-500">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emailData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 700 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 700 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={45}>
                    {emailData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* SMS Delivery Report */}
            <ChartCard title="SMS Delivery Report" accentColor="bg-blue-500">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={smsData} 
                  margin={{ top: 20, right: 30, left: 40, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                  <XAxis 
                    type="number" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 700 }} 
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 800 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[0, 8, 8, 0]} barSize={35} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </main>
      </div>
    </div>
  );
}
