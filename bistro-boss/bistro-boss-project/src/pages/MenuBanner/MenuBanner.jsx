const MenuBanner = ({ img }) => {
    return (
        <div className="hero h-[500px]" style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl ">Our Menu</h1>
                    <p className="mb-5">Would like to try our delicious Items?</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default MenuBanner;