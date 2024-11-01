"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { format } from 'date-fns';
import fetchDonationsListData from "./fetchComponents/fetchDonationsListData";

const Notification = ({ backerEmail, amountFunded, paymentDate, paymentId }) => (
    <figure
        className={cn(
            "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-2",
            "transition-all duration-1000 ease-in-out hover:scale-[103%]",
            "bg-white shadow-sm dark:bg-transparent dark:backdrop-blur-md dark:border dark:border-opacity-10"
        )}
    >
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-2xl">
                <img src="https://placehold.co/600x400?text=Icon" alt="icon" className="object-cover" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <figcaption className="text-base font-medium dark:text-white">
                    <span>{amountFunded}€</span>
                    <span className="mx-1">·</span>
                    <span>id: {paymentId} - {backerEmail}</span>
                </figcaption>
                <p className="text-sm font-normal dark:text-white/60">
                    {format(new Date(paymentDate), 'dd/MM/yyyy')}
                </p>
            </div>
        </div>
    </figure>
);

export function DonorsList({ className, projectId }) {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (projectId) {
                console.log(`Fetching donations for project ID: ${projectId}`);
                const data = await fetchDonationsListData(projectId);
                setDonations(data);
            }
        };
        fetchData();
    }, [projectId]);

    return (
        <div className={cn("relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg bg-background", className)}>
            <AnimatedList>
                {donations.map((item, idx) => (
                    <Notification {...item} key={idx} />
                ))}
            </AnimatedList>
        </div>
    );
}
