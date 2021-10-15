import Alert from "react-bootstrap/Alert";

const AlertMessage = ({ info }) => {
    return info === null ? null : (
        <Alert className="error-message" variant={info.type}>
            {info.message}
        </Alert>
    );
};

export default AlertMessage;
