import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Marquee from "@/components/magicui/marquee";

const files = [
    {
        name: "bitcoin.pdf",
        body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
    },
    {
        name: "finances.xlsx",
        body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
    },
    {
        name: "logo.svg",
        body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
    },
    {
        name: "keys.gpg",
        body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
    },
    {
        name: "seed.txt",
        body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
    },
];

const features = [
    {
        Icon: FileTextIcon,
        name: "Save your files",
        description: "We automatically save your files as you type.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-3 row-span-2 lg:row-span-2", background: (
            <p>1</p>
        ),
    },
    {
        Icon: BellIcon,
        name: "Notifications",
        description: "Get notified when something happens.",
        href: "#",
        cta: "Learn more",
        className: "col-span-2 lg:col-span-2 row-span-1 lg:row-span-1",
        background: (
            <p>2</p>
        ),
    },
    {
        Icon: Share2Icon,
        name: "Integrations",
        description: "Supports 100+ integrations and counting.",
        href: "#",
        cta: "Learn more",
        className: "col-span-2 lg:col-span-2 row-span-1 lg:row-span-1",
        background: (
            <p>3</p>
        ),
    },
    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Use the calendar to filter your files by date.",
        className: "col-span-2 lg:col-span-2 row-span-1 lg:row-span-1",
        href: "#",
        cta: "Learn more",
        background: (
            <p>4</p>
        ),
    },

    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Use the calendar to filter your files by date.",
        className: "col-span-2 lg:col-span-2 row-span-1 lg:row-span-1",
        href: "#",
        cta: "Learn more",
        background: (
            <p>5</p>
        ),
    },
    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Use the calendar to filter your files by date.",
        className: "col-span-2 lg:col-span-2 row-span-1 lg:row-span-1",
        href: "#",
        cta: "Learn more",
        background: (
            <></>
        ),
    },
    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Use the calendar to filter your files by date.",
        className: "col-span-2 lg:col-span-2 row-span-1 lg:row-span-1",
        href: "#",
        cta: "Learn more",
        background: (
            <p>7</p>
        ),
    },

];

export function BentoDemo(props) {
    return (
        <BentoGrid>
            {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
            ))}
        </BentoGrid>
    );
}
