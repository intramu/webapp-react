import React from "react";
import { Button, Card, CardText, CardTitle, Col } from "reactstrap";

function TeamCard({ team }: any) {
    // const joinTeam = () => {};
    return (
        <Col sm="8">
            <Card body>
                <CardTitle tag="h5">{team.name}</CardTitle>
                <CardText>{team.sport}</CardText>
                <Button>Leave Team</Button>
            </Card>
        </Col>
    );
}

export default TeamCard;
