import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();


  useEffect(() =>
  {
    const token =localStorage.getItem("token");
    if(token)
    {
      navigate("/dashboard");
    }
  },[navigate]);
  const [formData, setFormData] = useState({

    email: "",
    password: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,

    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await loginUser(formData);
  console.log(response);
      localStorage.setItem(
        "token",
        response.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          PrepSync Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>

          <div>

            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>


          <p className="mt-4 text-center">
  Don't have an account?
  <a
    href="/register"
    className="text-blue-600 ml-1"
  >
    Register
  </a>
</p>

        </form>

      </div>

    </div>
  )
}

export default Login