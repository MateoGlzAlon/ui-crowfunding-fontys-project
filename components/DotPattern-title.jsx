import SparklesText from "@/components/magicui/sparkles-text";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";


function DotPatternAndTitle() {

    return (
        <div>
            <div className="relative flex h-[500px] flex-col items-center justify-center overflow-hidden  ">
                <div className="z-10 whitespace-pre-wrap text-center text-5xl font-bold tracking-tighter text-black dark:text-white bg-white rounded-full px-8 py-9   from-white">
                    <span className="text-lg bg-black  ">
                        <SparklesText
                            text={`Bring your favourite\nprojects to life`}
                            colors={{ first: '#2a44f8', second: '#ffff00' }}
                            sparklesCount={8}
                        />
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 ">
                <DotPattern
                    width={40}
                    height={40}
                    cr={2}
                    className={cn(
                        "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] -z-10 -top-[290px]",
                    )}
                />
            </div>
        </div>
    )
}

export default DotPatternAndTitle