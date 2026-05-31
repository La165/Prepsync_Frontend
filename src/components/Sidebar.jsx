import { NavLink } from "react-router-dom";


function Sidebar()
{
    return (
<div className="w-64 h-screen bg-gray-900 text-white p-5">

    <h1 className="text-2xl font-bold mb-10">
        PrepSync
    </h1>

    <nav className="flex flex-col gap-4">

        <NavLink to="/dashboard"
        end
        className={({isActive})=>
            isActive ?"bg-blue-600 p-2 rounded-lg" 
            :"hover:bg-gray-700 p-2 rounded-lg"}>
            Dashboard
        </NavLink>

        <NavLink to="/dashboard/profile"
        className={({isActive})=> isActive?
        "bg-blue-600 p-2 rounded-lg" :"hover:bg-gray-700 p-2 rounded-lg"}>
            Profile
        </NavLink>

        <NavLink to="/dashboard/subjects"
        className={({isActive}) =>
            isActive?"bg-blue-600 p-2 rounded-lg"
        :"hover:bg-gray-700 p-2 rounded-lg"}>
            Subjects
        </NavLink>

<NavLink
  to="/dashboard/weak-areas"
  className={({ isActive }) =>
    isActive
      ? "bg-blue-600 p-2 rounded-lg"
      : "hover:bg-gray-700 p-2 rounded-lg"
  }
>
  Weak Areas
</NavLink>


<NavLink
  to="/dashboard/study-plan"
  className={({ isActive }) =>
    isActive
      ? "bg-blue-600 p-2 rounded-lg"
      : "hover:bg-gray-700 p-2 rounded-lg"
  }
>
  Study Plan
</NavLink>


<NavLink
  to="/dashboard/topics"
  className={({ isActive }) =>
    isActive
      ? "bg-blue-600 p-2 rounded-lg"
      : "hover:bg-gray-700 p-2 rounded-lg"
  }
>
  Topics
</NavLink> 

<NavLink
  to="/dashboard/revision"
  className={({isActive}) =>
    isActive
      ? "bg-blue-600 p-2 rounded-lg"
      : "hover:bg-gray-700 p-2 rounded-lg"
  }
>
  Revision Queue
</NavLink>




    </nav>
 </div>
    )
}


export default Sidebar;