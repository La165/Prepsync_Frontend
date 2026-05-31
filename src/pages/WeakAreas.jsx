
import { useEffect, useState } from "react";
import { getWeakAreas } from "../services/analyticsService";

function WeakAreas() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeakAreas();
  }, []);

  const fetchWeakAreas = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeakAreas();
      setTopics(data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load weak areas");
    } finally {
      setLoading(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Loading weak areas...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      {/* TITLE + REFRESH */}
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          ⚠️ Weak Areas
        </h1>

        <button
          onClick={fetchWeakAreas}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Refresh
        </button>

      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {topics.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold text-green-600">
            🎉 No Weak Topics
          </h2>
          <p className="text-gray-500 mt-2">
            You're doing great. Keep it up 🚀
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >

              {/* LEFT SIDE */}
              <div>

                <h2 className="text-xl font-bold">
                  {topic.topicName || "Untitled Topic"}
                </h2>

                <p className="text-gray-500">
                  Subject: {topic.subjectName || "Unknown"}
                </p>

                <p className="text-red-500 font-medium mt-1">
                  {topic.reason || "Low performance / weak understanding"}
                </p>

              </div>

              {/* BADGE */}
              <div>
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Weak
                </span>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default WeakAreas;
