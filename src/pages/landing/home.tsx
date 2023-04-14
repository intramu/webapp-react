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
                <button className="button">Find out why</button>
            </section>
            <section id="mobile-app">
                <span className="table-header">The Intramu mobile app:</span>
                <div className="line" />

                <div className="two-container">
                    <div className="two-content">
                        <h1>Lorem ipsum</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
                            rerum dignissimos veritatis repellat vero eaque excepturi, officia velit
                            distinctio a veniam quasi nisi alias perspiciatis nam dolore debitis
                            inventore explicabo.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
                            rerum dignissimos veritatis repellat vero eaque excepturi, officia velit
                            distinctio a veniam quasi nisi alias perspiciatis nam dolore debitis
                            inventore explicabo. Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Voluptatum quam eaque ab voluptates, porro quos fuga dicta eius
                            quasi. Consequuntur accusantium totam placeat nisi praesentium minus
                            deleniti optio error ad.
                        </p>
                    </div>

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
                </div>
            </section>
            <section id="schools-testimonials">
                <div>
                    <span className="table-header">Schools: </span>
                    <div className="line" />
                </div>
                <div>
                    <span className="table-header">Testimonials:</span>
                    <div className="line" />
                </div>
            </section>
        </div>
    );
}
