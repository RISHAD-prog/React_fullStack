import { Link } from "react-router-dom";

const ServicesCard = ({ service }) => {
    const { _id, title, img, price } = service;
    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-xl text-orange-500">Price: ${price}</p>
                <div className="card-actions">

                    <button className="btn btn-primary"> <Link to={`/checkout/${_id}`} >Service Details</Link> </button>
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;