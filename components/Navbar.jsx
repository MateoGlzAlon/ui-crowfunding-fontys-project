import Image from "next/image";


function Navbar() {
    return (
        <div className="absolute inset-0 z-10 h-16 border-b-[0.5px] border-slate-300 bg-white">
            <div className="mx-20">
                <div className="absolute transform align-middle left-8">



                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <a href="/">
                        <Image src="/logo.svg" alt="logo" width={60} height={60} />
                    </a>
                </div>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center space-x-4 align-middle ">
                    <button className="shadow-[inset_0_0_0_2px_#616467] text-black text-sm px-6 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration- h-10 w-40">
                        Register
                    </button>

                    <button className="shadow-[inset_0_0_0_2px_#616467] text-white text-sm px-6 py-2 rounded-full tracking-widest uppercase font-bold bg-black hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 h-10 w-40">
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar