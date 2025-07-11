import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  NotFound,
  PortalLogin,
  PlanningRegister,
} from './pages';
import ClientLogin from './pages/ClientLogin';
import ClientDashboard from './components/client/ClientDashboard';
import PlanningDashboard from './components/planning/PlanningDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ManualEntry from './components/planning/ManualEntry';
import NotificationToast from './components/common/NotificationToast';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AdminSecureLogin from './pages/AdminSecureLogin';
import InternalPortalLogin from './pages/InternalPortalLogin';

const AppRoutes = () => {
  const { user, setUser, logout } = useAuth();
  const [notification, setNotification] = useState(null);

  const handleClientLogin = (client) => {
    setUser({ type: 'client', data: client });
  };

  const handleModifyAppointment = (clientId, date, creneau) => {
    setNotification({
      type: 'success',
      message: 'Votre rendez-vous a été modifié avec succès !',
    });

    if (user?.data) {
      setUser({
        ...user,
        data: {
          ...user.data,
          rdv: { date, creneau, statut: 'modifie' },
        },
      });
    }

    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client" element={<ClientLogin onLogin={handleClientLogin} />} />
        <Route element={<ProtectedRoute roles={['client']} />}>
          <Route
            path="/client/dashboard"
            element={
              <ClientDashboard
                client={user?.data}
                onModifyAppointment={handleModifyAppointment}
                onLogout={handleLogout}
              />
            }
          />
        </Route>

        <Route path="/portal/login" element={<PortalLogin />} />
        <Route path="/portal/register" element={<PlanningRegister />} />
        <Route path="/admin/secure-login" element={<AdminSecureLogin />} />
        <Route path="/internal/portal" element={<InternalPortalLogin />} />
        <Route element={<ProtectedRoute roles={['planning', 'admin']} />}>
          <Route
            path="/portal"
            element={
              user?.type === 'admin' ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <PlanningDashboard onLogout={handleLogout} />
              )
            }
          />
          <Route
            path="/portal/registry"
            element={<ManualEntry onSave={() => {}} onCancel={() => {}} />}
          />
          <Route
            path="/internal/dashboard"
            element={<PlanningDashboard onLogout={handleLogout} />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotificationToast notification={notification} />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
export default App;
