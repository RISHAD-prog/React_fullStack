
const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="flex space-x-4 space-y-3">
            <img className="w-28" style={{ borderRadius: "0 200px 200px 200px" }} src={image} alt={name} />
            <div>
                <h3 className="uppercase">{name}</h3>
                <p>Price: ${price}</p>
                <p>Recipe: ${recipe}</p>
            </div>
        </div>
    );
};

export default MenuItem;