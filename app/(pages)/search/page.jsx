"use client";
import CreateDemoprojects from "@/components/createDemoProjects";
import CreateDemoUsers from "@/components/createDemoUsers";
import CreateDemoPayments from "@/components/createDemoPayments";
import CreateDemoProjectImages from "@/components/createDemoProjectImages";
import Tests3db from "@/components/Tests3db";
import PageFrame from "@/components/PageFrame";
import SearchProjectList from "@/components/SearchProjectList";



function Demo() {

    return (
        <PageFrame>
            <SearchProjectList />
        </PageFrame>
    );
}
export default Demo;