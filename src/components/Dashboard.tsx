import TopNav from "./TopNav";
import React from "react";

/**
 * Dummy Seite, um Routing zu testen
 */
export default function Dashboard() {
    return (
        <>
            <TopNav/>
            <div>Ich bin ein protected Dashboard</div>
        </>
    );
}