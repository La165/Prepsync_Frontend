
import { useEffect, useState } from "react";
import { getStudyPlan } from "../services/analyticsService";

function StudyPlan() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const res = await getStudyPlan();
      setPlan(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="text-xl">Loading study plan...</h1>;
  }

  // 🧠 SMART LOGIC (FRONTEND ONLY)

  const tasks = plan?.tasks || [];

  // convert plain tasks → structured tasks
  const structured = tasks.map((t) => {
    if (typeof t === "string") {
      return {
        title: t,
        priority: "MEDIUM",
        time: "30 min",
      };
    }
    return t;
  });

  // sorting logic (HIGH → MEDIUM → LOW)
  const priorityOrder = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  };

  const sortedTasks = structured.sort(
    (a, b) =>
      (priorityOrder[a.priority] || 2) -
      (priorityOrder[b.priority] || 2)
  );

  // AI INSIGHT (NO BACKEND)
  const insight =
    sortedTasks.length > 5
      ? "⚠️ Heavy workload today — focus on HIGH priority tasks first."
      : sortedTasks.length > 0
      ? "👍 Balanced plan — good time for revision too."
      : "🎉 No tasks today — you're fully on track!";

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        📅 Smart Study Plan
      </h1>

      {/* DATE */}
      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-gray-500">
          Date: {plan?.date}
        </p>
      </div>

      {/* AI INSIGHT */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 rounded-xl shadow">
        <h2 className="font-bold mb-1">🧠 AI Insight</h2>
        <p>{insight}</p>
      </div>

      {/* TASKS */}
      <div className="space-y-4">

        {sortedTasks.map((task, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >

            {/* TASK INFO */}
            <div>
              <p className="font-semibold text-lg">
                {task.title}
              </p>

              <p className="text-sm text-gray-500">
                ⏱ {task.time}
              </p>
            </div>

            {/* PRIORITY BADGE */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  task.priority === "HIGH"
                    ? "bg-red-100 text-red-700"
                    : task.priority === "MEDIUM"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }
              `}
            >
              {task.priority}
            </span>

          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {sortedTasks.length === 0 && (
        <div className="bg-green-100 text-green-700 p-5 rounded-xl">
          🎉 No tasks for today. You're fully on track!
        </div>
      )}

    </div>
  );
}

export default StudyPlan;