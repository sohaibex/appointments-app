import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import ClientLogin from './components/client/ClientLogin';
import ClientDashboard from './components/client/ClientDashboard';
import PlanningDashboard from './components/planning/PlanningDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import NotificationToast from './components/common/NotificationToast';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState(null);
  
  const handleClientLogin = (client) => {
    setCurrentUser({ type: 'client', data: client });
    setCurrentView('clientDashboard');
  };
  
  const handlePlanningLogin = () => {
    setCurrentUser({ type: 'planning', data: { email: 'planning@example.com' } });
    setCurrentView('planningDashboard');
  };
  
  const handleAdminLogin = () => {
    setCurrentUser({ type: 'admin', data: { email: 'admin@example.com' } });
    setCurrentView('adminDashboard');
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };
  
  const handleModifyAppointment = (clientId, date, creneau) => {
    setNotification({
      type: 'success',
      message: 'Votre rendez-vous a été modifié avec succès !'
    });
    
    if (currentUser?.data) {
      setCurrentUser({
        ...currentUser,
        data: {
          ...currentUser.data,
          rdv: {
            date: date,
            creneau: creneau,
            statut: 'modifie'
          }
        }
      });
    }
    
    setTimeout(() => setNotification(null), 5000);
  };
  
  const handleNavigate = (view) => {
    if (view === 'planningLogin') {
      handlePlanningLogin();
    } else if (view === 'adminLogin') {
      handleAdminLogin();
    } else {
      setCurrentView(view);
    }
  };
  
  return (
    <>
      {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentView === 'clientLogin' && <ClientLogin onLogin={handleClientLogin} />}
      {currentView === 'clientDashboard' && currentUser?.data && (
        <ClientDashboard 
          client={currentUser.data} 
          onModifyAppointment={handleModifyAppointment}
          onLogout={handleLogout}
        />
      )}
      {currentView === 'planningDashboard' && (
        <PlanningDashboard onLogout={handleLogout} />
      )}
      {currentView === 'adminDashboard' && (
        <AdminDashboard onLogout={handleLogout} />
      )}
      <NotificationToast notification={notification} />
    </>
  );
}

export default App;