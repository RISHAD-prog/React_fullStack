import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const USER = () => {
    const loadusers = useLoaderData();
    const [users, setUsers] = useState(null);
    const handleDelete = id => {
        fetch(`http://localhost:5000/users/${id}`,
            {
                method: 'DELETE'
            })
            .then(res => res.json())
            .catch(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('deleted successfully');
                    const remaining = users.filter(user => user._id !== id);
                    setUsers(remaining);
                }
            })
    }
    return (
        <div>
            <p>Total user: {loadusers.length} </p>
            {
                loadusers.map(user =>
                    <p key={user._id} >
                        {user.name} : {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button
                            onClick={() => handleDelete(user._id)}
                        >X</button>
                    </p>
                )
            }
        </div>
    );
};

export default USER;