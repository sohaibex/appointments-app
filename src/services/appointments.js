import api from './api';

export const appointmentsService = {
    // Récupérer les informations d'un client
    getClientInfo: async (clientId) => {
        const response = await api.get(`/clients/${clientId}`);
        return response.data;
    },

    // Modifier un rendez-vous
    updateAppointment: async (clientId, appointmentData) => {
        const response = await api.put(`/clients/${clientId}/appointment`, appointmentData);
        return response.data;
    },

    // Récupérer les créneaux disponibles
    getAvailableSlots: async (commune, date) => {
        const response = await api.get('/appointments/available-slots', {
            params: { commune, date }
        });
        return response.data;
    },

    // Créer un nouveau rendez-vous
    createAppointment: async (appointmentData) => {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    },

    // Import en masse depuis Excel
    bulkImport: async (fileData) => {
        const formData = new FormData();
        formData.append('file', fileData);

        const response = await api.post('/clients/bulk-import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};
