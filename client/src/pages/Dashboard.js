import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const columns = [
    { title: "To Do", key: "todo" },
    { title: "In Progress", key: "inprogress" },
    { title: "Done", key: "done" },
  ];

  return (
    <div style={{ padding: "20px", background: "#f4f5f7", minHeight: "100vh" }}>
      
      <h2 style={{ marginBottom: "20px" }}>JIRA Clone Lite 🚀</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={title}
          placeholder="Enter task..."
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
        <button onClick={createTask} style={{
          padding: "10px 15px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Add Task
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map(col => (
          <div key={col.key} style={{
            flex: 1,
            background: "#ebecf0",
            padding: "10px",
            borderRadius: "8px"
          }}>
            
            <h3 style={{ marginBottom: "10px" }}>{col.title}</h3>

            {tasks
              .filter(t => t.status === col.key)
              .map(task => (
                <div key={task._id} style={{
                  background: "white",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  {task.title}
                </div>
              ))
            }

          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;