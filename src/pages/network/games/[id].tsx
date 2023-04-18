import React from "react";

const apiKey = "AIzaSyBK_NiutcgZetnwf8vRt3W1ombP4UI5Glo";
export function ContestGame() {
    return (
        <div>
            <iframe
                title="MapsVisual"
                width="450"
                height="250"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=3300+West+Camelback+Road,+Phoenix+AZ,+USA`}
                allowFullScreen
            />
        </div>
    );
}
