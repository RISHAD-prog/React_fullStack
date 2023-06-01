import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    const logLocation = location.pathname.match("/login");
    const regLocation = location.pathname.match("/register");
    return (
        <div>
            {logLocation || regLocation ? "" : <Navbar></Navbar>}
            <Outlet></Outlet>
            {regLocation || logLocation ? "" : <Footer></Footer>}
        </div>
    );
};

export default Main;