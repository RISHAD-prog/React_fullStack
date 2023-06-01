import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    const prevLocation = location.pathname.match('login');
    return (
        <div>
            {prevLocation ? "" : <Navbar></Navbar>}
            <Outlet></Outlet>
            {prevLocation ? "" : <Footer></Footer>}
        </div>
    );
};

export default Main;