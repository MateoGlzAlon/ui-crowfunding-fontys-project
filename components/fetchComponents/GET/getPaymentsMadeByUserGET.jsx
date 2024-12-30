import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";

export default async function getPaymentsMadeByUserGET() {

    const userId = TokenManager.getClaims().userId;

    const response = await axios.get(`${DATA.origin}/payments/profile/${userId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }
    );

    return response.data;
}
