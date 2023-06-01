import { Link } from "react-router-dom";
import login_img from "../../assets/others/authentication2.png";
import { useContext } from "react";
import { AuthContext } from "../../components/Provider/AuthProvider/AuthProvider";
import { BsGoogle } from "react-icons/bs";
const Registration = () => {
    const { createUser, googleSignIn } = useContext(AuthContext)
    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => console.log(error));
    }
    const handleGoogle = () => {
        googleSignIn()
            .then()
            .catch(error => alert(error.message))
    }
    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left mr-10">
                    <img src={login_img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <h1 className="text-5xl font-bold">Registration </h1>
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" name="password" className="input input-bordered" />

                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Register" />
                            </div>
                        </form>
                        <div className="flex flex-col w-full border-opacity-50">
                            <p>Already have an account ?Goto <Link to="/login" className=" text-blue-600 " >Login</Link></p>
                            <div className="divider">OR</div>
                            <div className="btn btn-outline btn-accen h-12 card bg-base-300 rounded-box place-items-center" onClick={handleGoogle} ><BsGoogle ></BsGoogle></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;