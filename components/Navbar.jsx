import Image from "next/image"
import Link from "next/link"

import { DATA } from "@/app/data"

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'


export default function Navbar() {

    const router = useRouter()

    return (
        <nav className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-500 bg-white">
            <div className="container flex h-full items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={DATA.logoColor} alt="Logo" width={40} height={40} />
                        <span className="text-xl font-bold">{DATA.projectName}</span>
                    </Link>

                    <button type="button" onClick={() => router.push('/demos')} className="border-2 border-black rounded-lg p-2 my-5">
                        DEMOS
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="font-semibold w-32 border-black">
                        Register
                    </Button>
                    <Button variant="default" className="font-semibold w-32">
                        Log in
                    </Button>
                </div>
            </div>
        </nav>
    )
}