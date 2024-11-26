import axios from 'axios';

import { DATA } from '@/app/data';

async function getAllProjectsGET() {
    try {
        const response = await axios.get(`${DATA.origin}/projects`);
        return (response.data);
    } catch (error) {
        console.error("Failed to get all projects: ", error);
        return null;
    }
}

export default getAllProjectsGET;