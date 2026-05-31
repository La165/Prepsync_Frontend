function TaskCard({
  task,
  handleDelete,
  handleToggle,
  handleEdit,
  handleSave,
  editId,
  editText,
  setEditText,
}) {

const today = new Date().toISOString().split("T")[0];

const isOverdue =
  !task.completed &&
  task.dueDate &&
  task.dueDate < today;


  return (

    <div className="bg-white shadow p-4 rounded-lg flex justify-between items-center">

      {
        editId === task.id ? (

          <input
            type="text"
            value={editText}
            onChange={(e) =>
              setEditText(e.target.value)
            }
            className="border border-gray-300 p-2 rounded-lg flex-1 mr-4 outline-none focus:ring-2 focus:ring-blue-400"
          />

        ) : (

          <h2
            className={`text-lg font-medium ${
              task.completed
                ? "line-through opacity-60"
                : ""
            }`}
          >
            {task.name}
          </h2>

        )
      }

      <div className="text-sm text-gray-500 mt-1">

  <p>
    Priority:
    <span
    className={`ml-2 px-2 py-1 rounded-full text-white text-xs font-semibold
    ${
      task.priority === "HARD"
        ? "bg-red-500"
        : task.priority === "MEDIUM"
        ? "bg-yellow-500"
        : "bg-green-500"
    }`}
  >
  {" "}{task.priority || "EASY"}
</span>
  </p>

  <p>
    Due:
    <span className="font-semibold">
      {" "}{task.dueDate || "No Date"}
    </span>
  </p>


{
  isOverdue && (
    <p className="text-red-500 font-semibold mt-1">
      Overdue
    </p>
  )
}
</div>

      <div className="flex gap-3">

        <button
          onClick={() =>
            handleToggle(task.id)
          }
          className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
        >
          {
            task.completed
              ? "Undo"
              : "Complete"
          }
        </button>

        {
          editId === task.id ? (

            <button
              onClick={() =>
                handleSave(task.id)
              }
              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>

          ) : (

            <button
              onClick={() =>
                handleEdit(task)
              }
              className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>

          )
        }

        <button
          onClick={() =>
            handleDelete(task.id)
          }
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default TaskCard;