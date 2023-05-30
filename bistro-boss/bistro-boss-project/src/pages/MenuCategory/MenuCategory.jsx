
import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
    return (
        <div>
            {
                title && <Cover title={title} img={img} ></Cover>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-12 py-6">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
            <button className="border-0 btn btn-outline  border-b-4 " style={{ margin: "12px 41%" }}>Order your Favorite food</button>
        </div>
    );
};

export default MenuCategory;