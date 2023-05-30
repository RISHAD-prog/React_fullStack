import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import shopImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../../shared/Cover/Cover";
import { Helmet } from "react-helmet-async";
import 'react-tabs/style/react-tabs.css';
import ShopTab from "../ShopTab/ShopTab";
import useMenu from "../../../hooks/useMenu";
import { useParams } from "react-router-dom";
const Shop = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover img={shopImg} title="Our Shop"></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <ShopTab items={salad}></ShopTab>
                </TabPanel>
                <TabPanel>
                    <ShopTab items={pizza}></ShopTab>
                </TabPanel>
                <TabPanel>
                    <ShopTab items={soup}></ShopTab>
                </TabPanel>
                <TabPanel>
                    <ShopTab items={desserts}></ShopTab>
                </TabPanel>
                <TabPanel>
                    <ShopTab items={drinks}></ShopTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Shop;