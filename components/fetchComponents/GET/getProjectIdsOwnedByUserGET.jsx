import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";

export default async function getProjectIdsOwnedByUserGET() {

    const userId = TokenManager.getClaims().userId;

    console.log("Userid es:  " + userId)

    const response = await axios.get(`${DATA.origin}/projects/users/id/${userId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }
    );


    console.log("The project ids GET were: ", response.data);

    return response.data;
}
