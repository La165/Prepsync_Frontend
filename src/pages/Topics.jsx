

import { useEffect, useState } from "react";

import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
} from "../services/topicService";

import { getTasks } from "../services/subjectService";
import { reviseTopic } from "../services/revisionService";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("ALL");

  const [formData, setFormData] = useState({
    subjectId: "",
    topicName: "",
    status: "PENDING",
    difficulty: "MEDIUM",
    confidenceLevel: "MEDIUM",
    notes: "",
  });

  useEffect(() => {
    fetchTopics();
    fetchSubjects();
  }, []);

  const fetchTopics = async () => {
    try {
      const data = await getTopics();
      setTopics(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const data = await getTasks();
      setSubjects(data);
    } catch (err) {
      console.log(err);
    }
  };


  const filteredTopics = topics.filter((topic) => {
  const matchSearch = topic.topicName
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchStatus =
    statusFilter === "ALL" || topic.status === statusFilter;

  return matchSearch && matchStatus;
});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ CREATE + UPDATE
  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateTopic(editId, formData);
        setEditId(null);
      } else {
        await createTopic(formData);
      }

      setFormData({
        subjectId: "",
        topicName: "",
        status: "PENDING",
        difficulty: "MEDIUM",
        confidenceLevel: "MEDIUM",
        notes: "",
      });

      fetchTopics();
    } catch (err) {
      console.log(err);
    }
  };

  // ✏️ EDIT
  const handleEdit = (topic) => {
    setEditId(topic.id);

    setFormData({
      subjectId: topic.subject?.id || "",
      topicName: topic.topicName || "",
      status: topic.status || "PENDING",
      difficulty: topic.difficulty || "MEDIUM",
      confidenceLevel: topic.confidenceLevel || "MEDIUM",
      notes: topic.notes || "",
    });
  };

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    try {
      await deleteTopic(id);
      fetchTopics();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔁 REVISE
  const handleRevise = async (id) => {
    try {
      await reviseTopic(id);
      fetchTopics();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">Topics Management</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <select
          name="subjectId"
          value={formData.subjectId}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Select Subject</option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="topicName"
          placeholder="Topic Name"
          value={formData.topicName}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <div className="grid grid-cols-3 gap-4">

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="PENDING">PENDING</option>
            <option value="INPROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="REVISING">REVISING</option>
          </select>

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>

          <select
            name="confidenceLevel"
            value={formData.confidenceLevel}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

        </div>

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {editId ? "Update Topic" : "Add Topic"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex gap-4 items-center">

  {/* SEARCH */}
  <input
    type="text"
    placeholder="Search topic..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-2 rounded-lg w-full"
  />

  {/* FILTER */}
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border p-2 rounded-lg"
  >
    <option value="ALL">All</option>
    <option value="PENDING">PENDING</option>
    <option value="INPROGRESS">IN PROGRESS</option>
    <option value="COMPLETED">COMPLETED</option>
    <option value="REVISING">REVISING</option>
  </select>

</div>

      {/* TOPICS LIST */}
      <div className="space-y-4">

        {filteredTopics.map((topic) => (
          <div key={topic.id} className="bg-white p-5 rounded-xl shadow">

            <div className="flex justify-between">

              <div>
                <h2 className="text-xl font-bold">{topic.topicName}</h2>
                <p className="text-gray-500">
                  {topic.subject?.name || "No Subject"}
                </p>
              </div>

              <button
                onClick={() => handleRevise(topic.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Revise
              </button>
            </div>

            {/* status badges */}
            <div className="mt-4 flex gap-3 flex-wrap">

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                {topic.status}
              </span>

              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                {topic.difficulty}
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Confidence: {topic.confidenceLevel}
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p>Revision Count: {topic.revisionCount}</p>
              <p>Next Revision: {topic.nextRevisionDate}</p>
            </div>

            {/* ✅ ACTION BUTTONS */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() => handleEdit(topic)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(topic.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Topics;