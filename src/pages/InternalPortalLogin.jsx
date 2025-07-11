// ===== FILE: pages/InternalPortalLogin.jsx =====
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff, Building2, AlertTriangle, Shield, ArrowRight, CheckCircle, AlertCircle, Key } from 'lucide-react';

const InternalPortalLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // First step: validate credentials
      const response = await login(email, password, 'planning');
      
      if (response.requiresOTP) {
        setShowOTP(true);
      } else {
        navigate('/internal/dashboard');
      }
    } catch (err) {
      setError('Identifiants invalides');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Verify OTP
      await login(email, password, 'planning', otp, rememberDevice);
      navigate('/internal/dashboard');
    } catch (err) {
      setError('Code OTP invalide');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      {/* Dark, secure theme for internal users */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0" />
      </div>


      <div className="relative z-10 w-full max-w-md">
        {/* Security header */}
        <div className="bg-orange-900/20 backdrop-blur-sm rounded-t-2xl border border-orange-700/50 p-4 mb-0">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <p className="text-sm text-orange-300 font-medium">
              Portail sécurisé - Accès réservé au personnel autorisé
            </p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-b-2xl shadow-2xl border border-slate-700 border-t-0 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-2">Connexion Interne</h2>
          <p className="text-gray-400 text-center mb-6 text-sm">Service Planification</p>

          {!showOTP ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email professionnel
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                    placeholder="prenom.nom@entreprise.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Continuer
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit} className="space-y-5">
              <div className="bg-slate-900 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-300 mb-2">Code envoyé à :</p>
                <p className="text-white font-medium">{email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Code de vérification (OTP)
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition text-center text-xl tracking-wider"
                    placeholder="000000"
                    maxLength="6"
                    required
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 bg-slate-900 border border-slate-700 rounded text-orange-600 focus:ring-orange-500/20"
                />
                <span className="text-sm text-gray-300">Se souvenir de cet appareil (30 jours)</span>
              </label>

              {error && (
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Vérifier et connexion
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowOTP(false)}
                className="w-full text-gray-400 text-sm hover:text-gray-300 transition"
              >
                ← Retour à la connexion
              </button>
            </form>
          )}

          {/* Security info */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Connexion sécurisée avec authentification à double facteur</span>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">
              IP: 192.168.1.1 • Session enregistrée
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalPortalLogin;
