import { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import img from "../../assets/others/authentication1.png";
import { BsFillArrowLeftCircleFill, BsGoogle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Provider/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
const Login = () => {
    const captchaRef = useRef(null);
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [disable, setDiasble] = useState(true);
    let location = useLocation();
    let navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleCaptchaValue = () => {
        const captcha = captchaRef.current.value;
        console.log(captcha);
        if (validateCaptcha(captcha) === true) {
            setDiasble(false);
        }
    }
    const onSubmit = data => {

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user?.email}has been logged in`,
                    showConfirmButton: false,
                    timer: 1500
                })
                reset();
                navigate(from, { replace: true })
            })
            .catch(error => alert(error.message));
    }
    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user?.displayName}has been logged in`,
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true })
            })
            .catch(error => alert(error.message))
    }
    return (
        <div className="hero min-h-screen bg-base-100 ">
            <div className="hero-content flex-col lg:flex-row-reverse ">
                <div className="text-center lg:text-left">
                    <img src={img} className=' max-w-2xl' ></img>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body" >
                        <h1 className="text-3xl font-bold">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" {...register("email", { required: true })} name="email" className="input input-bordered" />
                            {errors.email?.type === 'required' && <span className=" text-red-500 " >Email field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" {...register("password", { required: true, })} name='password' className="input input-bordered" />
                            {errors.password?.type === 'required' && <span className=" text-red-500 " >Password field is required</span>}
                        </div>
                        <div className="form-control">
                            <LoadCanvasTemplate />
                            <input type="text" name='captcha' ref={captchaRef} placeholder="write the captcha text" className="input input-bordered" onBlur={handleCaptchaValue} />
                        </div>

                        <div className="form-control mt-6">
                            <input type="submit" value="Login" onClick={handleSubmit(onSubmit)} className="btn btn-primary" disabled={disable} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full border-opacity-50">
                        <p>Does not hav an account?<Link to='/register' className=' text-blue-700 ' > Go to Registration</Link></p>
                        <div className="divider">OR</div>
                        <div className="btn btn-outline btn-accen h-12 card bg-base-300 rounded-box place-items-center" onClick={handleGoogle} ><BsGoogle ></BsGoogle></div>
                    </div>
                    <button className='btn btn-secondary' ><Link to='/' className='flex items-center gap-2' ><BsFillArrowLeftCircleFill className='h-20 w-9'  ></BsFillArrowLeftCircleFill>Go back Home</Link></button>

                </div>
            </div>
        </div>
    );
};

export default Login;