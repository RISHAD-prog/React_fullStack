import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";


const PrivateRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        <div className="radial-progress" style={{ "--value": 70 }}>70%</div>
    }
    if (user?.email) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace>Login</Navigate>
};

export default PrivateRoutes;