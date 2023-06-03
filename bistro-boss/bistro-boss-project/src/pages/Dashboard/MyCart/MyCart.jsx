import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import { GrTrash } from "react-icons/gr";
import Swal from "sweetalert2";

const MyCart = () => {
    const [cart, refetch] = useCart();
    let sum = 0;
    for (let i = 0; i < cart?.length; i++) {
        sum = sum + cart[i].price;
    }
    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/cart/${item._id}`,
                    {
                        method: "DELETE"
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your item has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div className=" mx-auto" >
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <SectionTitle
                className="ms-0"
                heading={"--My Cart--"}
                subHeading={"Want to add more?"}
            ></SectionTitle>

            <div className="overflow-x-auto">
                <div className="flex justify-between items-center uppercase" >
                    <h1 className="font-bold text-2xl" >Total Orders:{cart?.length}</h1>
                    <h2 className="font-bold text-2xl" >Total Price: ${sum}</h2>
                    <button className="btn btn-outline btn-primary  rounded mb-2" >Pay</button>
                </div>
                <table className="table ">
                    <thead  >
                        <tr  >
                            <th>
                            </th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                < tr key={item._id} >
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><div className="text-sm ">{item.name}</div></td>
                                    <td><div className="text-sm font-bold">${item.price}</div></td>
                                    <td><button className="btn btn-error" onClick={() => handleDelete(item)} ><GrTrash className="w-6 h-6" ></GrTrash></button></td>
                                    <th>
                                        <button className="btn btn-outline  btn-primary btn-xl ">details</button>
                                    </th>
                                </tr >
                            )
                        }
                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default MyCart;