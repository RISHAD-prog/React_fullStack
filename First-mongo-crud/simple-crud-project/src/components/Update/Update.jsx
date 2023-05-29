import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser = useLoaderData();

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser, loadedUser._id);
        fetch(`http://localhost:5000/users/${loadedUser._id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            }
        )
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('user updated successfully');
                }
            }
            )
    }
    return (
        <div>
            <p>Updated user is {loadedUser.name}</p>
            <h1>Updating the user</h1>
            <form onSubmit={handleUpdate} >
                <input type="text" name="name" id="" defaultValue={loadedUser?.name} /><br />
                <input type="email" name="email" id="" defaultValue={loadedUser?.email} /><br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;