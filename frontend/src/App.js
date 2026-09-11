import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import LiveSession from "@/pages/LiveSession";
import Reading from "@/pages/Reading";
import Writing from "@/pages/Writing";
import Vocabulary from "@/pages/Vocabulary";
import Certificate from "@/pages/Certificate";
import AdminDashboard from './pages/Admin';
import InfoPage from "./pages/InfoPage";
import Levels from "./pages/Levels";
import LevelDetail from "./pages/LevelDetail";
import Games from "./pages/Games";

function ProtectedLayout() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  if (!user) return <Navigate to="/auth" replace />;
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function PublicOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  return (
    <div className="App" dir="rtl">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<PublicOnly><Auth /></PublicOnly>} />
            
            {/* مسارات الصفحات التعريفية والسياسات المضافة للفوتر */}
            <Route path="/about" element={<InfoPage />} />
            <Route path="/faq" element={<InfoPage />} />
            <Route path="/privacy" element={<InfoPage />} />
            <Route path="/terms" element={<InfoPage />} />
            <Route path="/contact" element={<InfoPage />} />
            <Route path="/channels" element={<InfoPage />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/session/:mode" element={<LiveSession />} />
              <Route path="/reading" element={<Reading />} />
              <Route path="/writing" element={<Writing />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/levels" element={<Levels />} />
              <Route path="/levels/:levelId" element={<LevelDetail />} />
             <Route path="/games" element={<Games />} />
            
              <Route path="/admin" element={<AdminDashboard activeTab="students" />} />
              <Route path="/admin/settings" element={<AdminDashboard activeTab="settings" />} />
              <Route path="/admin/messages" element={<AdminDashboard activeTab="messages" />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </div>
  );
}
export default App;
