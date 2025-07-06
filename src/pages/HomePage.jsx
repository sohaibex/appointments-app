import React from 'react';
import { Calendar, User, Users } from 'lucide-react';
import Header from '../components/common/Header';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header userType={null} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Système de Planification de Rendez-vous
          </h1>
          <p className="text-xl text-gray-600">
            Gestion intelligente des rendez-vous pour le changement de compteurs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Accès Client */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Espace Client</h3>
              <p className="text-gray-600 mb-6">
                Consultez et modifiez votre rdv avec votre ID client ou QR code
              </p>
              <button
                onClick={() => onNavigate('clientLogin')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Accéder
              </button>
            </div>
          </div>
          
          {/* Accès Planification */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Service Planification</h3>
              <p className="text-gray-600 mb-6">
                Gérez les rendez-vous et importez les données clients
              </p>
              <button
                onClick={() => onNavigate('planningLogin')}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Connexion
              </button>
            </div>
          </div>
          
          {/* Accès Admin */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Super Admin</h3>
              <p className="text-gray-600 mb-6">
                Administration globale et validation des comptes
              </p>
              <button
                onClick={() => onNavigate('adminLogin')}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
        
        {/* Section informative */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Identifiez-vous</h4>
              <p className="text-sm text-gray-600">
                Utilisez votre ID client ou scannez votre QR code
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Consultez</h4>
              <p className="text-sm text-gray-600">
                Visualisez votre rendez-vous actuel et les créneaux disponibles
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Modifiez</h4>
              <p className="text-sm text-gray-600">
                Changez votre créneau selon vos disponibilités
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;