import axios from "axios";
import { DATA } from "@/app/data";

export default async function (fullName, email, password, role = "user") {

    const response = await axios.post(`${DATA.origin}/users`, {

        name: fullName,
        email: email,
        password: password,
        role: role

    });

    console.log("The user created was: ", response.data);

}
