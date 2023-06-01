
const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (

        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div><img src={image} alt="Shoes" /></div>
            <p className="absolute top-0 right-0 mr-4" >{price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>

    );
};

export default FoodCard;