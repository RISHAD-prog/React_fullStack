
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../../shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const Menu = () => {
    const [menu] = useMenu();
    const popularItems = menu.filter(item => item.category === 'popular');
    return (
        <div className="mb-24">
            <SectionTitle
                heading={"From our menu"}
                subHeading={"Popular items"}
            >
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {
                    popularItems.map(item => <MenuItem
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