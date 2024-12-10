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



        //====================================================================================================




        /* async function createFakeProjectImages() {
            const fakeRepo = [

                {
                    "projectId": 1,
                    "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/ab80cfba291a4f724b216b5dbb9a939e8232eb8ed4a7ed0a857e5981354471bb",
                    "imageOrder": 1
                },
                {
                    "projectId": 1,
                    "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/a3673f2826eab36d3206738541ead61a49d159cf15959d6669510c1cf8de4e8e",
                    "imageOrder": 2

                },
                {
                    "projectId": 1,
                    "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/91373be4e3a8bf65bef2d2a49a6e0f951863d245ad1fb72f6fb2562c7a11bc39",
                    "imageOrder": 3

                },


                {
                    "projectId": 2,
                    "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/c485febc089a4822ea092449d198fb53af0f7d2671da6f8dbfaf107bd186acdb",
                    "imageOrder": 1
                },
                {
                    "projectId": 2,
                    "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/2a59cb5f12487428218e661f6e7ccb924c55739e9272557c1421fe4bf8209b2b",
                    "imageOrder": 2
                },
            

               

        {
            "projectId": 3,
                "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/38ea7e4a74f92034016142cf65eb0a02d3a2fbede1510dc89ec194e3fe63b6a4",
                    "imageOrder": 1
        },
        {
            "projectId": 3,
                "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/99c84fd61c320663e3296a438cf90d3ba9880010066ccbef58b900bfdaa10917",
                    "imageOrder": 2
        },
        {
            "projectId": 3,
                "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/bd27d00c2c0e5d564f3bbec83439dd96f9be4030ed0bbe7bf97baa4170660d5f",
                    "imageOrder": 3
        },


        {
            "projectId": 4,
                "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/c6e654a107cf423b19c1d461cdb46d35ab6d6e965afd4d5d258e9ca910bcb222",
                    "imageOrder": 1
        },
        {
            "projectId": 4,
                "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/36c27a8394e02873f3c62ca095fcee3ca60cc35bef33f8223fab81fad879e8b6",
                    "imageOrder": 2
        },
        

        {
            "projectId": 5,
                "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/08054d703386c7d22b101ec623adb9a607fc9a030f9ce145bdec31f192539c16",
                    "imageOrder": 1
        },
        {
            "projectId": 5,
                "imageURL": "https://raisehub-crowdfunding-bucket.s3.eu-west-3.amazonaws.com/3c41b4e469f1fa3f3ca874755e77e5655114bbe1fe18d01c4e514c48f4f88fbf",
                    "imageOrder": 2
        },

      
            ];
    }*/

        //==================================================================================================================


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
