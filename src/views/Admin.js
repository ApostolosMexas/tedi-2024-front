import React, { useState }  from "react";

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