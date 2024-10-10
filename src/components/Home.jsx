import React from "react";
import training from "../assets/training.jpg"
export default function Home() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            margin: 10,
            padding: 10  // Optional: Full viewport height for vertical centering
        }}>

            <img src={training} alt="Personal Training"
                style={{
                    // width: "1000px",
                    height: "auto",

                }} />

        </div>
    )
}