import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, Check } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale';

const TimeSlotSelector = ({ availableSlots, onSelect, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCreneau, setSelectedCreneau] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Obtenir les dates disponibles pour le date picker
  const availableDates = availableSlots
    .filter(slot => slot.matin || slot.apresMidi)
    .map(slot => new Date(slot.date));
  
  // Vérifier si une date est disponible
  const isDateAvailable = (date) => {
    const dateStr = date.toLocaleDateString('fr-CA');
    const slot = availableSlots.find(s => s.date === dateStr);
    return slot && (slot.matin || slot.apresMidi);
  };
  
  // Obtenir la date minimum (demain)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };
  
  // Obtenir la date maximum (30 jours)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate;
  };
  
  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedDate) {
      newErrors.date = 'Veuillez sélectionner une date';
    }
    
    if (!selectedCreneau) {
      newErrors.creneau = 'Veuillez sélectionner un créneau horaire';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Gérer la sélection de date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedCreneau(''); // Réinitialiser le créneau
    setErrors({ ...errors, date: '' });
  };
  
  // Gérer la sélection de créneau
  const handleCreneauSelect = (creneau) => {
    setSelectedCreneau(creneau);
    setErrors({ ...errors, creneau: '' });
  };
  
  // Confirmer la sélection
  const handleConfirm = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simuler un délai d'envoi
      setTimeout(() => {
      const dateStr = selectedDate.toLocaleDateString('fr-CA');
        onSelect(dateStr, selectedCreneau);
      setIsSubmitting(false);
    }, 500);
  };
  
  // Obtenir les créneaux disponibles pour la date sélectionnée
  const getAvailableCreneaux = () => {
    if (!selectedDate) return { matin: false, apresMidi: false };
    
    const dateStr = selectedDate.toLocaleDateString('fr-CA');
    const slot = availableSlots.find(s => s.date === dateStr);
    
    return {
      matin: slot?.matin || false,
      apresMidi: slot?.apresMidi || false
    };
  };
  
  const { matin: matinDispo, apresMidi: apresMidiDispo } = getAvailableCreneaux();
  
  // Custom input pour le date picker
  const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        className={`w-full px-4 py-3 pr-10 border rounded-lg cursor-pointer transition-all ${
          errors.date 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-blue-500'
        } focus:ring-2 focus:border-transparent`}
      />
      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  ));
  
  // Ajouter les styles inline pour le datepicker
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-datepicker-wrapper .react-datepicker-popper {
        position: absolute !important;
        inset: auto !important;
        transform: none !important;
        top: 100% !important;
        left: 0 !important;
        margin-top: 4px !important;
      }
      
      .custom-datepicker-wrapper .react-datepicker {
        font-family: inherit;
        border-radius: 0.75rem;
        border: 1px solid #e5e7eb;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      
      .custom-datepicker-wrapper .react-datepicker__header {
        background-color: #3b82f6;
        border-bottom: none;
        padding-top: 0.75rem;
        border-radius: 0.75rem 0.75rem 0 0;
      }
      
      .custom-datepicker-wrapper .react-datepicker__current-month {
        color: white;
        font-weight: 600;
      }
      
      .custom-datepicker-wrapper .react-datepicker__day-name {
        color: #dbeafe;
      }
      
      .custom-datepicker-wrapper .react-datepicker__day--selected {
        background-color: #3b82f6;
        color: white;
      }
      
      .custom-datepicker-wrapper .react-datepicker__day--disabled {
        color: #d1d5db;
        cursor: not-allowed;
      }
      
      .custom-datepicker-wrapper .react-datepicker__navigation-icon::before {
        border-color: white;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-600" />
          Sélectionner un nouveau créneau
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Choisissez une date et un horaire pour votre rendez-vous
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Sélection de la date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date du rendez-vous <span className="text-red-500">*</span>
          </label>
          <div className="relative custom-datepicker-wrapper">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={getMinDate()}
              maxDate={getMaxDate()}
              filterDate={isDateAvailable}
              locale={fr}
              dateFormat="dd MMMM yyyy"
              placeholderText="Cliquez pour sélectionner une date"
              customInput={<CustomDateInput />}
              calendarStartDay={1}
              showPopperArrow={false}
              popperClassName="custom-datepicker-popper"
              wrapperClassName="w-full"
            />
          </div>
          {errors.date && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.date}
            </p>
          )}
        </div>
        
        {/* Sélection du créneau horaire */}
        {selectedDate && (
          <div className="animate-slideDown">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Créneau horaire <span className="text-red-500">*</span>
            </label>
            
            {!matinDispo && !apresMidiDispo ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Aucun créneau disponible pour cette date
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {matinDispo && (
                  <button
                    onClick={() => handleCreneauSelect('matin')}
                    className={`relative p-6 rounded-lg border-2 transition-all transform hover:scale-105 ${
                      selectedCreneau === 'matin'
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    {selectedCreneau === 'matin' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    <Clock className={`w-8 h-8 mx-auto mb-3 ${
                      selectedCreneau === 'matin' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className="font-semibold text-lg mb-1">Matin</p>
                    <p className="text-sm text-gray-600">8h00 - 12h00</p>
                  </button>
                )}
                
                {apresMidiDispo && (
                  <button
                    onClick={() => handleCreneauSelect('apres-midi')}
                    className={`relative p-6 rounded-lg border-2 transition-all transform hover:scale-105 ${
                      selectedCreneau === 'apres-midi'
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    {selectedCreneau === 'apres-midi' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    <Clock className={`w-8 h-8 mx-auto mb-3 ${
                      selectedCreneau === 'apres-midi' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className="font-semibold text-lg mb-1">Après-midi</p>
                    <p className="text-sm text-gray-600">14h00 - 18h00</p>
                  </button>
                )}
              </div>
            )}
            
            {errors.creneau && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.creneau}
              </p>
            )}
          </div>
        )}
        
        {/* Résumé de la sélection */}
        {selectedDate && selectedCreneau && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900">Votre sélection :</p>
            <p className="text-blue-800 mt-1">
              {selectedDate.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} - {selectedCreneau === 'matin' ? 'Matin (8h-12h)' : 'Après-midi (14h-18h)'}
            </p>
          </div>
        )}
        
        {/* Boutons d'action */}
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedCreneau || isSubmitting}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all transform ${
              isSubmitting || !selectedDate || !selectedCreneau
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Confirmation...
              </span>
            ) : (
              'Confirmer la modification'
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all transform hover:shadow-md active:scale-95"
          >
            Annuler
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TimeSlotSelector;
