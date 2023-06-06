import { FaBook, FaCalendarAlt, FaCalendarDay, FaCartPlus, FaHome, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { BsFillBagFill, BsMenuButtonWide, BsMenuUp } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    console.log([isAdmin]);
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content  flex">
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="bg-base-200 text-2xl uppercase " >
                    <p className="ps-8 pt-6" >Bistro-Boss</p>
                    <p className="ps-8">Restaurant</p>
                </div>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/dashboard/admin/home" > <FaHome className=" w-8 h-8" ></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/addItem" > <FaUtensils className=" w-8 h-8" ></FaUtensils> Add Items</NavLink></li>
                                <li><NavLink to="/dashboard/manageItem" > <BsMenuUp className=" w-8 h-8"></BsMenuUp  > Manage Items</NavLink></li>
                                <li><NavLink to="/dashboard/admin/bookings" > <div className="flex items-center" ><FaBook className=" w-8 h-8"></FaBook><div className="badge badge-secondary"> +0</div></div> Manage Bookings</NavLink></li>
                                <li><NavLink to="/dashboard/allUsers" > <FaUsers className=" w-8 h-8"></FaUsers> All Users</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to="/dashboard/userHome" > <FaHome className=" w-8 h-8" ></FaHome> User Home</NavLink></li>
                                <li><NavLink to="/dashboard/reservation" > <FaCalendarAlt className=" w-8 h-8" ></FaCalendarAlt> Reservation</NavLink></li>
                                <li><NavLink to="/dashboard/paymentHistory" > <FaWallet className=" w-8 h-8"></FaWallet  > Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/myCart" > <div className="flex items-center" ><FaCartPlus className=" w-8 h-8"></FaCartPlus><div className="badge badge-secondary">+{cart?.length || 0}</div></div> My Cart</NavLink></li>
                                <li><NavLink to="/dashboard/myBookings" > <FaCalendarDay className=" w-8 h-8"></FaCalendarDay> My Bookings</NavLink></li>
                            </>
                    }
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