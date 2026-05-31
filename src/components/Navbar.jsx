import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/",{replace:true});
    window.location.reload();
  };

  return (

    <div className="flex justify-between items-center bg-white shadow px-6 py-4">

      <h1 className="text-2xl font-bold text-blue-600">
        PrepSync
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar;