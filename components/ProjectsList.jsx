const ProjectsList = ({ projects, title }) => {
    return (
        <div className="mb-10 bg-white ">
            <div className="container mx-auto p-0">
                <h2 className="text-3xl font-bold mb-6 mt-10 ml-2">{title}</h2>

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


            </div>
        </div>
    );
};

export default ProjectsList;