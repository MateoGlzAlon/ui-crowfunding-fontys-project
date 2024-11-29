import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";


export default async function getUserDataForProjectPageGET(userId) {
    const response = await axios.get(`${DATA.origin}/users/project/${userId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }
    )

    console.log("Profile picture is:  ", response.data)
    return response.data;
}