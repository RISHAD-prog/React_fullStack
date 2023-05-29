import Featured from "../../Featured/Featured";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Menu from "../Menu/Menu";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Menu></Menu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;