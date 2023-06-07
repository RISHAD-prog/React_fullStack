import { Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useEffect } from "react";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => setReview(data))
            .catch(error => alert(error.message))
    }, [])
    return (
        <div className="py-24">
            <SectionTitle
                subHeading={"What our client say?"}
                heading={'Testimonials'}
            ></SectionTitle>
            <div className=" mx-64" >
                <FaQuoteLeft className="mx-48 w-28 h-80" ></FaQuoteLeft>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="mySwiper"
            >

                {
                    review.map(data => <SwiperSlide
                        key={data._id}
                    >
                        <div className=" flex flex-col  items-center px-24 py-16 ">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={data.rating}
                                readOnly
                            />
                            <p className="py-8">{data.details}</p>
                            <h2 className="text-4xl text-orange-500">{data.name}</h2>
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    );
};

export default Testimonial;