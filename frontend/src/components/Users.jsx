import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [debounce, setDebounce]= useState(filter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(filter); 
    }, 500); 
  
    return () => {
      clearTimeout(handler); 
    };
  }, [filter]);


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + debounce)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="bg-gray-100 p-1 sm:p-3 rounded-2xl mt-5">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <button  onClick={(e) => {
                navigate("/sendmoney?id=" + user._id + "&name=" + user.firstName);
            }}  class=" hover:before:bg-[#1976d2] border-[#1976d2] relative h-[30px] sm:h-[40px] w-12 sm:w-20 overflow-hidden border bg-white px-2 my-2 text-[#1976d2] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#1976d2] before:transition-all before:duration-500 hover:text-white hover:shadow-[#1976d2] hover:before:left-0 hover:before:w-full">
          <span class="relative z-10">Send</span>
        </button>
      </div>
    </div>
  );
}
