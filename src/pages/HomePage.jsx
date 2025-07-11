
// ===== FILE: pages/HomePage.jsx =====
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Users, Shield, ChevronRight, Clock, CheckCircle, AlertCircle, Sparkles, ArrowRight, QrCode, FileSpreadsheet, UserCheck, AlertTriangle, Building2, Fingerprint, Key } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">RDV System</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition">À propos</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
            <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition border border-white/20">
              Aide
            </button>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-300 text-sm mb-6 border border-purple-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Système de planification moderne
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Gestion des Rendez-vous<br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Changement de Compteurs
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Consultez et modifiez votre rendez-vous en toute simplicité
          </p>
        </div>

        {/* CLIENT ACCESS - Primary focus */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-300" />
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700 hover:border-blue-500/50 transition duration-300">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Espace Client</h2>
                  <p className="text-gray-300 mb-6 text-lg">
                    Accédez à votre rendez-vous personnalisé et gérez vos disponibilités
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      Consultation instantanée de votre RDV
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      Modification selon vos disponibilités
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      Notifications SMS/Email automatiques
                    </li>
                  </ul>
                  <button
                    onClick={() => navigate('/client')}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition duration-300 flex items-center group text-lg"
                  >
                    Accéder à mon rendez-vous
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition" />
                  </button>
                </div>
                <div className="hidden md:flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-2xl" />
                    <div className="relative bg-slate-900/50 rounded-2xl p-8 border border-slate-700">
                      <QrCode className="w-32 h-32 text-blue-400 mx-auto mb-4" />
                      <p className="text-center text-gray-400">Scan QR ou ID Client</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it works for clients */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Comment accéder à votre rendez-vous ?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center group hover:border-blue-500/50 transition">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">1. Identifiez-vous</h4>
              <p className="text-sm text-gray-400">Utilisez votre ID client ou scannez le QR code reçu</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center group hover:border-purple-500/50 transition">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">2. Consultez</h4>
              <p className="text-sm text-gray-400">Visualisez votre créneau actuel et les disponibilités</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center group hover:border-pink-500/50 transition">
              <div className="bg-gradient-to-r from-pink-600 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <UserCheck className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">3. Confirmez</h4>
              <p className="text-sm text-gray-400">Modifiez si besoin et recevez la confirmation</p>
            </div>
          </div>
        </div>

        {/* INTERNAL ACCESS - Separated section with warning */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-8 border border-red-700/50 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-red-600/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-400 mb-2">Accès réservé au personnel interne</h3>
                <p className="text-gray-300">
                  Les sections ci-dessous sont strictement réservées aux employés autorisés. 
                  Toute tentative d'accès non autorisé sera enregistrée et signalée.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Planning Service - Internal */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 opacity-75">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-slate-700 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-xs text-orange-400 bg-orange-900/20 px-3 py-1 rounded-full border border-orange-700/50">
                  Personnel uniquement
                </span>
              </div>
              <h4 className="text-lg font-semibold text-gray-300 mb-2">Service Planification</h4>
              <p className="text-sm text-gray-500 mb-4">
                Gestion des rendez-vous et import de données
              </p>
              <button
                onClick={() => navigate('/internal/portal')}
                className="w-full bg-slate-700 text-gray-300 py-2 rounded-lg text-sm hover:bg-slate-600 transition flex items-center justify-center"
              >
                <Key className="w-4 h-4 mr-2" />
                Accès sécurisé interne
              </button>
            </div>

            {/* Admin - Internal */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 opacity-75">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-slate-700 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-xs text-red-400 bg-red-900/20 px-3 py-1 rounded-full border border-red-700/50">
                  Accès restreint
                </span>
              </div>
              <h4 className="text-lg font-semibold text-gray-300 mb-2">Administration</h4>
              <p className="text-sm text-gray-500 mb-4">
                Gestion complète du système et des accès
              </p>
              <button
                onClick={() => navigate('/admin/secure-login')}
                className="w-full bg-slate-700 text-gray-300 py-2 rounded-lg text-sm hover:bg-slate-600 transition flex items-center justify-center"
              >
                <Fingerprint className="w-4 h-4 mr-2" />
                Portail administrateur
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
