import SectionTitle from "../../components/SectionTitle/SectionTitle";
import featuredImage from "../../assets/home/featured.jpg";
import moment from "moment/moment";
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-items  my-9 bg-fixed">
            <SectionTitle
                heading={"Featured Item"}
                subHeading={"Check it out"}
            ></SectionTitle>

            <div className="md:flex items-center   justify-center gap-6 pt-12 py-20 px-28">
                <div>
                    <img src={featuredImage} className="max-w-md" alt="" />
                </div>
                <div className="px-24">
                    <h2 className="mb-3">{moment().format("MMM Do YY")}</h2>
                    <p className="mb-3">Where can I get some?</p>
                    <p className="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet hic numquam impedit consequuntur dolores nostrum tempore ad a autem! Error nisi itaque quos pariatur voluptatum sed officia animi! Libero, porro?</p>
                    <button className="btn btn-outline btn-ghost text-white">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;