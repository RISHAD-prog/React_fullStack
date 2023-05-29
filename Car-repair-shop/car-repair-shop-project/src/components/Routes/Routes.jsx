import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import About from "../pages/Home/About/About";
import Services from "../pages/Home/Services/Services";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Checkout from "../pages/Checkout/Checkout";
import PrivateRoutes from "./PrivateRoutes";
import Bookings from "../pages/Bookings/Bookings";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "about",
                element: <About></About>
            },
            {
                path: "services",
                element: <Services></Services>,
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "checkout/:id",
                element: <PrivateRoutes> <Checkout></Checkout></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://car-doc-server-wine.vercel.app/services/${params.id}`)
            },
            {
                path: 'bookings',
                element: <Bookings></Bookings>
            }
        ]
    },
]);
export default router;