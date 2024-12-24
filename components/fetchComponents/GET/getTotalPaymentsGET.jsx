import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";


export default async function getTotalPaymentsGET(userId, timeFilter) {

    console.log("Time filter 1 is:  ", timeFilter)

    const response = await axios.get(`${DATA.origin}/payments/totalPayments/${userId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
            params: { time: timeFilter },
        },
    )

    console.log("Time filter is:  ", response.data)
    return response.data;
}