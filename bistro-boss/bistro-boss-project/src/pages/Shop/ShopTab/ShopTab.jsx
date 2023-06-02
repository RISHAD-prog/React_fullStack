import { Pagination } from "swiper";
import FoodCard from "../../FoodCard/FoodCard";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ShopTab.css";
import { useState } from "react";
import { useEffect } from "react";

const ShopTab = ({ items }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerpage = 6;
    const totalPage = Math.ceil(items.length / itemsPerpage);
    const pageNumber = [...Array(totalPage).keys()];
    useEffect(() => {
        if (currentPage > 0) {
            const skip = currentPage * itemsPerpage;
            console.log(skip);
            setData(items.slice(skip, skip + 6));
        }
        else {
            setData(items.slice(0, 6));
        }
    }, [currentPage, items])
    const handlePageChange = (index) => {
        setCurrentPage(index);
        console.log(index);
    };
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <div className="my-16">
            <Swiper
                pagination={pagination}
                onSlideChange={(swiper) => handlePageChange(swiper.activeIndex)}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    pageNumber.map(number => <SwiperSlide key={number}  >
                        <div className='grid md:grid-cols-3 gap-10'>
                            {
                                data.map(item =>
                                    <FoodCard
                                        key={item.key}
                                        item={item}
                                    ></FoodCard>
                                )
                            }
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default ShopTab;