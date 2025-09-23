import { Suspense } from "react";
import ExtractedInfoCard from "./ExtractedInfoCard";

export default function AboutPage() {
    return (
        <Suspense fallback={<p>Loading extracted info...</p>}>
            <ExtractedInfoCard />
        </Suspense>
    );
}
