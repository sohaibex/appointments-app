import React, { useState, useEffect } from 'react';
import { User, MapPin, Calendar, Clock, Users, Hash, Save, AlertCircle, CheckCircle, X, ChevronDown, ChevronUp, Settings, Droplets, Phone, Mail } from 'lucide-react';

const ManualEntry = ({ onSave, onCancel, isEditMode = false, appointment = null }) => {
  const [formData, setFormData] = useState({
    // Core required fields
    referenceClient: '',
    nom: '',
    prenom: '',
    adresseBranchement: '',
    communeBranchement: '',
    date: '',
    agent: '',
    creneau: '',
    
    // Extended fields
    nomReservoir: '',
    intituleLot: '',
    statutLot: 'A traiter',
    referenceContratPartenaire: '',
    referencePF: '',
    referenceBranchementGeneral: '',
    typeCompteur: 'Individuel',
    nRue: '',
    statutAppairage: '',
    matriculeCompteur: '',
    numeroCompteur: '',
    marqueCompteur: '',
    modeleCompteur: '',
    diametreCompteur: '',
    domaineCompteur: '',
    impossibiliteTechnique: 'NON',
    dateSaisieImpossibilite: '',
    motifImpossibilite: '',
    civilite: '',
    adresseCorrespondancePrecision: '',
    adresseCorrespondanceComplement: '',
    adresseCorrespondanceVoie: '',
    adresseCorrespondanceLieuDit: '',
    adresseCorrespondanceCodePostal: '',
    adresseCorrespondanceLocalite: '',
    adresseCorrespondanceCedex: '',
    adresseCorrespondancePays: 'France',
    telephoneFixe: '',
    telephonePortable: '',
    email: '',
    name: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    addressPostalcode: '',
    addressCity: '',
    addressCountry: '',
    variablesRef: '',
    variablesBranch: '',
    variablesDate: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  // Initialize form data when in edit mode
  useEffect(() => {
    if (isEditMode && appointment) {
      const initialData = {
        // Core required fields
        referenceClient: appointment.referenceClient || '',
        nom: appointment.nom || '',
        prenom: appointment.prenom || '',
        adresseBranchement: appointment.adresseBranchement || '',
        communeBranchement: appointment.communeBranchement || '',
        date: appointment.date || '',
        agent: appointment.agent || '',
        creneau: appointment.creneau || '',
        
        // Extended fields
        nomReservoir: appointment.nomReservoir || '',
        intituleLot: appointment.intituleLot || '',
        statutLot: appointment.statutLot || 'A traiter',
        referenceContratPartenaire: appointment.referenceContratPartenaire || '',
        referencePF: appointment.referencePF || '',
        referenceBranchementGeneral: appointment.referenceBranchementGeneral || '',
        typeCompteur: appointment.typeCompteur || 'Individuel',
        nRue: appointment.nRue || '',
        statutAppairage: appointment.statutAppairage || '',
        matriculeCompteur: appointment.matriculeCompteur || '',
        numeroCompteur: appointment.numeroCompteur || '',
        marqueCompteur: appointment.marqueCompteur || '',
        modeleCompteur: appointment.modeleCompteur || '',
        diametreCompteur: appointment.diametreCompteur || '',
        domaineCompteur: appointment.domaineCompteur || '',
        impossibiliteTechnique: appointment.impossibiliteTechnique || 'NON',
        dateSaisieImpossibilite: appointment.dateSaisieImpossibilite || '',
        motifImpossibilite: appointment.motifImpossibilite || '',
        civilite: appointment.civilite || '',
        adresseCorrespondancePrecision: appointment.adresseCorrespondancePrecision || '',
        adresseCorrespondanceComplement: appointment.adresseCorrespondanceComplement || '',
        adresseCorrespondanceVoie: appointment.adresseCorrespondanceVoie || '',
        adresseCorrespondanceLieuDit: appointment.adresseCorrespondanceLieuDit || '',
        adresseCorrespondanceCodePostal: appointment.adresseCorrespondanceCodePostal || '',
        adresseCorrespondanceLocalite: appointment.adresseCorrespondanceLocalite || '',
        adresseCorrespondanceCedex: appointment.adresseCorrespondanceCedex || '',
        adresseCorrespondancePays: appointment.adresseCorrespondancePays || 'France',
        telephoneFixe: appointment.telephoneFixe || '',
        telephonePortable: appointment.telephonePortable || '',
        email: appointment.email || '',
        name: appointment.name || '',
        addressLine1: appointment.addressLine1 || '',
        addressLine2: appointment.addressLine2 || '',
        addressLine3: appointment.addressLine3 || '',
        addressPostalcode: appointment.addressPostalcode || '',
        addressCity: appointment.addressCity || '',
        addressCountry: appointment.addressCountry || '',
        variablesRef: appointment.variablesRef || '',
        variablesBranch: appointment.variablesBranch || '',
        variablesDate: appointment.variablesDate || ''
      };
      
      setFormData(initialData);
      
      // Show advanced fields if any advanced data is present
      const hasAdvancedData = Object.values(initialData).some(value => 
        value && !['referenceClient', 'nom', 'prenom', 'adresseBranchement', 'communeBranchement', 'date', 'agent', 'creneau'].includes(value)
      );
      if (hasAdvancedData) {
        setShowAdvancedFields(true);
      }
    }
  }, [isEditMode, appointment]);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    // Référence Client validation
    if (!formData.referenceClient.trim()) {
      newErrors.referenceClient = 'La référence client est obligatoire';
    } else if (!/^\d{8,}$/.test(formData.referenceClient.trim())) {
      newErrors.referenceClient = 'La référence doit contenir au moins 8 chiffres';
    }

    // Nom validation
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    // Prénom validation
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est obligatoire';
    } else if (formData.prenom.trim().length < 2) {
      newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    // Adresse validation
    if (!formData.adresseBranchement.trim()) {
      newErrors.adresseBranchement = 'L\'adresse de branchement est obligatoire';
    } else if (formData.adresseBranchement.trim().length < 5) {
      newErrors.adresseBranchement = 'L\'adresse doit contenir au moins 5 caractères';
    }

    // Commune validation
    if (!formData.communeBranchement.trim()) {
      newErrors.communeBranchement = 'La commune de branchement est obligatoire';
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = 'La date est obligatoire';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'La date ne peut pas être dans le passé';
      }
    }

    // Agent validation
    if (!formData.agent.trim()) {
      newErrors.agent = 'L\'agent est obligatoire';
    }

    // Créneau validation
    if (!formData.creneau.trim()) {
      newErrors.creneau = 'Le créneau est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Transform data to match the imported data structure
      const dataToSave = {
        "Nom Réservoir": formData.nomReservoir,
        "Intitulé du Lot": formData.intituleLot,
        "Statut du Lot": formData.statutLot,
        "Référence Contrat Partenaire": formData.referenceContratPartenaire,
        "Référence PF": formData.referencePF,
        "Référence branchement général": formData.referenceBranchementGeneral,
        "Type compteur": formData.typeCompteur,
        "N de rue": formData.nRue,
        "Adresse branchement": formData.adresseBranchement.toUpperCase(),
        "Commune branchement": formData.communeBranchement.toUpperCase(),
        "DATE": formData.date,
        "AGENT": formData.agent,
        "Statut appairage": formData.statutAppairage,
        "Matricule compteur": formData.matriculeCompteur,
        "Numéro compteur": formData.numeroCompteur,
        "Marque compteur": formData.marqueCompteur,
        "Modele compteur": formData.modeleCompteur,
        "Diamètre compteur": formData.diametreCompteur,
        "Domaine compteur": formData.domaineCompteur,
        "Impossibilité Technique de Renouvellement": formData.impossibiliteTechnique,
        "Date Saisie Impossibilite Technique de Renouvellement": formData.dateSaisieImpossibilite,
        "Motif Impossibilite Technique de Renouvellement": formData.motifImpossibilite,
        "Référence Client": formData.referenceClient,
        "Civilité": formData.civilite,
        "Nom Client": formData.nom.toUpperCase(),
        "Prénom Client": formData.prenom.toUpperCase(),
        "Adresse Correspondance Précision": formData.adresseCorrespondancePrecision,
        "Adresse Correspondance Complément": formData.adresseCorrespondanceComplement,
        "Adresse Correspondance Voie": formData.adresseCorrespondanceVoie,
        "Adresse Correspondance Lieu Dit ou Service Particulier": formData.adresseCorrespondanceLieuDit,
        "Adresse Correspondance Code Postal": formData.adresseCorrespondanceCodePostal,
        "Adresse Correspondance Localité": formData.adresseCorrespondanceLocalite,
        "Adresse Correspondance Cedex": formData.adresseCorrespondanceCedex,
        "Adresse Correspondance Pays": formData.adresseCorrespondancePays,
        "Téléphone Fixe": formData.telephoneFixe,
        "Téléphone Portable": formData.telephonePortable,
        "Email": formData.email,
        "name": formData.name,
        "address_line1": formData.addressLine1,
        "address_line2": formData.addressLine2,
        "address_line3": formData.addressLine3,
        "address_postalcode": formData.addressPostalcode,
        "address_city": formData.addressCity,
        "address_country": formData.addressCountry,
        "variables.ref": formData.variablesRef,
        "variables.branch": formData.variablesBranch,
        "variables.date": formData.variablesDate,
        "CRENEAU": formData.creneau
      };

      if (onSave && typeof onSave === 'function') {
        onSave(dataToSave);
      }

      setShowSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          // Core required fields
          referenceClient: '',
          nom: '',
          prenom: '',
          adresseBranchement: '',
          communeBranchement: '',
          date: '',
          agent: '',
          creneau: '',
          
          // Extended fields
          nomReservoir: '',
          intituleLot: '',
          statutLot: 'A traiter',
          referenceContratPartenaire: '',
          referencePF: '',
          referenceBranchementGeneral: '',
          typeCompteur: 'Individuel',
          nRue: '',
          statutAppairage: '',
          matriculeCompteur: '',
          numeroCompteur: '',
          marqueCompteur: '',
          modeleCompteur: '',
          diametreCompteur: '',
          domaineCompteur: '',
          impossibiliteTechnique: 'NON',
          dateSaisieImpossibilite: '',
          motifImpossibilite: '',
          civilite: '',
          adresseCorrespondancePrecision: '',
          adresseCorrespondanceComplement: '',
          adresseCorrespondanceVoie: '',
          adresseCorrespondanceLieuDit: '',
          adresseCorrespondanceCodePostal: '',
          adresseCorrespondanceLocalite: '',
          adresseCorrespondanceCedex: '',
          adresseCorrespondancePays: 'France',
          telephoneFixe: '',
          telephonePortable: '',
          email: '',
          name: '',
          addressLine1: '',
          addressLine2: '',
          addressLine3: '',
          addressPostalcode: '',
          addressCity: '',
          addressCountry: '',
          variablesRef: '',
          variablesBranch: '',
          variablesDate: ''
        });
        setShowSuccess(false);
        // Only reset advanced fields visibility for new entries
        if (!isEditMode) {
          setShowAdvancedFields(false);
        }
      }, 2000);

    } catch (error) {
      console.error('Error saving data:', error);
      setErrors({ submit: 'Une erreur est survenue lors de la sauvegarde' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      // Core required fields
      referenceClient: '',
      nom: '',
      prenom: '',
      adresseBranchement: '',
      communeBranchement: '',
      date: '',
      agent: '',
      creneau: '',
      
      // Extended fields
      nomReservoir: '',
      intituleLot: '',
      statutLot: 'A traiter',
      referenceContratPartenaire: '',
      referencePF: '',
      referenceBranchementGeneral: '',
      typeCompteur: 'Individuel',
      nRue: '',
      statutAppairage: '',
      matriculeCompteur: '',
      numeroCompteur: '',
      marqueCompteur: '',
      modeleCompteur: '',
      diametreCompteur: '',
      domaineCompteur: '',
      impossibiliteTechnique: 'NON',
      dateSaisieImpossibilite: '',
      motifImpossibilite: '',
      civilite: '',
      adresseCorrespondancePrecision: '',
      adresseCorrespondanceComplement: '',
      adresseCorrespondanceVoie: '',
      adresseCorrespondanceLieuDit: '',
      adresseCorrespondanceCodePostal: '',
      adresseCorrespondanceLocalite: '',
      adresseCorrespondanceCedex: '',
      adresseCorrespondancePays: 'France',
      telephoneFixe: '',
      telephonePortable: '',
      email: '',
      name: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      addressPostalcode: '',
      addressCity: '',
      addressCountry: '',
      variablesRef: '',
      variablesBranch: '',
      variablesDate: ''
    });
    setErrors({});
    setShowSuccess(false);
  };

  // Input component with icon and validation
  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    icon: Icon, 
    placeholder, 
    required = true,
    options = null 
  }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        
        {options ? (
          <select
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors[name] 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          >
            <option value="">{placeholder}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors[name] 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
        )}
      </div>
      {errors[name] && (
        <div className="flex items-center mt-1 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors[name]}
        </div>
      )}
    </div>
  );

  // Créneau options
  const creneauOptions = [
    { value: '08:00-10:00', label: '08:00 - 10:00' },
    { value: '10:00-12:00', label: '10:00 - 12:00' },
    { value: '14:00-16:00', label: '14:00 - 16:00' },
    { value: '16:00-18:00', label: '16:00 - 18:00' }
  ];

  // Agent options (you can populate this from your database later)
  const agentOptions = [
    { value: 'AGENT001', label: 'Agent Martin' },
    { value: 'AGENT002', label: 'Agent Dubois' },
    { value: 'AGENT003', label: 'Agent Bernard' },
    { value: 'AGENT004', label: 'Agent Petit' }
  ];

  // Additional dropdown options
  const civiliteOptions = [
    { value: 'M', label: 'Monsieur' },
    { value: 'MME', label: 'Madame' },
    { value: 'MLLE', label: 'Mademoiselle' }
  ];

  const statutLotOptions = [
    { value: 'A traiter', label: 'A traiter' },
    { value: 'En cours', label: 'En cours' },
    { value: 'Terminé', label: 'Terminé' },
    { value: 'Annulé', label: 'Annulé' }
  ];

  const typeCompteurOptions = [
    { value: 'Individuel', label: 'Individuel' },
    { value: 'Collectif', label: 'Collectif' },
    { value: 'Divisionnaire', label: 'Divisionnaire' }
  ];

  const marqueCompteurOptions = [
    { value: 'ITRON', label: 'ITRON' },
    { value: 'SENSUS', label: 'SENSUS' },
    { value: 'DIEHL', label: 'DIEHL' },
    { value: 'SAGEMCOM', label: 'SAGEMCOM' }
  ];

  const impossibiliteOptions = [
    { value: 'NON', label: 'Non' },
    { value: 'OUI', label: 'Oui' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto relative">
      {/* Close Button */}
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        title="Fermer"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Header */}
      <div className="mb-8 pr-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {isEditMode ? 'Modifier le Rendez-vous' : 'Saisie Manuelle'}
        </h2>
        <p className="text-gray-600">
          {isEditMode 
            ? 'Modifiez les informations du rendez-vous existant' 
            : 'Ajoutez manuellement les informations client et de rendez-vous'
          }
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-green-800 font-medium">
            {isEditMode ? 'Rendez-vous modifié avec succès !' : 'Données sauvegardées avec succès !'}
          </span>
        </div>
      )}

      {/* Submit Error */}
      {errors.submit && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
          <span className="text-red-800">{errors.submit}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Advanced Fields Toggle */}
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
          <div className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-600" />
            <span className="font-medium text-gray-700">Champs avancés</span>
            <span className="ml-2 text-sm text-gray-500">
              ({showAdvancedFields ? 'Affichés' : 'Masqués'})
            </span>
          </div>
          <button
            onClick={() => setShowAdvancedFields(!showAdvancedFields)}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            {showAdvancedFields ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Masquer
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Afficher
              </>
            )}
          </button>
        </div>

        {/* Reservoir/Lot Information Section - Advanced */}
        {showAdvancedFields && (
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-blue-600" />
              Informations Réservoir / Lot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Nom Réservoir"
                name="nomReservoir"
                icon={Droplets}
                placeholder="Ex: Année 2025 - 950400/01 SIECCAO Eau Potable"
                required={false}
              />
              <InputField
                label="Intitulé du Lot"
                name="intituleLot"
                icon={MapPin}
                placeholder="Ex: Communes (LUZARCHES)"
                required={false}
              />
              <InputField
                label="Statut du Lot"
                name="statutLot"
                icon={Settings}
                placeholder="Sélectionner un statut"
                required={false}
                options={statutLotOptions}
              />
              <InputField
                label="Référence Contrat Partenaire"
                name="referenceContratPartenaire"
                icon={Hash}
                placeholder="Ex: 950400/01"
                required={false}
              />
              <InputField
                label="Référence PF"
                name="referencePF"
                icon={Hash}
                placeholder="Ex: 10175506001"
                required={false}
              />
              <InputField
                label="Référence branchement général"
                name="referenceBranchementGeneral"
                icon={Hash}
                placeholder=""
                required={false}
              />
            </div>
          </div>
        )}

        {/* Client Information Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Informations Client
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField
              label="Référence Client"
              name="referenceClient"
              icon={Hash}
              placeholder="Ex: 10617068"
            />
            {showAdvancedFields && (
              <InputField
                label="Civilité"
                name="civilite"
                icon={User}
                placeholder="Sélectionner civilité"
                required={false}
                options={civiliteOptions}
              />
            )}
            <InputField
              label="Nom"
              name="nom"
              icon={User}
              placeholder="Ex: ARRIGONI"
            />
            <InputField
              label="Prénom"
              name="prenom"
              icon={User}
              placeholder="Ex: PATRICE"
            />
          </div>
        </div>

        {/* Address Information Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-green-600" />
            Adresse de Branchement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showAdvancedFields && (
              <InputField
                label="N° de rue"
                name="nRue"
                icon={Hash}
                placeholder="Ex: 26"
                required={false}
              />
            )}
            <InputField
              label="Adresse de Branchement"
              name="adresseBranchement"
              icon={MapPin}
              placeholder="Ex: 26 RUE CHARLES DE GAULLE APPT 3"
            />
            <InputField
              label="Commune de Branchement"
              name="communeBranchement"
              icon={MapPin}
              placeholder="Ex: LUZARCHES"
            />
          </div>
        </div>

        {/* Correspondence Address Section - Advanced */}
        {showAdvancedFields && (
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Adresse de Correspondance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Précision"
                name="adresseCorrespondancePrecision"
                icon={MapPin}
                placeholder=""
                required={false}
              />
              <InputField
                label="Complément"
                name="adresseCorrespondanceComplement"
                icon={MapPin}
                placeholder=""
                required={false}
              />
              <InputField
                label="Voie"
                name="adresseCorrespondanceVoie"
                icon={MapPin}
                placeholder="Ex: 33 RUE CHARLES DE GAULLE"
                required={false}
              />
              <InputField
                label="Lieu Dit ou Service Particulier"
                name="adresseCorrespondanceLieuDit"
                icon={MapPin}
                placeholder=""
                required={false}
              />
              <InputField
                label="Code Postal"
                name="adresseCorrespondanceCodePostal"
                icon={Hash}
                placeholder="Ex: 95270"
                required={false}
              />
              <InputField
                label="Localité"
                name="adresseCorrespondanceLocalite"
                icon={MapPin}
                placeholder="Ex: LUZARCHES"
                required={false}
              />
              <InputField
                label="Cedex"
                name="adresseCorrespondanceCedex"
                icon={MapPin}
                placeholder=""
                required={false}
              />
              <InputField
                label="Pays"
                name="adresseCorrespondancePays"
                icon={MapPin}
                placeholder="Ex: France"
                required={false}
              />
            </div>
          </div>
        )}

        {/* Contact Information Section - Advanced */}
        {showAdvancedFields && (
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-yellow-600" />
              Informations de Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Téléphone Fixe"
                name="telephoneFixe"
                icon={Phone}
                placeholder="Ex: 134710315"
                required={false}
              />
              <InputField
                label="Téléphone Portable"
                name="telephonePortable"
                icon={Phone}
                placeholder=""
                required={false}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                icon={Mail}
                placeholder="Ex: email@example.com"
                required={false}
              />
            </div>
          </div>
        )}

        {/* Counter Information Section - Advanced */}
        {showAdvancedFields && (
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-purple-600" />
              Informations Compteur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Type compteur"
                name="typeCompteur"
                icon={Settings}
                placeholder="Sélectionner un type"
                required={false}
                options={typeCompteurOptions}
              />
              <InputField
                label="Matricule compteur"
                name="matriculeCompteur"
                icon={Hash}
                placeholder="Ex: I21JA048162Y"
                required={false}
              />
              <InputField
                label="Numéro compteur"
                name="numeroCompteur"
                icon={Hash}
                placeholder="Ex: 48162"
                required={false}
              />
              <InputField
                label="Marque compteur"
                name="marqueCompteur"
                icon={Settings}
                placeholder="Sélectionner une marque"
                required={false}
                options={marqueCompteurOptions}
              />
              <InputField
                label="Modèle compteur"
                name="modeleCompteur"
                icon={Settings}
                placeholder="Ex: AQUADIS + MID"
                required={false}
              />
              <InputField
                label="Diamètre compteur"
                name="diametreCompteur"
                icon={Settings}
                placeholder="Ex: 015 mm"
                required={false}
              />
              <InputField
                label="Domaine compteur"
                name="domaineCompteur"
                icon={Settings}
                placeholder="Ex: Compteur sur domaine privé accessible avec obstacle"
                required={false}
              />
              <InputField
                label="Statut appairage"
                name="statutAppairage"
                icon={Settings}
                placeholder=""
                required={false}
              />
            </div>
          </div>
        )}

        {/* Technical Information Section - Advanced */}
        {showAdvancedFields && (
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
              Informations Techniques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Impossibilité Technique de Renouvellement"
                name="impossibiliteTechnique"
                icon={AlertCircle}
                placeholder="Sélectionner une option"
                required={false}
                options={impossibiliteOptions}
              />
              <InputField
                label="Date Saisie Impossibilité Technique"
                name="dateSaisieImpossibilite"
                type="date"
                icon={Calendar}
                placeholder=""
                required={false}
              />
              <InputField
                label="Motif Impossibilité Technique"
                name="motifImpossibilite"
                icon={AlertCircle}
                placeholder=""
                required={false}
              />
            </div>
          </div>
        )}

        {/* Additional Variables Section - Advanced */}
        {showAdvancedFields && (
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Hash className="h-5 w-5 mr-2 text-indigo-600" />
              Variables Additionnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Name"
                name="name"
                icon={User}
                placeholder="Ex: M ARRIGONI PATRICE"
                required={false}
              />
              <InputField
                label="Address Line 1"
                name="addressLine1"
                icon={MapPin}
                placeholder="Ex: 33 RUE CHARLES DE GAULLE"
                required={false}
              />
              <InputField
                label="Address Line 2"
                name="addressLine2"
                icon={MapPin}
                placeholder=""
                required={false}
              />
              <InputField
                label="Address Line 3"
                name="addressLine3"
                icon={MapPin}
                placeholder=""
                required={false}
              />
              <InputField
                label="Address Postal Code"
                name="addressPostalcode"
                icon={Hash}
                placeholder="Ex: 95270"
                required={false}
              />
              <InputField
                label="Address City"
                name="addressCity"
                icon={MapPin}
                placeholder="Ex: LUZARCHES"
                required={false}
              />
              <InputField
                label="Address Country"
                name="addressCountry"
                icon={MapPin}
                placeholder=""
                required={false}
              />
              <InputField
                label="Variables Ref"
                name="variablesRef"
                icon={Hash}
                placeholder="Ex: 10617068"
                required={false}
              />
              <InputField
                label="Variables Branch"
                name="variablesBranch"
                icon={MapPin}
                placeholder="Ex: 26 RUE CHARLES DE GAULLE APPT 003 LUZARCHES"
                required={false}
              />
              <InputField
                label="Variables Date"
                name="variablesDate"
                icon={Calendar}
                placeholder=""
                required={false}
              />
            </div>
          </div>
        )}

        {/* Appointment Information Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            Informations Rendez-vous
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField
              label="Date"
              name="date"
              type="date"
              icon={Calendar}
              placeholder=""
            />
            <InputField
              label="Agent"
              name="agent"
              icon={Users}
              placeholder="Sélectionner un agent"
              options={agentOptions}
            />
            <InputField
              label="Créneau"
              name="creneau"
              icon={Clock}
              placeholder="Sélectionner un créneau"
              options={creneauOptions}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isEditMode ? 'Modification en cours...' : 'Sauvegarde en cours...'}
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                {isEditMode ? 'Modifier' : 'Sauvegarder'}
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <X className="h-5 w-5 mr-2" />
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Informations importantes :</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Les champs obligatoires sont marqués d'un astérisque (*)</li>
          <li>• La référence client doit contenir au moins 8 chiffres</li>
          <li>• La date ne peut pas être dans le passé</li>
          <li>• Les données seront automatiquement formatées avant sauvegarde</li>
          <li>• Utilisez le bouton "Champs avancés" pour afficher/masquer les champs optionnels</li>
          <li>• Les champs avancés permettent une saisie complète selon le format d'import Excel</li>
        </ul>
      </div>
    </div>
  );
};

export default ManualEntry;