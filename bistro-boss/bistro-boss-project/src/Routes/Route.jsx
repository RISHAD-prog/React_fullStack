import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AllMenu from "../pages/AllMenu/AllMenu";
import Shop from "../pages/Shop/Shop/Shop";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute"
import AllUsers from "../components/Admin/AllUsers/AllUsers";
import AddItem from "../components/Admin/AddItem/AddItem";
import ManageItem from "../components/Admin/ManageItem/ManageItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminHome from "../components/Admin/AdminHome/AdminHome";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'menu',
                element: <AllMenu></AllMenu>
            },
            {
                path: 'shop/:category',
                element: <Shop></Shop>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Registration></Registration>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "myCart",
                element: <MyCart></MyCart>
            },
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "addItem",
                element: <AddItem></AddItem>
            },
            {
                path: "manageItem",
                element: <ManageItem></ManageItem>
            },
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "adminHome",
                element: <AdminHome></AdminHome>
            }
        ]
    }
]);

