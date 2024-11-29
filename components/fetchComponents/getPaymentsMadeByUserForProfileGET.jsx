import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";

export default async function getPaymentsMadeByUserGETForProfile() {

    const userId = TokenManager.getClaims().userId;

    console.log("Userid es:  " + userId)

    const response = await axios.get(`${DATA.origin}/payments/profile/${userId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }
    );


    console.log("The payments GET were: ", response.data);

    return response.data;
}
