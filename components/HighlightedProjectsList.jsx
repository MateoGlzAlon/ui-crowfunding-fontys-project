import React, { useEffect, useState } from 'react';
import ProjectsList from './ProjectsList';
import axios from 'axios';
import { DATA } from '@/app/data';


// Sample usage of the component
const HighlightedProjectsList = () => {

    const [projects2, setProjects2] = useState([]);

    useEffect(() => {
        getHighlightedProjects();
    }, []);



    function getHighlightedProjects() {
        axios
            .get(`${DATA.origin}/projects/highlighted`)
            .then((res) => {
                setProjects2(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }



    console.log(projects2);

    return (
        <ProjectsList projects={projects2} title="Highlighted Fundraising Projects" />
    );
};

export default HighlightedProjectsList;

