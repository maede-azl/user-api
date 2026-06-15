import { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data);
      } catch (err) {
        setError("Failed to load users. Please sign in first.");
        console.log("error: ", err.response.data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-800">Users</h1>
          <p className="text-sm text-gray-500 mt-1">List of all registered users</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        {users.length === 0 && !error && (
          <div className="text-center py-16 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            <p className="text-sm">No users found</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col items-center text-center">

              {user.avatar ? (
                <img
                  src={`http://localhost:3000/${user.avatar.replace(/\\/g, "/")}`}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover mb-4 border border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-700 text-lg font-medium">
                    {user.firstname?.[0]?.toUpperCase()}{user.lastname?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}

              <h2 className="text-base font-medium text-gray-800">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-sm text-gray-400 mb-4">@{user.username}</p>

              <div className="w-full border-t border-gray-100 pt-4 space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                  </svg>
                  <span>{user.phone}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default UserList;