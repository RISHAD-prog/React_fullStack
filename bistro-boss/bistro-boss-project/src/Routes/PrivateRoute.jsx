import { useContext } from "react";
import { AuthContext } from "../components/Provider/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        <div className="radial-progress text-primary" style={{ "--value": 70 }}>70%</div>
    }
    else if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace ></Navigate>
};

export default PrivateRoute;