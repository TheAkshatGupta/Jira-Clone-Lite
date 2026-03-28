import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // fetch tasks
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // create task
  const createTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  // filter tasks
  const todo = tasks.filter(t => t.status === "todo");
  const inprogress = tasks.filter(t => t.status === "inprogress");
  const done = tasks.filter(t => t.status === "done");

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add</button>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div>
          <h3>To Do</h3>
          {todo.map(t => <p key={t._id}>{t.title}</p>)}
        </div>

        <div>
          <h3>In Progress</h3>
          {inprogress.map(t => <p key={t._id}>{t.title}</p>)}
        </div>

        <div>
          <h3>Done</h3>
          {done.map(t => <p key={t._id}>{t.title}</p>)}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;