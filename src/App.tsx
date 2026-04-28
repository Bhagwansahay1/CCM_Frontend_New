import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import DataListing from './DataListing';
import JobsStatus from './JobsStatus';
import TemplateManagement from './TemplateManagement';
import CampaignDetails from './CampaignDetails';
import OnDemand from './OnDemand';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data" element={<DataListing />} />
        <Route path="/jobs-status" element={<JobsStatus />} />
        <Route path="/template" element={<TemplateManagement />} />
        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        <Route path="/on-demand" element={<OnDemand />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
