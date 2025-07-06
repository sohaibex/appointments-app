import React from 'react';
import { Calendar, Clock, Users, Edit3 } from 'lucide-react';

const Analytics = ({ stats }) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total RDV</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
          </div>
          <Calendar className="w-12 h-12 text-blue-600" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Utilisateurs actifs</p>
            <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
          </div>
          <Users className="w-12 h-12 text-green-600" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">En attente</p>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingApprovals}</p>
          </div>
          <Clock className="w-12 h-12 text-orange-600" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Modifications jour</p>
            <p className="text-3xl font-bold text-gray-900">{stats.modificationsToday}</p>
          </div>
          <Edit3 className="w-12 h-12 text-purple-600" />
        </div>
      </div>
    </div>
  );
};

export default Analytics;