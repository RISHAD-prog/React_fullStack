import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import img from "../../assets/others/authentication1.png";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
const Login = () => {
    const captchaRef = useRef(null);
    const [disable, setDiasble] = useState(true)
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
    const handleForm = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

    }
    return (
        <div className="hero min-h-screen bg-base-100 px-16">
            <div className="hero-content flex-col lg:flex-row-reverse px-10">
                <div className="text-center lg:text-left">
                    <img src={img}  ></img>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ms-12 ">
                    <div className="card-body">
                        <form onSubmit={handleForm} >
                            <h1 className="text-3xl font-bold">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" name="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <LoadCanvasTemplate />
                                <input type="text" name='captcha' ref={captchaRef} placeholder="write the captcha text" className="input input-bordered" onBlur={handleCaptchaValue} />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={disable}>Login</button>
                            </div>
                        </form>
                        <button  ><Link to='/' className='flex items-center gap-2' ><BsFillArrowLeftCircleFill className='h-20 w-9'  ></BsFillArrowLeftCircleFill>Go back Home</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;