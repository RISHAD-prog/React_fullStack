import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Checkout = () => {
    const services = useLoaderData();
    const { _id, title, price, img } = services;
    const { user } = useContext(AuthContext);
    const handleBookservice = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = user?.email;
        const date = form.date.value;
        const amount = form.amount.value;
        const bookDetails = { customerName: name, email, date, price: amount, service: title, service_id: _id, img };
        fetch('https://car-doc-server-wine.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("booking is successfull");
                }
            })

    }
    return (

        <div>
            <div className="card-body">
                <h1 className="text-5xl font-bold">Book service : {title} </h1>
                <form onSubmit={handleBookservice} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" name="amount" defaultValue={price} placeholder="amount" className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-block">Book Services</button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;