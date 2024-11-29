import React, { useState } from "react";
import axios from 'axios';
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";

function CreateDemoProjects() {
    const [projectData, setProjectData] = useState(null); // State to hold the project data
    const [projectId, setProjectId] = useState(''); // State to hold the project ID from input
    const [error, setError] = useState(null); // State to hold error messages

    function getAllProjects() {
        setError(null); // Reset error state before fetching
        axios.get(`${DATA.origin}/projects`,
            {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
            }
        )
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
                .get(`${DATA.origin}/projects/${projectId}`,
                    {
                        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                    }
                )
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
                "name": "Community Garden Project",
                "description": "This initiative focuses on establishing a sustainable community garden designed to address multiple issues such as food insecurity, urban environmental challenges, and community engagement. By transforming vacant lots and underutilized urban spaces into vibrant, productive gardens, the project aims to provide fresh, organic produce to local families while promoting environmentally friendly practices. Educational workshops will teach residents about composting, crop rotation, and organic pest control, empowering them to grow their own food and reduce their carbon footprint. Additionally, the garden will serve as a hub for community interaction, fostering stronger social ties and offering opportunities for volunteerism, skill-sharing, and outdoor recreation.",
                "location": "Downtown Area",
                "type": "Environment",
                "dateCreated": "2024-09-15T10:00:00",
                "fundingGoal": 12000,
                "userEmail": "user@example.com",
            },
            {
                "name": "School Library Fundraiser",
                "description": "This fundraiser is dedicated to transforming the school library into a modern learning center that meets the diverse needs of students in the 21st century. With the funds raised, the project will renovate the library's physical space, creating dedicated zones for collaborative work, quiet study, and digital learning. A significant portion of the funds will go toward expanding the collection of books, e-books, and audiobooks, ensuring students have access to a wide range of educational and recreational materials. Additionally, new technology, including tablets, computers, and interactive whiteboards, will be introduced to enhance the learning experience. The project also aims to host literacy programs, author visits, and workshops to inspire a lifelong love of reading and learning among students.",
                "location": "Springfield High School",
                "type": "Education",
                "dateCreated": "2024-09-20T11:30:00",
                "fundingGoal": 5000,
                "userEmail": "emilyjohnson@example.com",
            },
            {
                "name": "Clean Water Initiative",
                "description": "This vital initiative addresses the urgent need for access to clean and safe drinking water in communities that suffer from contaminated or insufficient water supplies. The project plans to implement sustainable water solutions, including drilling wells, installing filtration systems, and repairing existing infrastructure. Beyond providing immediate access to potable water, the initiative will educate community members on proper sanitation practices, water conservation, and maintenance of the systems to ensure long-term success. By targeting rural and underserved regions, the program seeks to drastically reduce waterborne diseases, improve overall health outcomes, and enhance the quality of life for thousands of people. This initiative underscores the belief that access to clean water is a fundamental human right, and it aims to create lasting change for future generations.",
                "location": "Various Locations",
                "type": "Health",
                "dateCreated": "2024-09-25T14:15:00",
                "fundingGoal": 20000,
                "userEmail": "michaelbrown@example.com",
            },
            {
                "name": "Animal Shelter Renovation",
                "description": "This comprehensive renovation project seeks to transform the local animal shelter into a state-of-the-art facility that can better meet the needs of rescued animals and the community. The proposed upgrades include replacing outdated kennels with spacious, climate-controlled units to provide comfort and safety for the animals. Veterinary facilities will be expanded and modernized to allow for on-site medical care and spay/neuter programs. Outdoor exercise and play areas will be developed to promote the animals’ physical and emotional well-being, and a new adoption center will create a welcoming environment for prospective pet owners. The project will also introduce community outreach programs to raise awareness about responsible pet ownership and support the shelter's mission of finding loving homes for every animal in their care.",
                "location": "Animal Shelter, City Center",
                "type": "Animal Welfare",
                "dateCreated": "2024-09-30T09:45:00",
                "fundingGoal": 15000,
                "userEmail": "sophiadavis@example.com",
            },
            {
                "name": "Renewable Energy Campaign",
                "description": "This forward-thinking campaign is dedicated to accelerating the adoption of renewable energy technologies across the community, with a focus on sustainability, cost savings, and environmental impact. The project plans to install solar panels on public buildings, provide subsidies for residential solar systems, and introduce community wind and geothermal projects to reduce dependency on fossil fuels. Educational workshops and seminars will be conducted to inform residents about the benefits of renewable energy, including long-term savings and reduced carbon emissions. Additionally, the campaign aims to collaborate with local businesses and policymakers to create incentives for adopting green energy solutions. By fostering a culture of sustainability, the project envisions a future where renewable energy is not only accessible but also embraced as the norm in every household and organization in the community.",
                "location": "Citywide",
                "type": "Energy",
                "dateCreated": "2024-10-05T12:00:00",
                "fundingGoal": 25000,
                "userEmail": "jameswilson@example.com",
            },
            {
                "name": "Urban Gardening Initiative",
                "description": "This initiative seeks to transform underutilized urban spaces into thriving community gardens. The project will create green spaces in vacant lots, rooftops, and public parks, providing residents with the opportunity to grow their own fruits and vegetables, fostering a sense of community, and promoting environmental sustainability. Workshops on urban farming, composting, and sustainable agriculture will be organized to educate participants about cultivating healthy, organic produce. In addition to improving food security, the initiative aims to address urban heat islands and enhance air quality. Collaborations with local schools will incorporate gardening into educational curriculums, instilling environmental consciousness in young minds. The project's ultimate goal is to create a network of urban gardens that supply fresh produce to the community while promoting healthy lifestyles and environmental stewardship.",
                "location": "Downtown District",
                "type": "Community Development",
                "dateCreated": "2024-09-20T09:30:00",
                "fundingGoal": 15000,
                "userEmail": "user@example.com",
            },
            {
                "name": "Youth Tech Empowerment Program",
                "description": "This program is designed to bridge the digital divide by equipping underprivileged youth with essential technological skills. The project will provide free access to laptops, software, and internet connectivity, ensuring students have the tools needed to succeed in an increasingly tech-driven world. Through coding bootcamps, robotics workshops, and digital literacy courses, participants will gain hands-on experience in cutting-edge technologies such as artificial intelligence, web development, and data science. The program also aims to offer mentorship opportunities with industry professionals and internships at local tech companies, paving the way for future career opportunities. By empowering young minds with tech skills, this initiative envisions a more inclusive and digitally proficient community.",
                "location": "Eastside Neighborhood",
                "type": "Education",
                "dateCreated": "2024-11-10T15:45:00",
                "fundingGoal": 30000,
                "userEmail": "user@example.com",
            }


        ];


        const allResponses = []; // Array to hold all responses

        for (const project of fakeRepo) {
            try {
                const res = await axios.post(`${DATA.origin}/projects`,
                    project,
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


    function deleteSpecificProject() {
        if (projectId) {
            axios.delete(`${DATA.origin}/projects/${projectId}`,
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
