import React from "react";

export function Home() {
    return (
        <div id="landing">
            <section id="section-one">
                <div id="banner" />
                <span id="intro">
                    <span>
                        <b>INTRAMU</b>
                    </span>
                    <span>
                        {" "}
                        is the better solution to managing intramural sports league systems
                    </span>
                </span>
                <button>Find out why</button>
            </section>
            <section id="section-two">
                <h1>The Intramu mobile app</h1>
                <hr />
                <div id="phone-list">
                    <div id="phone">
                        <div id="phone-top" />
                        <div id="phone-bottom" />
                    </div>
                    <div id="phone">
                        <div id="phone-top" />
                        <div id="phone-bottom" />
                    </div>
                    <div id="phone">
                        <div id="phone-top" />
                        <div id="phone-bottom" />
                    </div>
                </div>
            </section>
            <section id="section-three">
                <div>
                    <h2>Schools: </h2>
                    <hr />
                </div>
                <div>
                    <h2>Testimonials:</h2>
                    <hr />
                </div>
            </section>
        </div>
    );
}
