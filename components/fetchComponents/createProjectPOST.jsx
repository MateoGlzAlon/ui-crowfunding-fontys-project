import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";

export default async function createProjectPOST(projectData) {


    const response = await axios.post(`${DATA.origin}/projects`,
        projectData,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }
    );

    console.log("Response es: ", response);
    console.log("Token manager: ", TokenManager.getAccessToken());



    const projectId = response.data.id;

    await Promise.all(
        projectData.images.map((image, index) =>
            axios.post(`${DATA.origin}/projects/images`, {
                projectId,
                imageURL: image,
                imageOrder: index + 1,
            },
                {
                    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                }
            )
        )
    );

    console.log("The project created was: ", response.data);

}
