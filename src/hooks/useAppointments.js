import { useState } from 'react';

export function useAppointments() {
    const [appointments, setAppointments] = useState([]);
    return { appointments, setAppointments };
} 
