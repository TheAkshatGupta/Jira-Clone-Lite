import React, { useEffect, useState } from "react";
import API from "../services/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const createTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  // Update status
  const updateTaskStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  // Drag drop handler
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    await updateTaskStatus(taskId, newStatus);
  };

  // Columns
  const columns = {
    todo: {
      name: "To Do",
      items: tasks.filter((t) => t.status === "todo"),
    },
    inprogress: {
      name: "In Progress",
      items: tasks.filter((t) => t.status === "inprogress"),
    },
    done: {
      name: "Done",
      items: tasks.filter((t) => t.status === "done"),
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-2xl font-bold mb-4">Dashboard 🚀</h1>

      {/* Add Task */}
      <div className="mb-5 flex gap-2">
        <input
          className="p-2 border rounded w-64"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">

          {Object.entries(columns).map(([key, col]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  className="bg-gray-200 p-3 rounded"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="font-semibold mb-2">{col.name}</h2>

                  {col.items.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-white p-3 mb-2 rounded shadow"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>{task.title}</p>

                          {/* Move Buttons */}
                          <div className="mt-2 flex gap-2 text-sm">
                            {task.status !== "todo" && (
                              <button
                                onClick={() =>
                                  updateTaskStatus(task._id, "todo")
                                }
                                className="bg-gray-300 px-2 rounded"
                              >
                                ⬅
                              </button>
                            )}

                            {task.status !== "inprogress" && (
                              <button
                                onClick={() =>
                                  updateTaskStatus(task._id, "inprogress")
                                }
                                className="bg-yellow-300 px-2 rounded"
                              >
                                ⏳
                              </button>
                            )}

                            {task.status !== "done" && (
                              <button
                                onClick={() =>
                                  updateTaskStatus(task._id, "done")
                                }
                                className="bg-green-400 px-2 rounded"
                              >
                                ✔
                              </button>
                            )}
                          </div>

                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>

    </div>
  );
}

export default Dashboard;