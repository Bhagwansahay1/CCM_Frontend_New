import React, { useState, useRef } from 'react';
import { 
  Play, 
  Upload, 
  FileText, 
  Download, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User,
  ArrowRight,
  Filter,
  X
} from 'lucide-react';
import Sidebar from './components/dashboard/Sidebar';
import Navbar from './components/dashboard/Navbar';
import StatCard from './components/dashboard/StatCard';
import DataTable, { Column } from './components/dashboard/DataTable';
import { Select } from './components/dashboard/Filters';

interface JobRecord {
  jobName: string;
  batchId: string;
  inputData: string;
  processedData: string;
  status: string;
  actionRequired: string;
  timeTaken: string;
  lastRun: string;
  lastUser: string;
  progress?: number;
}

interface ErrorJobRecord {
  jobName: string;
  batchId: string;
  inputData: string;
  processedData: string;
  status: string;
  lastRun: string;
  lastUser: string;
}

const liveJobs: JobRecord[] = [
  { jobName: 'RetailCreditCard_Campaign', batchId: 'e335ded95849', inputData: '1,250', processedData: '1,250', status: 'Job Completed 100%', actionRequired: '—', timeTaken: '4 Minutes', lastRun: 'a minute ago', lastUser: 'System', progress: 100 },
  { jobName: 'PersonalLoan_Outreach', batchId: 'a892def12345', inputData: '850', processedData: '850', status: 'Job Completed 100%', actionRequired: '—', timeTaken: '2 Minutes', lastRun: '15 minutes ago', lastUser: 'System', progress: 100 },
  { jobName: 'HomeLoan_Renewal', batchId: 'b123fed98765', inputData: '520', processedData: '520', status: 'Job Completed 100%', actionRequired: '—', timeTaken: '30 Secs', lastRun: '2 hours ago', lastUser: 'System', progress: 100 },
  { jobName: 'SavingsAccount_Promo', batchId: 'c456abc78901', inputData: '2,100', processedData: '2,100', status: 'Job Completed 100%', actionRequired: '—', timeTaken: '5 Minutes', lastRun: '3 hours ago', lastUser: 'System', progress: 100 },
];

const errorJobs: ErrorJobRecord[] = [
  { jobName: 'Insurance_Premium_Notice', batchId: 'F789xyz45678', inputData: '320', processedData: '0', status: 'Document composition failed', lastRun: 'Yesterday', lastUser: 'Admin' },
  { jobName: 'CreditCard_Statement', batchId: 'g234abc12345', inputData: '145', processedData: '0', status: 'Document composition failed', lastRun: 'Tuesday', lastUser: 'System' },
  { jobName: 'Mortgage_Reminder', batchId: 'h567def89012', inputData: '89', processedData: '0', status: 'Document composition failed', lastRun: '3 days ago', lastUser: 'Admin' },
];

export default function JobsStatus() {
  const [jobTemplate, setJobTemplate] = useState('Choose a job template');
  const [downloadJob, setDownloadJob] = useState('Select Job');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const columns: Column<JobRecord>[] = [
    { 
      header: 'JOB NAME', 
      key: 'jobName',
      render: (val) => (
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-blue-400" />
          <span>{val}</span>
        </div>
      )
    },
    { header: 'BATCH ID', key: 'batchId' },
    { header: 'INPUT DATA', key: 'inputData', headerClassName: 'leading-tight' },
    { header: 'PROCESSED DATA', key: 'processedData', headerClassName: 'leading-tight' },
    { 
      header: 'STATUS', 
      key: 'status',
      render: (val, record) => (
        <div className="space-y-1.5">
          <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{val}</span>
          <div className="w-full bg-gray-100 rounded-full h-1">
            <div className="bg-green-500 h-1 rounded-full" style={{ width: `${record.progress}%` }}></div>
          </div>
        </div>
      )
    },
    { header: 'ACTION REQUIRED', key: 'actionRequired', headerClassName: 'leading-tight' },
    { header: 'TIME TAKEN', key: 'timeTaken', headerClassName: 'leading-tight' },
    { header: 'LAST RUN', key: 'lastRun' },
    { header: 'LAST USER', key: 'lastUser' },
  ];

  const errorColumns: Column<ErrorJobRecord>[] = [
    { 
      header: 'JOB NAME', 
      key: 'jobName',
      render: (val) => (
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-gray-400" />
          <span>{val}</span>
        </div>
      )
    },
    { header: 'BATCH ID', key: 'batchId' },
    { header: 'INPUT DATA', key: 'inputData' },
    { header: 'PROCESSED DATA', key: 'processedData' },
    { 
      header: 'STATUS', 
      key: 'status',
      render: (val) => (
        <div className="flex items-center space-x-1.5">
          <AlertCircle size={10} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-600">{val}</span>
        </div>
      )
    },
    { header: 'LAST RUN', key: 'lastRun' },
    { header: 'LAST USER', key: 'lastUser' },
    { 
      header: 'ACTIONS', 
      key: 'actions',
      render: () => (
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md active:scale-95">
          <Download size={14} />
          <span>Download Template</span>
        </button>
      )
    }
  ];

  return (
    <div className="flex h-screen bg-[#FDF8F4] font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8 space-y-12 scroll-smooth">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-8 bg-orange-600 rounded-full"></div>
              <h1 className="text-3xl font-black text-gray-800 tracking-tight">Job Progress Tracking</h1>
            </div>
            <p className="text-sm font-bold text-gray-400 ml-4">Monitor and manage your job workflows</p>
          </div>

          {/* To Run a Job - Gradient Section */}
          <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-indigo-600 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>

            <div className="relative space-y-10">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Play size={24} fill="currentColor" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-black tracking-tight">To Run a Job</h2>
                  <p className="text-sm font-medium text-white/80">Follow the steps below to submit your job</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-sm font-medium text-white/90 leading-relaxed">
                Complete the three-step process to submit your job for processing. Select your job template, upload the required files, and review before submission. Ensure your files match the template format for successful processing.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="bg-white rounded-3xl p-6 text-gray-800 shadow-xl space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-200">01</div>
                    <div>
                      <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Step One</p>
                      <h3 className="text-lg font-black tracking-tight">Select Job</h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Job Template</label>
                    <Select 
                      options={['RetailCreditCard', 'PersonalLoan', 'HomeLoan']} 
                      value={jobTemplate} 
                      onChange={setJobTemplate}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-3xl p-6 text-gray-800 shadow-xl space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-100">02</div>
                    <div>
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Step Two</p>
                      <h3 className="text-lg font-black tracking-tight">Upload Files</h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">File Upload</label>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                    <button 
                      onClick={triggerFileInput}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="w-full h-[52px] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center space-x-3 text-gray-400 hover:border-orange-300 hover:text-orange-500 transition-all group overflow-hidden"
                    >
                      <Upload size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold truncate max-w-[150px]">
                        {selectedFile ? selectedFile.name : 'Drag or upload files'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-3xl p-6 text-gray-800 shadow-xl space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-100">03</div>
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Step Three</p>
                      <h3 className="text-lg font-black tracking-tight">File Status</h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Current Status</label>
                    <div className="w-full h-[52px] bg-gray-50 rounded-xl border border-gray-100 px-4 flex items-center justify-between text-gray-600 font-bold text-xs">
                      <div className="flex items-center space-x-3 truncate">
                        <FileText size={16} className={selectedFile ? 'text-blue-500' : 'text-gray-400'} />
                        <span className={selectedFile ? 'text-gray-800 truncate' : 'text-gray-400 italic'}>
                          {selectedFile ? selectedFile.name : 'No files selected'}
                        </span>
                      </div>
                      {selectedFile && (
                        <button 
                          onClick={removeFile}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center space-x-3 bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-black tracking-widest uppercase hover:bg-white/30 transition-all shadow-xl active:scale-95 group">
                  <span>Submit Job</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>

          {/* Download a Template */}
          <section className="bg-indigo-50 border-2 border-white rounded-[32px] p-8 shadow-sm space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                <Download size={24} className="text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Download a Template</h2>
                <p className="text-sm font-bold text-gray-400">Select a job and download its template file</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Select Job</label>
                <Select 
                  options={['RetailCreditCard', 'PersonalLoan', 'HomeLoan']} 
                  value={downloadJob} 
                  onChange={setDownloadJob}
                  className="w-full h-[52px]"
                />
              </div>
              <div className="md:pt-5 w-full md:w-auto">
                <button className="w-full md:w-auto flex items-center justify-center space-x-3 bg-indigo-600 text-white px-10 h-[52px] rounded-2xl font-black tracking-widest uppercase hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
                  <Download size={20} />
                  <span>Download Template</span>
                </button>
              </div>
            </div>

            <div className="bg-white/80 border border-indigo-100 p-4 rounded-xl flex items-center space-x-3 text-xs font-bold text-gray-500">
              <FileText size={16} className="text-indigo-400" />
              <span>Download the template file for the selected job type. Fill in your data according to the template format, then use the <span className="text-indigo-600">"To Run a Job"</span> section above to upload and submit your job.</span>
            </div>
          </section>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard label="TOTAL JOBS" value="1012" icon={<Briefcase size={24} className="text-white" />} color="bg-purple-500" />
            <StatCard label="LIVE JOBS" value="24" icon={<FileText size={24} className="text-white" />} color="bg-orange-500" />
            <StatCard label="COMPLETED JOBS" value="985" icon={<CheckCircle2 size={24} className="text-white" />} color="bg-green-500" />
            <StatCard label="ERROR JOBS" value="3" icon={<AlertCircle size={24} className="text-white" />} color="bg-red-500" />
          </div>

          {/* Live & Completed Jobs Table */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Live & Completed Jobs</h2>
              </div>
              <button className="flex items-center space-x-2 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-orange-600 hover:border-orange-100 transition-all group">
                <Filter size={18} />
              </button>
            </div>
            <DataTable columns={columns} data={liveJobs} />
          </section>

          {/* Terminated & Error Jobs Section */}
          <section className="space-y-12">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">Terminated & Error Jobs</h2>
              </div>
              <p className="text-sm font-bold text-gray-400 ml-4">Review and manage failed job executions</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                  <h3 className="text-xl font-black text-gray-800 tracking-tight">Error Jobs</h3>
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-lg uppercase tracking-wider">3 Failed</span>
                </div>
                <button className="flex items-center space-x-2 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-orange-600 hover:border-orange-100 transition-all group">
                  <Filter size={18} />
                </button>
              </div>
              <DataTable columns={errorColumns} data={errorJobs} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
