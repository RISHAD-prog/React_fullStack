import ServicesCard from "../ServicesCard/ServicesCard";
import { useEffect } from "react";
import { useState } from "react";


const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://car-doc-server-wine.vercel.app/services', {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])
    return (
        <div className="mt-4 mb-10">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className="grid gap-x-10 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    services.map(service => <ServicesCard
                        key={service._id}
                        service={service}
                    ></ServicesCard>)
                }
            </div>
        </div>
    );
};

export default Services;