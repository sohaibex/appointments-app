import React, { useState } from 'react';
import { Calendar, Clock, Users, Edit3 } from 'lucide-react';
import Header from '../common/Header';
import UserManagement from './UserManagement';
import Analytics from './Analytics';

const AdminDashboard = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  
  const stats = {
    totalAppointments: 1247,
    activeUsers: 23,
    pendingApprovals: 2,
    modificationsToday: 15
  };
  
  return (
    <>
      <Header userType="admin" onLogout={onLogout} />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord Super Admin</h1>
          
          {activeView === 'dashboard' && (
            <>
              <Analytics stats={stats} />
              <UserManagement />
              
              {/* Actions rapides */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Gestion des communes</h3>
                  <p className="text-gray-600 mb-4">Configurer les communes et leurs créneaux disponibles</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                    Gérer les communes
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Logs système</h3>
                  <p className="text-gray-600 mb-4">Consulter l'historique des actions et modifications</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                    Voir les logs
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Configuration</h3>
                  <p className="text-gray-600 mb-4">Paramètres généraux de l'application</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                    Configuration
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
