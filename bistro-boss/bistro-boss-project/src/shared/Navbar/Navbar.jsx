import { Link } from "react-router-dom";

const Navbar = () => {
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
                        <li><Link to="/login" >Login</Link></li>
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
                    <li><Link to="/login" >Login</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn  btn-outline btn-ghost text-white">Get started</a>
            </div>
        </div>
    );
};

export default Navbar;