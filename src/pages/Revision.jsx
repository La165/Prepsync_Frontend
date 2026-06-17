
import { useEffect, useState } from "react";

import {
  getRevisionQueue,
  reviseTopic,
} from "../services/revisionService";

function Revision() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);

    try {
      const data = await getRevisionQueue();
      setTopics(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevise = async (id) => {
    try {
      await reviseTopic(id);
      fetchTopics();
    } catch (error) {
      console.log(error);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Loading revision queue...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          🔁 Revision Queue
        </h1>

        <button
          onClick={fetchTopics}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>

      </div>

      {/* EMPTY STATE */}
      {topics.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold text-green-600">
            🎉 No Revisions Due
          </h2>
          <p className="text-gray-500 mt-2">
            You're fully up to date 🚀
          </p>
        </div>
      ) : (
        <div className="grid gap-4">

          {topics.map((topic) => {

            // urgency logic
            const isUrgent =
              new Date(topic.nextRevisionDate) <
              new Date();

            return (
              <div
                key={topic.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
              >

                {/* LEFT SIDE */}
                <div className="space-y-1">

                  <h2 className="text-xl font-bold">
                    {topic.topicName}
                  </h2>

                  <p className="text-gray-500">
                    📘 {topic.subject?.name || "No Subject"}
                  </p>

                  <p className="text-sm text-gray-500">
                    🔁 Revisions:{" "}
                    <span className="font-semibold">
                      {topic.revisionCount || 0}
                    </span>
                  </p>

                  <p
                    className={`text-sm font-medium ${
                      isUrgent
                        ? "text-red-600"
                        : "text-orange-500"
                    }`}
                  >
                    ⏰ Due: {topic.nextRevisionDate}
                  </p>

                  {/* STATUS BADGE */}
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full
                      ${
                        isUrgent
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {isUrgent ? "Overdue" : "Pending"}
                  </span>

                </div>

                {/* ACTION BUTTON */}
                <button
                  onClick={() => handleRevise(topic.id)}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Mark Revised
                </button>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default Revision;