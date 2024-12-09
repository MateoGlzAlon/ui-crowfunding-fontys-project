import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";


export default async function getSpecificUserById(userId) {
    const response = await axios.get(`${DATA.origin}/users/${userId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }
    )

    console.log("Response is:  ", response.data)
    return response.data;
}