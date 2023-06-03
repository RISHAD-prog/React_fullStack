import { Link, useNavigate } from "react-router-dom";
import login_img from "../../assets/others/authentication2.png";
import { useContext } from "react";
import { AuthContext } from "../../components/Provider/AuthProvider/AuthProvider";
import { BsGoogle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const Registration = () => {
    const { createUser, googleSignIn, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const addUser = (name, email, image) => {
        const userData = { name: name, email: email, image: image };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(() => {

            })
            .catch(error => alert(error.message))
    }
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        addUser(data.name, data.email, data.photoUrl);
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Welcome!!!${user?.displayName}`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                navigate('/');

            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}. try use new email and name`
                })
            });
    }
    const handleGoogle = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                addUser(user.displayName, user.email, user.photoURL);
                navigate('/');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}. try use new email and name`

                })
            })
    }
    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left mr-10">
                    <img src={login_img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <h1 className="text-5xl font-bold">Registration </h1>
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true, minLength: 7, maxLength: 20 })} placeholder="name" name="name" className="input input-bordered" />
                                {errors.name?.type === 'required' && <span className=" text-red-500 " >Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoUrl</span>
                                </label>
                                <input type="text" {...register("photoUrl", { required: true })} placeholder="Give the URL" className="input input-bordered" />
                                {errors.photoUrl?.type === 'required' && <span className=" text-red-500 " >PhotoURL field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" name="email" className="input input-bordered" />
                                {errors.email?.type === 'required' && <span className=" text-red-500 " >Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9])(?=.*[a-z])/ })} placeholder="password" name="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className=" text-red-500 " >Password field is required</span>}
                                {errors.password?.type === 'minLength' && <span className=" text-red-500 " >Password must have 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className=" text-red-500 " >Password must be less than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className=" text-red-500 " >Password must have at least one uppercase letter, one lowercase letter, one number and one special character</span>}
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