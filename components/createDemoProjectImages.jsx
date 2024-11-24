import React, { useState } from "react";
import axios from 'axios';
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";

function CreateDemoProjectImages() {
    const [projectData, setProjectData] = useState(null); // State to hold the project data
    const [projectId, setProjectId] = useState(''); // State to hold the project ID from input
    const [error, setError] = useState(null); // State to hold error messages

    function getAllProjectImages() {
        setError(null); // Reset error state before fetching
        axios
            .get(`${DATA.origin}/projects/images`,
                {
                    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                }
            )
            .then((res) => {
                setProjectData(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching project images:", error);
                setError("Error fetching project images. Please try again."); // Set error message
            });
    }

    // Fetch specific project by ID
    function getSpecificProjectImage() {
        if (projectId) {
            setError(null); // Reset error state before fetching
            axios
                .get(`${DATA.origin}/projects/images/${projectId}`,
                    {
                        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                    }
                )
                .then((res) => {
                    setProjectData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching specific project image:", error);
                    setError("Error fetching specific project image. Please check the ID and try again."); // Set error message
                });
        } else {
            setError("Project image ID is required"); // Set error message if projectId is empty
        }
    }



    async function createFakeProjectImages() {
        const fakeRepo = [

            {
                "projectId": 1,
                "imageURL": "https://placehold.co/600x400?text=p1.1",
                "imageOrder": 1
            },
            {
                "projectId": 1,
                "imageURL": "https://placehold.co/600x400?text=p1.2",
                "imageOrder": 2

            },
            {
                "projectId": 1,
                "imageURL": "https://placehold.co/600x400?text=p1.3",
                "imageOrder": 3

            },


            {
                "projectId": 2,
                "imageURL": "https://placehold.co/600x400?text=p2.1",
                "imageOrder": 1
            },
            {
                "projectId": 2,
                "imageURL": "https://placehold.co/600x400?text=p2.2",
                "imageOrder": 2
            },
            {
                "projectId": 2,
                "imageURL": "https://placehold.co/600x400?text=p2.3",
                "imageOrder": 3
            },

            /*  */

            {
                "projectId": 3,
                "imageURL": "https://placehold.co/600x400?text=p3.1",
                "imageOrder": 1
            },
            {
                "projectId": 3,
                "imageURL": "https://placehold.co/600x400?text=p3.2",
                "imageOrder": 2
            },
            {
                "projectId": 3,
                "imageURL": "https://placehold.co/600x400?text=p3.3",
                "imageOrder": 3
            },

            /*  */

            {
                "projectId": 4,
                "imageURL": "https://placehold.co/600x400?text=p4.1",
                "imageOrder": 1
            },
            {
                "projectId": 4,
                "imageURL": "https://placehold.co/600x400?text=p4.2",
                "imageOrder": 2
            },
            {
                "projectId": 4,
                "imageURL": "https://placehold.co/600x400?text=p4.3",
                "imageOrder": 3
            },

            /*  */

            {
                "projectId": 5,
                "imageURL": "https://placehold.co/600x400?text=p5.1",
                "imageOrder": 1
            },
            {
                "projectId": 5,
                "imageURL": "https://placehold.co/600x400?text=p5.2",
                "imageOrder": 2
            },
            {
                "projectId": 5,
                "imageURL": "https://placehold.co/600x400?text=p5.3",
                "imageOrder": 3
            },
        ];

        const allResponses = []; // Array to hold all responses

        for (const project of fakeRepo) {
            try {
                const res = await axios.post(`${DATA.origin}/projects/images`, project,
                    {
                        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                    }
                ); // Post each project individually
                allResponses.push(res.data); // Push response to allResponses
            } catch (error) {
                console.error("Error creating project:", error);
                setError("Error creating fake projects"); // Set error message
            }
        }

        setProjectData(allResponses);

    }


    function deleteSpecificProjectImage() {
        if (projectId) {
            axios.delete(`${DATA.origin}/projects/images/${projectId}`,
                {
                    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                }
            )
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
            <h2 className="text-4xl font-bold">Project Images</h2>
            <button className="border-2 border-black m-10 p-5" onClick={createFakeProjectImages}>
                Create fake project img
            </button>

            <button className="border-2 border-black m-8 p-5" onClick={getAllProjectImages}>
                Get all project img
            </button>

            <button className="border-2 border-black m-8 p-5" onClick={getSpecificProjectImage}>
                Get spec project img
            </button>

            <button className="border-2 border-black m-8 p-5" onClick={deleteSpecificProjectImage}>
                Delete spec project img
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

export default CreateDemoProjectImages;
