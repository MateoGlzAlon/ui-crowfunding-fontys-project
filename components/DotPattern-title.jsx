import SparklesText from "@/components/magicui/sparkles-text";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

import { DATA } from "@/app/data";


function DotPatternAndTitle() {

    return (
        <div>
            <div className="relative flex h-[500px] flex-col items-center justify-center overflow-hidden  ">
                <div className="z-10 whitespace-pre-wrap text-center text-5xl font-bold tracking-normal text-black dark:text-white bg-white rounded-full px-12 py-10 from-white">
                    <span className="text-lg bg-black  ">
                        <SparklesText
                            text={DATA.heroTitle}
                            colors={{ first: '#2a44f8', second: '#ffff00' }}
                            sparklesCount={8}
                        />
                    </span>
                </div>
            </div>

            <div className="">
                <DotPattern
                    width={40}
                    height={40}
                    cr={2}
                    className={cn(
                        "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] -z-10 -top-[200px]",
                    )}
                />
            </div>
        </div>
    )
}

export default DotPatternAndTitle