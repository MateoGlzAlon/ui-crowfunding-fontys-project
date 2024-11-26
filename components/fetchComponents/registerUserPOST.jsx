import axios from "axios";
import { DATA } from "@/app/data";

export default async function (fullName, email, password, role = "user", profilePicture) {

    const response = await axios.post(`${DATA.origin}/users`, {

        name: fullName,
        email: email,
        password: password,
        role: role,
        profilePicture: profilePicture

    });

    console.log("The user created was: ", response.data);

}
