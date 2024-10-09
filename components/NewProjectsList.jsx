import React, { useEffect, useState } from 'react';
import ProjectsList from './ProjectsList';
import axios from 'axios';
import { DATA } from '@/app/data';

// Sample usage of the component
const NewProjectsList = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getNewProjects();
    }, []);

    function getNewProjects() {
        axios.get(`${DATA.origin}/projects/new`)
            .then((res) => {
                setProjects(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }

    return (
        <ProjectsList projects={projects} title="New Projects" />
    );
};

export default NewProjectsList;

