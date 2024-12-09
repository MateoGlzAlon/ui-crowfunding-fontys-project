import axios from "axios";
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";

export default async function updateProfilePicture(userId, newPicture) {

    console.log("la cose es : ", newPicture[0])
    try {
        const response = await axios.post(`${DATA.origin}/users/picture/${userId}`,
            { "newPicture": newPicture[0] },
            {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
            }
        );

        if (response.status === 200 && response.data === true) {
            console.log("Profile picture updated successfully:", response.data);
        } else {
            console.error("Update failed:", response.data);
        }
    } catch (error) {
        console.error("Error updating profile picture:", error.response?.data || error.message);
    }
};

