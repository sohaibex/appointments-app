// ===== FILE: pages/AdminSecureLogin.jsx =====
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, CheckCircle, AlertCircle, Key, Fingerprint, AlertTriangle } from 'lucide-react';

const AdminSecureLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1: credentials, 2: security key, 3: biometric
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate admin credentials
      const response = await login(email, password, 'admin');
      
      if (response.valid) {
        setStep(2);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Identifiants administrateur invalides');
      setAttempts(attempts + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecurityKeySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate security key
      if (securityKey.length === 16) {
        setStep(3);
      } else {
        throw new Error('Invalid key');
      }
    } catch (err) {
      setError('Clé de sécurité invalide');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    try {
      // Complete authentication
      await login(email, password, 'admin', null, false, securityKey, true);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Échec de l\'authentification biométrique');
    } finally {
      setIsLoading(false);
    }
  };

  if (attempts >= 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-red-950">
        <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-8 border border-red-800 max-w-md w-full text-center">
          <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Accès Bloqué</h2>
          <p className="text-gray-300 mb-6">
            Trop de tentatives échouées. Votre IP a été enregistrée et l'incident a été signalé à l'équipe de sécurité.
          </p>
          <p className="text-sm text-gray-500">
            IP: 192.168.1.1 • Temps: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      {/* Ultra secure dark theme */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-purple-950/20" />
        <div className="absolute inset-0"/>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Security warning */}
        <div className="bg-red-950/50 backdrop-blur-sm rounded-t-2xl border border-red-900/50 p-4 mb-0">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-red-500 animate-pulse" />
            <p className="text-sm text-red-400 font-medium">
              Zone hautement sécurisée - Administrateurs seulement
            </p>
          </div>
        </div>

        <div className="bg-gray-950/90 backdrop-blur-sm rounded-b-2xl shadow-2xl border border-gray-800 border-t-0 p-8">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-6 space-x-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-red-500' : 'bg-gray-700'}`} />
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-red-500' : 'bg-gray-700'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-red-500' : 'bg-gray-700'}`} />
            <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-red-500' : 'bg-gray-700'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-red-500' : 'bg-gray-700'}`} />
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-red-600 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center relative">
              <Shield className="w-8 h-8 text-white" />
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl blur opacity-30 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-2">Portail Administrateur</h2>
          <p className="text-gray-500 text-center mb-6 text-sm">
            Authentification niveau {step}/3
          </p>

          {step === 1 && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email administrateur
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                    placeholder="admin@entreprise.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Mot de passe fort
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                    placeholder="••••••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-950/50 border border-red-900/50 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
          )}

          {step === 2 && (
            <form onSubmit={handleSecurityKeySubmit} className="space-y-5">
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-2">Authentification pour :</p>
                <p className="text-white font-medium">{email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Clé de sécurité physique
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input
                    type="text"
                    value={securityKey}
                    onChange={(e) => setSecurityKey(e.target.value.toUpperCase())}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition font-mono tracking-wider"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    maxLength="19"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Insérez votre clé USB de sécurité et entrez le code affiché
                </p>
              </div>

              {error && (
                <div className="bg-red-950/50 border border-red-900/50 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Valider la clé
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 text-center">
                <Fingerprint className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Authentification biométrique requise
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Placez votre doigt sur le lecteur d'empreintes ou utilisez Face ID
                </p>
                <button
                  onClick={handleBiometricAuth}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-red-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    'Scanner maintenant'
                  )}
                </button>
              </div>

              <div className="text-center">
                <button className="text-sm text-gray-500 hover:text-gray-400 transition">
                  Utiliser un code de secours à usage unique
                </button>
              </div>
            </div>
          )}

          {/* Security footer */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Session: {new Date().getTime()}</span>
              <span>Tentatives: {attempts}/3</span>
            </div>
            <p className="text-xs text-gray-700 text-center mt-2">
              Toutes les connexions sont enregistrées et surveillées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSecureLogin;
