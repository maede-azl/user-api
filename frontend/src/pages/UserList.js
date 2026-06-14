import { useState, useEffect } from "react";
import axios from "axios";

function UserList(){
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const token = localStorage.getItem("token");
                console.log("Token : ", token);

                const res = await axios.get("http://localhost:3000/users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Response : ", res.data);
                setUsers(res.data.data);
            } catch(err) {
                console.log("error: ", err.response.data);
            }
        };

        fetchUsers();
    }, []);


    return (
        <div>
            <h1>User List</h1>

            {users.map((user) => (
            <div key={user.id}>
                {user.avatar && (
                  <img src={`http://localhost:3000/${user.avatar.replace(/\\/g, "/")}`} alt="avatar" width={50} />
                )}
                <p>Name: {user.firstname} {user.lastname}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>UserName: {user.username}</p>
                <hr />
            </div>
            ))}
        </div>
    );
}

export default UserList;