import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AllMenu from "../pages/AllMenu/AllMenu";
import Shop from "../pages/Shop/Shop/Shop";

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
            }
        ]
    },
]);

