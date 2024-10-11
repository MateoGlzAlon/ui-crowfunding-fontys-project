import React, { useState } from "react";
import axios from 'axios';
import { DATA } from "@/app/data";

function CreateDemoProjects() {
    const [projectData, setProjectData] = useState(null); // State to hold the project data
    const [projectId, setProjectId] = useState(''); // State to hold the project ID from input
    const [error, setError] = useState(null); // State to hold error messages

    function getAllProjects() {
        setError(null); // Reset error state before fetching
        axios
            .get(`${DATA.origin}/projects`)
            .then((res) => {
                setProjectData(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setError("Error fetching projects. Please try again."); // Set error message
            });
    }

    // Fetch specific project by ID
    function getSpecificProject() {
        if (projectId) {
            setError(null); // Reset error state before fetching
            axios
                .get(`${DATA.origin}/projects/${projectId}`)
                .then((res) => {
                    setProjectData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching specific project:", error);
                    setError("Error fetching specific project. Please check the ID and try again."); // Set error message
                });
        } else {
            setError("Project ID is required"); // Set error message if projectId is empty
        }
    }



    async function createFakeProjects() {
        const fakeRepo = [
            {
                "id": 1,
                "name": "Community Garden Project",
                "description": "A project aimed at creating a sustainable community garden to promote local agriculture.",
                "location": "Downtown Area",
                "type": "Environment",
                "dateCreated": "2024-09-15T10:00:00",
                "fundingGoal": 10000,
                "fundsRaised": 7500,
                "userEmail": "matthewstone@example.com",
                "images": [
                    "garden-1.jpg",
                    "garden-2.jpg",
                    "garden-3.jpg"
                ],
            },
            {
                "id": 2,
                "name": "School Library Fundraiser",
                "description": "Raising funds to renovate and expand the school library's resources.",
                "location": "Springfield High School",
                "type": "Education",
                "dateCreated": "2024-09-20T11:30:00",
                "fundingGoal": 5000,
                "fundsRaised": 3500,
                "userEmail": "emilyjohnson@example.com",
                "images": [
                    "library-2.jpg",
                    "garden-2.jpg",
                    "garden-3.jpg"
                ],
            },
            {
                "id": 3,
                "name": "Clean Water Initiative",
                "description": "Providing access to clean drinking water in underserved communities.",
                "location": "Various Locations",
                "type": "Health",
                "dateCreated": "2024-09-25T14:15:00",
                "fundingGoal": 20000,
                "fundsRaised": 30000,
                "userEmail": "michaelbrown@example.com",
                "images": [
                    "water-3.jpg",
                    "garden-2.jpg",
                    "garden-3.jpg"
                ],
            },
            {
                "id": 4,
                "name": "Animal Shelter Renovation",
                "description": "Renovating the local animal shelter to improve the living conditions for rescued animals.",
                "location": "Animal Shelter, City Center",
                "type": "Animal Welfare",
                "dateCreated": "2024-09-30T09:45:00",
                "fundingGoal": 15000,
                "fundsRaised": 12000,
                "userEmail": "sophiadavis@example.com",
                "images": [
                    "animal-4.jpeg",
                    "garden-2.jpg",
                    "garden-3.jpg"
                ],
            },
            {
                "id": 5,
                "name": "Renewable Energy Campaign",
                "description": "Promoting the use of renewable energy sources in our community.",
                "location": "Citywide",
                "type": "Energy",
                "dateCreated": "2024-10-05T12:00:00",
                "fundingGoal": 25000,
                "fundsRaised": 18000,
                "userEmail": "jameswilson@example.com",
                "images": [
                    "energy-5.jpeg",
                    "garden-2.jpg",
                    "garden-3.jpg"
                ],
            }
        ];

        const allResponses = []; // Array to hold all responses

        for (const project of fakeRepo) {
            try {
                const res = await axios.post(`${DATA.origin}/projects`, project); // Post each project individually
                allResponses.push(res.data); // Push response to allResponses
            } catch (error) {
                console.error("Error creating project:", error);
                setError("Error creating fake projects"); // Set error message
            }
        }

        setProjectData(allResponses);

    }


    function deleteSpecificProject() {
        if (projectId) {
            axios.delete(`${DATA.origin}/projects/${projectId}`)
                .then((res) => {
                    setProjectData(res.data);
                })
                .catch((error) => {
                    console.error("Error deleting specific project:", error);
                    setError("Error deleting specific project. Please check the ID and try again."); // Set error message
                });
        } else {
            setError("Project ID is required"); // Set error message if projectId is empty
        }
    }

    return (
        <div className="border-2 border-black m-10 p-5">
            <h2 className="text-4xl font-bold">Projects</h2>
            <button className="border-2 border-black m-10 p-5" onClick={createFakeProjects}>
                Create fake projects
            </button>

            <button className="border-2 border-black m-8 p-5" onClick={getAllProjects}>
                Get all projects
            </button>

            <button className="border-2 border-black m-8 p-5" onClick={getSpecificProject}>
                Get specific project
            </button>

            <button className="border-2 border-black m-8 p-5" onClick={deleteSpecificProject}>
                Delete specific project
            </button>

            <input
                type="text"
                placeholder="Enter project ID"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="border-2 border-black m-6 p-5"
            />

            <pre className="border-2 border-black m-10 p-9" id="axios-test">
                {error ? (
                    <span className="text-red-500">{error}</span> // Show error message
                ) : projectData ? (
                    JSON.stringify(projectData, null, 2)
                ) : (
                    "No data yet."
                )}
            </pre>
        </div>
    );
}

export default CreateDemoProjects;
