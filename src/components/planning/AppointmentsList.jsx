import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  Download, 
  RefreshCw,
  Filter,
  X,
  Columns
} from 'lucide-react';
import ManualEntry from './ManualEntry';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const AppointmentsList = ({ appointments = [], onNewAppointment, onEditAppointment, onDeleteAppointment }) => {
  const [gridApi, setGridApi] = useState(null);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Custom cell renderers
  const ActionsCellRenderer = useCallback((params) => {
    const handleEdit = () => {
      // Transform the appointment data to match ManualEntry format
      const appointmentData = params.data;
      const transformedData = {
        // Core required fields
        referenceClient: appointmentData.referenceClient || '',
        nom: appointmentData.nom || '',
        prenom: appointmentData.prenom || '',
        adresseBranchement: appointmentData.adresseBranchement || '',
        communeBranchement: appointmentData.communeBranchement || '',
        date: appointmentData.date || '',
        agent: appointmentData.agent || '',
        creneau: appointmentData.creneau || '',
        
        // Extended fields
        nomReservoir: appointmentData.nomReservoir || '',
        intituleLot: appointmentData.intituleLot || '',
        statutLot: appointmentData.statutLot || 'A traiter',
        referenceContratPartenaire: appointmentData.referenceContratPartenaire || '',
        referencePF: appointmentData.referencePF || '',
        referenceBranchementGeneral: appointmentData.referenceBranchementGeneral || '',
        typeCompteur: appointmentData.typeCompteur || 'Individuel',
        nRue: appointmentData.nRue || '',
        statutAppairage: appointmentData.statutAppairage || '',
        matriculeCompteur: appointmentData.matriculeCompteur || '',
        numeroCompteur: appointmentData.numeroCompteur || '',
        marqueCompteur: appointmentData.marqueCompteur || '',
        modeleCompteur: appointmentData.modeleCompteur || '',
        diametreCompteur: appointmentData.diametreCompteur || '',
        domaineCompteur: appointmentData.domaineCompteur || '',
        impossibiliteTechnique: appointmentData.impossibiliteTechnique || 'NON',
        dateSaisieImpossibilite: appointmentData.dateSaisieImpossibilite || '',
        motifImpossibilite: appointmentData.motifImpossibilite || '',
        civilite: appointmentData.civilite || '',
        adresseCorrespondancePrecision: appointmentData.adresseCorrespondancePrecision || '',
        adresseCorrespondanceComplement: appointmentData.adresseCorrespondanceComplement || '',
        adresseCorrespondanceVoie: appointmentData.adresseCorrespondanceVoie || '',
        adresseCorrespondanceLieuDit: appointmentData.adresseCorrespondanceLieuDit || '',
        adresseCorrespondanceCodePostal: appointmentData.adresseCorrespondanceCodePostal || '',
        adresseCorrespondanceLocalite: appointmentData.adresseCorrespondanceLocalite || '',
        adresseCorrespondanceCedex: appointmentData.adresseCorrespondanceCedex || '',
        adresseCorrespondancePays: appointmentData.adresseCorrespondancePays || 'France',
        telephoneFixe: appointmentData.telephoneFixe || '',
        telephonePortable: appointmentData.telephonePortable || '',
        email: appointmentData.email || '',
        name: appointmentData.name || '',
        addressLine1: appointmentData.addressLine1 || '',
        addressLine2: appointmentData.addressLine2 || '',
        addressLine3: appointmentData.addressLine3 || '',
        addressPostalcode: appointmentData.addressPostalcode || '',
        addressCity: appointmentData.addressCity || '',
        addressCountry: appointmentData.addressCountry || '',
        variablesRef: appointmentData.variablesRef || '',
        variablesBranch: appointmentData.variablesBranch || '',
        variablesDate: appointmentData.variablesDate || ''
      };

      setEditingAppointment(appointmentData);
      setIsEditMode(true);
      setShowManualEntry(true);
    };
    
    const handleDelete = () => {
      if (onDeleteAppointment) {
        onDeleteAppointment(params.data);
      }
    };
    
    const handleView = () => {
      console.log('View:', params.data);
    };

    return (
      <div className="flex items-center space-x-1 h-full">
        <button
          onClick={handleView}
          className="text-blue-600 hover:text-blue-800 p-1"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={handleEdit}
          className="text-green-600 hover:text-green-800 p-1"
          title="Edit"
        >
          <Edit className="h-4 w-4" />
        </button>
        {onDeleteAppointment && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }, [onDeleteAppointment]);

  // Status cell renderer with colored badges
  const StatusCellRenderer = useCallback((params) => {
    const status = params.value;
    let colorClass = 'bg-gray-100 text-gray-800';
    
    switch (status) {
      case 'Terminé':
        colorClass = 'bg-green-100 text-green-800';
        break;
      case 'En cours':
        colorClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'A traiter':
        colorClass = 'bg-blue-100 text-blue-800';
        break;
      case 'Annulé':
        colorClass = 'bg-red-100 text-red-800';
        break;
    }

    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {status || 'N/A'}
      </span>
    );
  }, []);

  // Phone/Email cell renderer with clickable links
  const ContactCellRenderer = useCallback((params) => {
    const value = params.value;
    const type = params.colDef.cellRendererParams?.type;
    
    if (!value) return <span className="text-gray-400">—</span>;
    
    if (type === 'email') {
      return (
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
          {value}
        </a>
      );
    }
    
    if (type === 'phone') {
      return (
        <a href={`tel:${value}`} className="text-blue-600 hover:underline">
          {value}
        </a>
      );
    }
    
    return value;
  }, []);

  // Date cell renderer
  const DateCellRenderer = useCallback((params) => {
    if (!params.value) return <span className="text-gray-400">—</span>;
    return new Date(params.value).toLocaleDateString('fr-FR');
  }, []);

  // Column definitions - Fixed for Community Version
  const columnDefs = useMemo(() => [
    {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      pinned: 'left',
      lockPosition: true,
      suppressMenu: true,
      sortable: false,
      filter: false,
      resizable: false,
      suppressSizeToFit: true
    },
    {
      field: 'referenceClient',
      headerName: 'Référence Client',
      width: 150,
      pinned: 'left',
      filter: 'agTextColumnFilter',
      sortable: true
    },
    {
      field: 'civilite',
      headerName: 'Civilité',
      width: 80,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: 120,
      filter: 'agTextColumnFilter',
      sortable: true
    },
    {
      field: 'prenom',
      headerName: 'Prénom',
      width: 120,
      filter: 'agTextColumnFilter',
      sortable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      cellRenderer: ContactCellRenderer,
      cellRendererParams: { type: 'email' },
      filter: 'agTextColumnFilter'
    },
    {
      field: 'telephoneFixe',
      headerName: 'Tél. Fixe',
      width: 130,
      cellRenderer: ContactCellRenderer,
      cellRendererParams: { type: 'phone' },
      filter: 'agTextColumnFilter'
    },
    {
      field: 'telephonePortable',
      headerName: 'Tél. Portable',
      width: 140,
      cellRenderer: ContactCellRenderer,
      cellRendererParams: { type: 'phone' },
      filter: 'agTextColumnFilter'
    },
    {
      field: 'nRue',
      headerName: 'N° Rue',
      width: 80,
      filter: 'agNumberColumnFilter'
    },
    {
      field: 'adresseBranchement',
      headerName: 'Adresse Branchement',
      width: 250,
      filter: 'agTextColumnFilter',
      tooltipField: 'adresseBranchement'
    },
    {
      field: 'communeBranchement',
      headerName: 'Commune',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'adresseCorrespondanceVoie',
      headerName: 'Corresp. Voie',
      width: 200,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'adresseCorrespondanceCodePostal',
      headerName: 'Corresp. CP',
      width: 100,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'adresseCorrespondanceLocalite',
      headerName: 'Corresp. Localité',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'date',
      headerName: 'Date RDV',
      width: 120,
      cellRenderer: DateCellRenderer,
      filter: 'agDateColumnFilter',
      sortable: true
    },
    {
      field: 'creneau',
      headerName: 'Créneau',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'agent',
      headerName: 'Agent',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'nomReservoir',
      headerName: 'Nom Réservoir',
      width: 200,
      filter: 'agTextColumnFilter',
      tooltipField: 'nomReservoir'
    },
    {
      field: 'intituleLot',
      headerName: 'Intitulé Lot',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'statutLot',
      headerName: 'Statut Lot',
      width: 120,
      cellRenderer: StatusCellRenderer,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'referenceContratPartenaire',
      headerName: 'Réf. Contrat',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'referencePF',
      headerName: 'Réf. PF',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'typeCompteur',
      headerName: 'Type Compteur',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'marqueCompteur',
      headerName: 'Marque',
      width: 100,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'numeroCompteur',
      headerName: 'N° Compteur',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'matriculeCompteur',
      headerName: 'Matricule',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'modeleCompteur',
      headerName: 'Modèle',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'impossibiliteTechnique',
      headerName: 'Impossibilité Tech.',
      width: 130,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'dateSaisieImpossibilite',
      headerName: 'Date Saisie Imp.',
      width: 130,
      cellRenderer: DateCellRenderer,
      filter: 'agDateColumnFilter'
    },
    {
      field: 'name',
      headerName: 'Name (Var)',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'variablesRef',
      headerName: 'Variables Ref',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      pinned: 'right',
      cellRenderer: ActionsCellRenderer,
      sortable: false,
      filter: false,
      suppressMenu: true,
      resizable: false,
      suppressSizeToFit: true
    }
  ], [ActionsCellRenderer, StatusCellRenderer, ContactCellRenderer, DateCellRenderer]);

  // Grid options - Fixed for Community Version
  const gridOptions = useMemo(() => ({
    columnDefs,
    rowData: appointments,
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      minWidth: 100,
      floatingFilter: false // Disable floating filters
    },
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    animateRows: true,
    pagination: true,
    paginationPageSize: 50,
    paginationPageSizeSelector: [25, 50, 100, 200],
    suppressMenuHide: false,
    suppressMovableColumns: false,
    // Remove all enterprise features
    enableRangeSelection: false,
    enableCharts: false,
    enableRangeHandle: false,
    suppressContextMenu: false,
    suppressCellFocus: false
  }), [columnDefs, appointments]);

  // Grid ready callback
  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    
    // Initialize column visibility state
    const initialVisibility = {};
    params.api.getColumns()?.forEach(column => {
      const colId = column.getColId();
      if (colId) {
        initialVisibility[colId] = column.isVisible();
      }
    });
    setColumnVisibility(initialVisibility);
    
    // Auto-size columns to fit
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 100);
  }, []);

  // Selection changed callback
  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      const selectedRows = gridApi.getSelectedRows();
      setSelectedRows(selectedRows);
    }
  }, [gridApi]);

  // Export functions
  const exportToCsv = useCallback(() => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: 'appointments-data.csv',
        onlySelected: selectedRows.length > 0
      });
    }
  }, [gridApi, selectedRows]);

  // Filter functions - Updated for newer AG Grid API
  const clearFilters = useCallback(() => {
    if (gridApi) {
      gridApi.setFilterModel(null);
      gridApi.setGridOption('quickFilterText', '');
      setQuickFilterText('');
    }
  }, [gridApi]);

  // Auto-size columns - Updated for newer AG Grid API
  const autoSizeColumns = useCallback(() => {
    if (gridApi) {
      const allColumnIds = [];
      gridApi.getColumns()?.forEach(column => {
        allColumnIds.push(column.getColId());
      });
      gridApi.autoSizeColumns(allColumnIds);
    }
  }, [gridApi]);

  // Toggle column visibility - Updated for newer AG Grid API
  const toggleColumnVisibility = useCallback((colId, visible) => {
    if (gridApi) {
      gridApi.setColumnsVisible([colId], visible);
    }
  }, [gridApi]);

  // Handle new appointment
  const handleNewAppointment = (data) => {
    if (isEditMode && editingAppointment) {
      // Handle edit operation
      if (onEditAppointment) {
        onEditAppointment({ ...editingAppointment, ...data });
      }
    } else {
      // Handle new appointment
      if (onNewAppointment) {
        onNewAppointment(data);
      }
    }
    handleCloseModal();
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowManualEntry(false);
    setIsEditMode(false);
    setEditingAppointment(null);
  };

  // Get all column definitions for visibility toggle
  const allColumns = useMemo(() => {
    return columnDefs.filter(col => col.field && col.field !== 'actions' && col.field);
  }, [columnDefs]);

  return (
    <div className="w-full h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Gestion des Rendez-vous ({appointments.length} records)
            </h2>
            {selectedRows.length > 0 && (
              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {selectedRows.length} selected
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Quick filter..."
                value={quickFilterText}
                onChange={(e) => {
                  setQuickFilterText(e.target.value);
                  if (gridApi) {
                    gridApi.setGridOption('quickFilterText', e.target.value);
                  }
                }}
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              {quickFilterText && (
                <button
                  onClick={() => {
                    setQuickFilterText('');
                    if (gridApi) {
                      gridApi.setGridOption('quickFilterText', '');
                    }
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                if (!showColumnVisibility && gridApi) {
                  // Update column visibility state when opening the panel
                  const currentVisibility = {};
                  gridApi.getColumns()?.forEach(column => {
                    const colId = column.getColId();
                    if (colId) {
                      currentVisibility[colId] = column.isVisible();
                    }
                  });
                  setColumnVisibility(currentVisibility);
                }
                setShowColumnVisibility(!showColumnVisibility);
              }}
              className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <Columns className="h-4 w-4 mr-2" />
              Columns
            </button>

            <button
              onClick={clearFilters}
              className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Filters
            </button>

            <button
              onClick={autoSizeColumns}
              className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Auto Size
            </button>

            <button
              onClick={exportToCsv}
              className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>

            <button
              onClick={() => setShowManualEntry(true)}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau RDV
            </button>
          </div>
        </div>

        {/* Column Visibility Panel */}
        {showColumnVisibility && (
          <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Column Visibility</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
              {allColumns.map((col) => {
                const isVisible = columnVisibility[col.field] !== false;
                return (
                  <label key={col.field} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={(e) => {
                        const newVisibility = { ...columnVisibility, [col.field]: e.target.checked };
                        setColumnVisibility(newVisibility);
                        toggleColumnVisibility(col.field, e.target.checked);
                      }}
                      className="rounded"
                    />
                    <span>{col.headerName}</span>
                  </label>
                );
              })}
            </div>
            <button
              onClick={() => setShowColumnVisibility(false)}
              className="mt-3 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Manual Entry Modal */}
      {showManualEntry && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ManualEntry 
              onSave={handleNewAppointment}
              onCancel={handleCloseModal}
              isEditMode={isEditMode}
              appointment={editingAppointment}
            />
          </div>
        </div>
      )}

      {/* AG Grid */}
      <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <AgGridReact
          {...gridOptions}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

export default AppointmentsList;