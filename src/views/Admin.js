import React, { useState }  from "react";
import { Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import UserTable from "../components/UserTable";

const Admin = () => {

    return (
        <Row>
            <Col>
            <Card>
                <CardHeader>
                    <h4>Χρήστες</h4>
                </CardHeader>
                <CardBody >
                    <UserTable/>
                </CardBody>
            </Card>
            </Col>
        </Row>
    );
};

export default Admin;