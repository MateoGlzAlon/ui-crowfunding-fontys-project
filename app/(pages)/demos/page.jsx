"use client";
import CreateDemoprojects from "@/components/toBeRemoved/createDemoProjects";
import CreateDemoUsers from "@/components/toBeRemoved/createDemoUsers";
import CreateDemoPayments from "@/components/toBeRemoved/createDemoPayments";
import CreateDemoProjectImages from "@/components/toBeRemoved/createDemoProjectImages";
import Tests3db from "@/components/toBeRemoved/Tests3db";

const { default: PageFrame } = require("@/components/generalComponents/navbar/PageFrame");



function Demo() {

    return (
        <PageFrame>
            <div className="mt-20">

                <Tests3db />

                <CreateDemoUsers />

                <CreateDemoprojects />

                <CreateDemoPayments />

                <CreateDemoProjectImages />

            </div>
        </PageFrame>
    );
}
export default Demo;