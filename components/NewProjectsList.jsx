import React from 'react';
import ProjectsList from './ProjectsList';


// Sample usage of the component
const NewProjectsList = () => {
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
        <ProjectsList projects={projects} title="New Projects" />
    );
};

export default NewProjectsList;

