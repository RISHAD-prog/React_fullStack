import { Helmet } from "react-helmet-async";
import MenuBanner from "../MenuBanner/MenuBanner";
import MenuCategory from "../MenuCategory/MenuCategory";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import useMenu from "../../hooks/useMenu";
const AllMenu = () => {
    const [menu] = useMenu([]);
    const offeredItems = menu.filter(item => item.category === 'offered');
    const dessertItems = menu.filter(item => item.category === 'dessert');
    const pizzaItems = menu.filter(item => item.category === 'pizza');
    const saladItems = menu.filter(item => item.category === 'salad');
    const soupItems = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <MenuBanner img={menuImg} title="our menu" ></MenuBanner>
            <SectionTitle
                heading={"Today's Offer"}
                subHeading={"Don't miss"}
            ></SectionTitle>
            <MenuCategory items={offeredItems} ></MenuCategory>
            <MenuCategory items={dessertItems} title={"dessert"} img={dessertImg}></MenuCategory>
            <MenuCategory items={pizzaItems} title={"pizza"} img={pizzaImg}></MenuCategory>
            <MenuCategory items={saladItems} title={"salad"} img={saladImg}></MenuCategory>
            <MenuCategory items={soupItems} title={"soup"} img={soupImg}></MenuCategory>
        </div>
    );
};

export default AllMenu;