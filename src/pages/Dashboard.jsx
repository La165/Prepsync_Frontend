
import { useEffect, useState } from "react";
import { getDashboard } from "../services/analyticsService";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDashboard();
      setData(res || {});
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Loading dashboard...</h1>
      </div>
    );
  }

  // =========================
  // SAFE VALUES
  // =========================
  const totalTopics = data.totalTopics || 0;
  const completedTopics = data.completedTopics || 0;

  const progress =
    totalTopics === 0
      ? 0
      : Math.round((completedTopics / totalTopics) * 100);

  // =========================
  // SUBJECT WISE PROGRESS (FRONTEND ONLY)
  // =========================
  const subjectProgress = () => {
    if (!data.topicsList) return [];

    const map = {};

    data.topicsList.forEach((t) => {
      const subject = t.subject?.name || "Unknown";

      if (!map[subject]) {
        map[subject] = {
          total: 0,
          completed: 0,
        };
      }

      map[subject].total += 1;

      if (t.status === "COMPLETED") {
        map[subject].completed += 1;
      }
    });

    return Object.keys(map).map((key) => ({
      subject: key,
      progress: map[key].total
        ? Math.round((map[key].completed / map[key].total) * 100)
        : 0,
    }));
  };

  const subjectStats = subjectProgress();

  // =========================
  // CHART DATA
  // =========================
  const pieData = [
    { name: "Completed", value: completedTopics },
    { name: "Pending", value: data.pendingTopics || 0 },
  ];

  const COLORS = ["#22c55e", "#f59e0b"];

  const barData = [
    { name: "Subjects", value: data.totalSubjects || 0 },
    { name: "Topics", value: totalTopics },
    { name: "Weak", value: data.weakTopics || 0 },
    { name: "Revision", value: data.revisionDueTopics || 0 },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">

      {/* TITLE */}
      <h1 className="text-3xl font-bold">
        📊 Analytics Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <Card title="Subjects" value={data.totalSubjects || 0} />
        <Card title="Topics" value={totalTopics} />
        <Card title="Streak" value={data.studyStreak || 0} />
        <Card title="Readiness" value={(data.readinessScore || 0) + "%"} />
        <Card title="Progress" value={progress + "%"} />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PIE */}
        <div className="bg-white p-5 rounded-xl shadow h-[350px]">
          <h2 className="text-lg font-bold mb-4">
            Completion Status
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-white p-5 rounded-xl shadow h-[350px]">
          <h2 className="text-lg font-bold mb-4">
            Overview
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* STUDENT PROGRESS */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-bold mb-3">
          📈 Student Progress
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-blue-500 h-6 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 font-semibold">
          {progress}% Completed
        </p>

      </div>

      {/* ⭐ SUBJECT WISE PROGRESS (NEW FEATURE) */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-bold mb-4">
          📚 Subject-wise Progress
        </h2>

        {subjectStats.length === 0 ? (
          <p className="text-gray-500">
            No subject data available
          </p>
        ) : (
          <div className="space-y-4">

            {subjectStats.map((s, i) => (
              <div key={i}>

                <div className="flex justify-between mb-1">
                  <p className="font-medium">
                    {s.subject}
                  </p>

                  <p className="text-sm text-gray-500">
                    {s.progress}%
                  </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>

              </div>
            ))}

          </div>
        )}
      </div>

      {/* READINESS */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-bold mb-3">
          🎯 Readiness Score
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-green-500 h-6 rounded-full"
            style={{
              width: `${data.readinessScore || 0}%`,
            }}
          />
        </div>

      </div>

    </div>
  );
}

/* CARD */
function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Dashboard;