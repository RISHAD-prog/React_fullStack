import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/Provider/AuthProvider/AuthProvider";
import { BsCartPlusFill } from "react-icons/bs";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
            .then()
            .catch(error => alert(error.message))
    }
    return (
        <div className="navbar fixed z-10 bg-opacity-30 text-white bg-black max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/" >Home</Link></li>
                        <li >
                            <Link to="/menu" >Menu</Link>
                        </li>
                        <li><Link to="/shop/salad" >Our Shop</Link></li>
                        <li><Link to="/addtoCart" > <button className="btn">
                            <BsCartPlusFill></BsCartPlusFill>
                            <div className="badge badge-secondary">+99</div>
                        </button> </Link></li>
                    </ul>
                </div>
                <div className="inline-block">
                    <button className=" text-2xl font-bold">Bistro Boss</button>
                    <p className="text-xl" >RESTAURANT</p>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" >Home</Link></li>
                    <li >
                        <Link to="/menu" >Menu</Link>
                    </li>
                    <li><Link to="/shop/salad" >Our Shop</Link></li>
                    <li><Link to="/addtoCart" > <button className="btn btn-outline btn-error">
                        <BsCartPlusFill className="w-6 h-6 mr-1 relative" ></BsCartPlusFill>
                        <div className=" badge badge-error">+0</div>
                    </button> </Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="flex gap-2" > <div className="avatar online">
                        <div className="w-12 h-12 rounded-full">
                            <img src={user?.photoURL} className=" object-scale-down " />
                        </div>
                    </div> <button className="btn btn-outline btn-warning " onClick={handleLogout} >Logout</button></div> : <Link to="/login" className="btn btn-outline btn-warning" >Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;