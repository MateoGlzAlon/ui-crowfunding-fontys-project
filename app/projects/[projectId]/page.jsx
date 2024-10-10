"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { DATA } from '@/app/data';

const ProjectDetails = ({ params }) => {
    const projectId = params.projectId;
    const router = useRouter();

    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (projectId) {
                try {
                    const response = await axios.get(`${DATA.origin}/projects/${projectId}`);
                    setProject(response.data);
                } catch (error) {
                    console.error("Failed to fetch project data:", error);
                }
            }
        };

        fetchProject();
    }, [projectId]);


    if (!project) {
        return <p></p>;
    }

    return (
        <div>
            <h1>Project: {project.name}</h1>
            <p>Description: {project.description}</p>
            <button onClick={() => router.push('/')}>Go Home</button>
        </div>
    );
};

export default ProjectDetails;
