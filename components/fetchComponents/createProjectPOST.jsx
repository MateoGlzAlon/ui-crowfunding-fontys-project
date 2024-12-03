import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";
import { uploadFile } from "../UploadImage";

export default async function createProjectPOST(projectData, files) {
    const fileURLs = [];

    // Create the project
    const response = await axios.post(`${DATA.origin}/projects`,
        projectData,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }
    );

    // Upload files and gather their URLs
    for (const file of files) {
        const uploadedFile = await uploadFile(file); // Await the upload
        if (uploadedFile && uploadedFile.url) {
            fileURLs.push(uploadedFile.url); // Push the resolved URL
        } else {
            console.warn(`File upload failed for file: ${file.name}`);
        }
    }

    console.log("files es: ", files);
    console.log("fileurls es: ", fileURLs);

    const projectId = response.data.id;

    console.log("hola jefe");

    // Attach images to the project
    await Promise.all(
        fileURLs.map((imageURL, index) => {
            const imageOrder = index + 1; // Correctly define imageOrder here
            console.log("projectId es: ", projectId);
            console.log("imageUrl es: ", imageURL);
            console.log("imageOrder es: ", imageOrder);

            axios.post(`${DATA.origin}/projects/images`, {
                projectId: projectId,
                imageURL: imageURL[0], // This should be a single string URL
                imageOrder: imageOrder,
            },
                {
                    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                }
            );
        })
    );

    console.log("The project created was: ", response.data);

    return projectId;
}
