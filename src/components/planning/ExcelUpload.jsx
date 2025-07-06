import React, { useState } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';

const ExcelUpload = ({ onImport, debug = false }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]);
  const [importedData, setImportedData] = useState([]);

  const addDebugInfo = (message) => {
    if (debug) {
      setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    }
    console.log(message);
  };

  // Function to read Excel file
  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          addDebugInfo('File loaded, processing...');
          const data = new Uint8Array(e.target.result);
          
          // Check if XLSX is available
          if (!window.XLSX) {
            throw new Error('XLSX library not loaded');
          }
          
          const workbook = window.XLSX.read(data, { type: 'array' });
          addDebugInfo(`Workbook created, sheets: ${workbook.SheetNames.join(', ')}`);
          
          // Check if workbook has sheets
          if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            throw new Error('Le fichier Excel ne contient aucune feuille de calcul');
          }
          
          // Get first worksheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          addDebugInfo(`Using sheet: ${firstSheetName}`);
          
          // Convert to JSON with better options
          const jsonData = window.XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,
            defval: '',
            blankrows: false
          });
          
          addDebugInfo(`Raw JSON data: ${jsonData.length} rows`);
          
          if (!jsonData || jsonData.length === 0) {
            throw new Error('Le fichier Excel est vide');
          }
          
          // Process data (assuming first row is header)
          const headers = jsonData[0];
          if (!headers || headers.length === 0) {
            throw new Error('Aucun en-tête trouvé dans le fichier');
          }
          
          addDebugInfo(`Headers found: ${headers.join(', ')}`);
          const rows = jsonData.slice(1).filter(row => row && row.some(cell => cell !== '' && cell != null));
          
          if (rows.length === 0) {
            throw new Error('Aucune donnée trouvée après les en-têtes');
          }
          
          const processedData = rows.map((row, index) => {
            const obj = {};
            headers.forEach((header, headerIndex) => {
              if (header) {
                const value = row[headerIndex];
                obj[String(header).trim()] = value !== undefined && value !== null ? String(value).trim() : '';
              }
            });
            return obj;
          }).filter(obj => Object.values(obj).some(value => value !== ''));
          
          addDebugInfo(`Processed data: ${processedData.length} valid rows`);
          resolve(processedData);
        } catch (error) {
          addDebugInfo(`Error processing Excel file: ${error.message}`);
          reject(new Error(`Erreur lors de la lecture du fichier Excel: ${error.message}`));
        }
      };
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    addDebugInfo(`Starting file upload: ${file.name}, Size: ${file.size}, Type: ${file.type}`);

    // Validate file type
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setError('Veuillez sélectionner un fichier Excel (.xlsx ou .xls)');
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Le fichier est trop volumineux (limite: 10MB)');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);
    setImportedData([]); // Clear previous data
    if (debug) setDebugInfo([]);

    try {
      addDebugInfo('Loading XLSX library...');
      await loadXLSXLibrary();
      
      addDebugInfo('Reading Excel file...');
      const data = await readExcelFile(file);
      
      if (data.length === 0) {
        throw new Error('Le fichier Excel ne contient pas de données valides');
      }

      addDebugInfo(`Successfully parsed ${data.length} rows`);

      // Store the imported data to display in table
      setImportedData(data);

      // Call the onImport function with parsed data
      if (onImport && typeof onImport === 'function') {
        onImport(data);
      }
      
      setSuccess(`Fichier "${file.name}" importé avec succès. ${data.length} lignes traitées.`);
      
    } catch (error) {
      addDebugInfo(`Upload error: ${error.message}`);
      setError(error.message || 'Une erreur inconnue s\'est produite');
    } finally {
      setUploading(false);
    }
  };

  // Function to dynamically load XLSX library
  const loadXLSXLibrary = () => {
    return new Promise((resolve, reject) => {
      if (window.XLSX) {
        addDebugInfo('XLSX library already loaded');
        resolve();
        return;
      }

      addDebugInfo('Loading XLSX library...');
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      script.onload = () => {
        addDebugInfo('XLSX library loaded successfully');
        // Wait a bit for the library to initialize
        setTimeout(() => {
          if (window.XLSX) {
            resolve();
          } else {
            reject(new Error('XLSX library failed to initialize'));
          }
        }, 100);
      };
      script.onerror = () => {
        addDebugInfo('Failed to load XLSX library');
        reject(new Error('Impossible de charger la bibliothèque Excel'));
      };
      document.head.appendChild(script);
    });
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
    // Reset input value to allow re-uploading the same file
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  return (
      <div className='bg-white rounded-xl shadow-lg p-6 mx-auto'>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FileSpreadsheet className="w-6 h-6 text-green-600" />
        Import de fichier Excel
      </h2>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className={`w-16 h-16 mx-auto mb-4 ${dragOver ? 'text-blue-500' : 'text-gray-400'}`} />
        
        {uploading ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-lg text-gray-600">Traitement du fichier en cours...</p>
          </div>
        ) : (
          <>
            <p className="text-lg text-gray-600 mb-4">
              Glissez-déposez votre fichier Excel ici ou cliquez pour sélectionner
            </p>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleInputChange}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition inline-block font-medium"
            >
              Sélectionner un fichier
            </label>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-800">Erreur</h4>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-800">Succès</h4>
            <p className="text-green-700">{success}</p>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Format attendu :
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Référence client | Nom | Prénom | Adresse | Commune | Date RDV | Créneau</li>
          <li>• Le fichier doit être au format Excel (.xlsx ou .xls)</li>
          <li>• Les doublons seront automatiquement détectés</li>
          <li>• La première ligne doit contenir les en-têtes de colonnes</li>
        </ul>
      </div>

      {/* Debug Panel */}
      {debug && debugInfo.length > 0 && (
        <div className="mt-4 bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-xs">
          <h4 className="font-semibold text-white mb-2">Debug Log:</h4>
          <div className="max-h-32 overflow-y-auto">
            {debugInfo.map((info, index) => (
              <div key={index} className="mb-1">{info}</div>
            ))}
          </div>
        </div>
      )}

      {/* Imported Data Table */}
      {importedData.length > 0 && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Données importées ({importedData.length} lignes)
              </h3>
              <button
                onClick={() => setImportedData([])}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Effacer
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  {importedData.length > 0 && Object.keys(importedData[0]).map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {importedData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    {Object.entries(row).map(([key, value]) => (
                      <td
                        key={key}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        title={String(value)} // Tooltip for long values
                      >
                        <div className="max-w-xs truncate">
                          {String(value) || '-'}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer with Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {importedData.length} ligne{importedData.length > 1 ? 's' : ''} prête{importedData.length > 1 ? 's' : ''} à être sauvegardée{importedData.length > 1 ? 's' : ''}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify(importedData, null, 2);
                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'imported_data.json';
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                >
                  Télécharger JSON
                </button>
                <button
                  onClick={() => {
                    // This will be used later to save to database
                    alert('Fonctionnalité de sauvegarde en base de données à implémenter');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  Sauvegarder en DB
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;