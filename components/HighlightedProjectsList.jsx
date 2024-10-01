import React from 'react';

const HighlightedProjectsList = ({ projects }) => {
    return (
        <div className="flex flex-wrap justify-start">
            {projects.map((project) => (
                <a
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block bg-white p-3 m-0 w-full sm:w-full md:w-1/3 lg:w-1/5 transform transition hover:scale-105"
                >
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4">
                        <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{
                                width: `${project.fundsRaised >= project.fundingGoal
                                    ? '100%'
                                    : `${(project.fundsRaised / project.fundingGoal) * 100}%`
                                    }`,
                            }}
                        ></div>
                    </div>
                    <h3 className="text-base font-bold mt-4">{project.name}</h3>





                    <p className="text-sm text-gray-700 mt-2">
                        ${project.fundsRaised} raised of ${project.fundingGoal}
                    </p>
                </a>
            ))}
        </div>
    );
};

// Sample usage of the component
const App = () => {
    const projects = [
        {
            id: 1,
            name: 'Community Garden Project',
            fundingGoal: 10000,
            fundsRaised: 7500,
            image: 'garden-1.jpg'
        },
        {
            id: 2,
            name: 'School Library Fundraiser',
            fundingGoal: 5000,
            fundsRaised: 3500,
            image: 'library-2.jpg'
        },
        {
            id: 3,
            name: 'Clean Water Initiative',
            fundingGoal: 20000,
            fundsRaised: 30000,
            image: 'water-3.jpg'
        },
        {
            id: 4,
            name: 'Animal Shelter Renovation',
            fundingGoal: 15000,
            fundsRaised: 12000,
            image: 'animal-4.jpeg'
        },
        {
            id: 5,
            name: 'Renewable Energy Campaign',
            fundingGoal: 25000,
            fundsRaised: 18000,
            image: 'energy-5.jpeg'
        }
    ];

    return (

        <div className="mb-10 bg-white border-t-[0.5px] border-slate-300 ml-6">

            <div className="container mx-auto p-0">
                <h2 className="text-3xl font-bold mb-6 mt-10 ">Highlighted Fundraising Projects</h2>

                <HighlightedProjectsList projects={projects} />


            </div>
        </div>
    );
};

export default App;


