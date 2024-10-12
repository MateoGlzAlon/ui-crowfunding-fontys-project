"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/magicui/animated-list"
import axios from "axios"
import { format } from 'date-fns';


import { DATA } from "@/app/data"



const Notification = ({ backerEmail, amountFunded, paymentDate, paymentId }) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-2",
                // animation styles
                "transition-all duration-1000 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl"
                >
                    <img src="https://placehold.co/600x400?text=Icon" alt="icon" className="object-cover" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                        <span className="text-sm sm:text-lg">{amountFunded}€</span>
                        <span className="mx-1">·</span>
                        <span className="text-sm sm:text-lg">id:{paymentId}-{backerEmail}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        {format(new Date(paymentDate), 'dd/MM/yyyy')}
                    </p>
                </div>
            </div>
        </figure>
    )
}

export function DonorsList({ className, projectId }) {


    const [donations, setDonations] = useState([]);

    useEffect(() => {

        const getDonations = async () => {
            try {
                const response = await axios.get(`${DATA.origin}/payments/projects/${projectId}`);
                setDonations(response.data);
                console.log(response.data); // Log the fetched project data
            } catch (error) {
                console.error("Failed to fetch project donations:", error);
            }
        };
        getDonations();

    }, []);



    return (
        <div
            className={cn(
                "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg bg-background",
                className
            )}
        >
            <AnimatedList>
                {donations.map((item, idx) => (
                    <Notification {...item} key={idx} />
                ))}
            </AnimatedList>
        </div>
    )
}
