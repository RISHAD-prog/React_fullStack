import { useEffect } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useState } from "react";
import MenuItem from "../../../shared/MenuItem/MenuItem";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular');
                setMenu(popularItems);
            })
            .catch(error => alert(error.message))
    }, [])
    return (
        <div className="mb-24">
            <SectionTitle
                heading={"From our menu"}
                subHeading={"Popular items"}
            >

            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {
                    menu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
        </div>
    );
};

export default Menu;