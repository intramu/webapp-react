import React, { useState } from "react";
import { Button, Card, CardText, CardTitle, Col, Collapse } from "reactstrap";
import { Team } from "../../interfaces/Team";
import Roster from "./Roster";

export interface TeamCardProps {
    team: Team;
}

function TeamCard(props: TeamCardProps) {
    const {
        team: { name, sport, players },
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    // const joinTeam = () => {};

    return (
        <Col sm="8">
            <img
                alt="Sample"
                src="https://images.squarespace-cdn.com/content/v1/57cf0443b3db2b3b65f68234/1528861556160-8FW60LWBNPJXMJZ3G8XH/custom-soccer-crest-template-for-sale-by-jordan-fretz-8.jpg?format=750w"
            />
            <Card body>
                <CardTitle tag="h5">{name}</CardTitle>
                <CardText>{sport}</CardText>
                <Button color="primary" onClick={() => setIsOpen((x) => !x)}>
                    Toggle
                </Button>
                <Collapse isOpen={isOpen}>
                    <Roster players={players} />
                    {/* Calender */}
                    {/* Schedule */}
                    {/* Stats */}
                    <p>Hello World!</p>
                </Collapse>

                <Button>Leave Team</Button>
            </Card>
        </Col>
    );
}

export default TeamCard;
