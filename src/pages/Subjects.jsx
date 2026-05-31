import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { createTask, deleteTask, getTasks, updateTask } from "../services/subjectService";

function Subjects() {

  const [task, setTask] = useState("");
  const[filter,setFilter]=useState("all");
  const[search,setSearch]=useState("");
  const [editId,setEditId]=useState(null);
  const [editText,setEditText]=useState("");
const [tasks, setTasks] = useState([]);

const [priority, setPriority] = useState("MEDIUM");

const [dueDate, setDueDate] = useState("");

const [sortBy, setSortBy] = useState("latest");


const fetchTasks=async () =>
{
  try{
    const data=await getTasks();

    setTasks(data);
  }
  catch(error)
  {
    console.log(error);
  }
};


useEffect(() =>
{
  fetchTasks();
},[]);
  const handleAddTask = async () => {

    if (task.trim() === "") return;

    try {
    const newTask = await createTask({name:task,
      completed:false,
      priority:priority,
      dueDate:dueDate,
    });
     
    setTasks([...tasks, newTask]);
    setTask("");
    setPriority("MEDIUM");
    setDueDate("");

  }catch (error)
  {
    console.log(error);
  }
};

  const handleDelete = async (id) => {
try{
  await deleteTask(id);
    const updatedTasks =
      tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
  }catch(error)
  {
    console.log(error);
  }
};

  const handleToggle = async (id) => {
    const taskToUpdate =
    tasks.find(
      (task) =>
        task.id === id
    );

  const updatedTask = {

    ...taskToUpdate,

    completed:
      !taskToUpdate.completed,
  };
try{
  await updateTask(id,updatedTask);


    const updatedTasks = tasks.map((task) =>

      task.id === id
        ? updatedTask
        : task
    );

    setTasks(updatedTasks);
  }catch(error)
  {
    console.log(error)
  }
};

const handleEdit=(task) =>
{
    setEditId(task.id);
    setEditText(task.name);
};


const handleSave=async (id) =>
{
  if(editText.trim()=== "") return;
const taskToUpdate =
    tasks.find(
      (task) =>
        task.id === id
    );

  const updatedTask = {

    ...taskToUpdate,

    name: editText,
  };

try{
  await updateTask(id,updatedTask);
    const updatedTasks=tasks.map((task) =>
    task.id===id?updatedTask
:task
);

setTasks(updatedTasks);
setEditId(null);
setEditText("");
}catch(error)
{
  console.log(error);

}
};


const filteredTasks = tasks
  .filter((task) => {

    const matchesFilter =
      filter === "completed"
        ? task.completed
        : filter === "pending"
        ? !task.completed
        : true;

    const matchesSearch =
      task.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  })

  .sort((a, b) => {

    if (sortBy === "priority") {

      const priorityOrder = {
        HARD: 1,
        MEDIUM: 2,
        EASY: 3,
      };

      return (
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
      );
    }

    if (sortBy === "dueDate") {

  return (
    new Date(a.dueDate || "9999-12-31") -
    new Date(b.dueDate || "9999-12-31")
  );
}

    return b.id - a.id;
  });


const totalTasks=tasks.length;

const completedTasks=tasks.filter((task)=> task.completed).length;

const pendingTasks=tasks.filter((task)=>!task.completed).length;
  return (

  <div>

      <h1 className="text-3xl font-bold mb-6">
        Subjects
      </h1>

<div className="grid grid-cols-3 gap-4 mb-6">


  <div className="bg-blue-500 text-white p-5 rounded-xl shadow">
    <h2 className="text-lg font-medium">
        Total Subjects
    </h2>
    <p className="text-3xl font-bold">
        {totalTasks}
    </p>
  </div>


<div className=" bg-green-500 text-white p-5 rounded-xl shadow">
    <h2 className="text-lg font-medium">
        Completed Subjects

    </h2>

    <p className="text-3xl font-bold">
        {completedTasks}
    </p>
</div>


<div className="bg-yellow-500 text-white p-5 rounded-xl shadow">
    <h2 className="text-lg font-medium">
        Pending Subjects
    </h2>
    <p className="text-3xl font-bold">
        {pendingTasks}
    </p>
</div>
</div>



      <div className="flex gap-3 mb-6">

        <input
          type="text"
          placeholder="Enter subject..."
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
          className="flex-1 border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>

      </div>

      <div className="flex gap-3 mb-6">

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="border border-gray-300 p-3 rounded-lg"
  >
    <option value="EASY">EASY</option>

<option value="MEDIUM">MEDIUM</option>

<option value="HARD">HARD</option>
  </select>

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="border border-gray-300 p-3 rounded-lg"
  />

</div>

<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="border border-gray-300 p-3 rounded-lg"
>
  <option value="latest">
    Latest
  </option>

  <option value="priority">
    Priority
  </option>

  <option value="dueDate">
    Due Date
  </option>
</select>
<div className="flex gap-3 mb-6">

  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-2 rounded-lg ${
      filter === "all"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("completed")}
    className={`px-4 py-2 rounded-lg ${
      filter === "completed"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Completed
  </button>

  <button
    onClick={() => setFilter("pending")}
    className={`px-4 py-2 rounded-lg ${
      filter === "pending"
        ? "bg-yellow-500 text-white"
        : "bg-gray-200"
    }`}
  >
    Pending
  </button>


  <input 
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 mb-6"
  />

</div>




<div className="space-y-4">

  {filteredTasks.length === 0 ? (

    <div className="bg-white p-10 rounded-xl shadow text-center">

      <h2 className="text-2xl font-bold text-gray-600 mb-2">
        No Tasks Available 🚀
      </h2>

      <p className="text-gray-500">
        Add your first task to get started.
      </p>

    </div>

  ) : (

    filteredTasks.map((task) => (

      <TaskCard
        key={task.id}

        task={task}

        handleDelete={handleDelete}

        handleToggle={handleToggle}

        editId={editId}
        editText={editText}

        setEditText={setEditText}
        handleEdit={handleEdit}
        handleSave={handleSave}
      />

    ))
  )}

</div>
   

    </div>
  )
}

export default Subjects;