
// ===== FILE: pages/ClientLogin.jsx =====
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, AlertCircle, QrCode } from 'lucide-react';

const ClientLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('id'); // 'id' or 'qr'
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (clientId.length >= 6) {
        // Mock client data
        const mockClient = {
          id: clientId,
          nom: 'Dupont',
          prenom: 'Jean',
          adresse: '123 Rue de la Paix, 75001 Paris',
          telephone: '01 23 45 67 89',
          email: 'jean.dupont@email.com',
          rdv: {
            date: '2025-07-15',
            creneau: '14:00-16:00',
            statut: 'confirmé'
          }
        };
        
        onLogin(mockClient);
        navigate('/client/dashboard');
      } else {
        setError('ID client invalide. Vérifiez votre courrier.');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Light, friendly background for clients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Accès Client</h2>
          <p className="text-gray-600 text-center mb-8">Consultez votre rendez-vous</p>

          {/* Login method selector */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => setLoginMethod('id')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                loginMethod === 'id'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ID Client
            </button>
            <button
              onClick={() => setLoginMethod('qr')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                loginMethod === 'qr'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              QR Code
            </button>
          </div>

          {loginMethod === 'id' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre identifiant client
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value.toUpperCase())}
                    className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    placeholder="Ex: ABC123"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Vous trouverez cet identifiant dans le courrier que vous avez reçu
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Accéder à mon rendez-vous
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-xl p-8 mb-4">
                <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Scanner en cours...</p>
              </div>
              <p className="text-sm text-gray-500">
                Présentez le QR code reçu par courrier devant la caméra
              </p>
            </div>
          )}

          {/* Help section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Besoin d'aide ?</p>
              <div className="flex justify-center space-x-4 text-sm">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  ID perdu ?
                </a>
                <span className="text-gray-300">•</span>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contactez-nous
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
