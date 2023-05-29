import { Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
    return (
        <section>
            <SectionTitle
                subHeading={"--From 10am to 11pm--"}
                heading={"Order Online"}
            ></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide>
                    <img src={slide1} />
                    <p className='text-4xl text-center uppercase text-white -mt-16' >Salads</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} />
                    <p className='text-4xl text-center uppercase text-white -mt-16' >Pizza</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} />
                    <p className='text-4xl text-center uppercase text-white -mt-16' >Soups</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} />
                    <p className='text-4xl text-center uppercase text-white -mt-16' >Deserts</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} />
                    <p className='text-4xl text-center uppercase text-white  -mt-16' >Salads</p>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;