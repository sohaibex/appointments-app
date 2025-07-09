import React from 'react';
import { Calendar, CheckCircle, Edit3 } from 'lucide-react';

const AppointmentView = ({ appointment, onModify }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Calendar className="w-6 h-6 mr-2" />
        Votre rendez-vous actuel
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-blue-100">Date</p>
          <p className="text-2xl font-bold">
            {new Date(appointment.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        <div>
          <p className="text-blue-100">Créneau</p>
          <p className="text-2xl font-bold capitalize">
            {appointment.creneau === 'matin' ? 'Matin (8h-12h)' : 'Après-midi (14h-18h)'}
          </p>
        </div>
        <div>
          <p className="text-blue-100">Statut</p>
          <p className="text-2xl font-bold capitalize flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {appointment.statut}
          </p>
        </div>
      </div>
      
      <button
        onClick={onModify}
        className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center"
      >
        <Edit3 className="w-5 h-5 mr-2" />
        Modifier mon rendez-vous
      </button>
    </div>
  );
};

export default AppointmentView;
