import { FaCalendarAlt, FaCalendarDay, FaCartPlus, FaHome, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { BsFillBagFill, BsMenuButtonWide } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import useCart from "../hooks/useCart";
const Dashboard = () => {
    const [cart] = useCart();
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    <li><NavLink to="/dashboard/userHome" > <FaHome className=" w-8 h-8" ></FaHome> User Home</NavLink></li>
                    <li><NavLink to="/dashboard/reservation" > <FaCalendarAlt className=" w-8 h-8" ></FaCalendarAlt> Reservation</NavLink></li>
                    <li><NavLink to="/dashboard/payment" > <FaWallet className=" w-8 h-8"></FaWallet  > Payment History</NavLink></li>
                    <li><NavLink to="/dashboard/myCart" > <div className="flex items-center" ><FaCartPlus className=" w-8 h-8"></FaCartPlus><div className="badge badge-secondary">+{cart?.length || 0}</div></div> My Cart</NavLink></li>
                    <li><NavLink to="/dashboard/myBookings" > <FaCalendarDay className=" w-8 h-8"></FaCalendarDay> My Bookings</NavLink></li>
                    <div className="divider"></div>
                    <li><NavLink to="/" > <FaHome ></FaHome> Home</NavLink></li>
                    <li><NavLink to="/menu" > <BsMenuButtonWide></BsMenuButtonWide> Menu</NavLink></li>
                    <li><NavLink to="/dashboard/shop" > <BsFillBagFill></BsFillBagFill> Shop</NavLink></li>
                    <li><NavLink to="/dashboard/contact" > <TiContacts></TiContacts> Contact</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;