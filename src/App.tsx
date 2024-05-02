import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./app/store";
import { fetchTasks, addTask, deleteTask } from "./features/tasks/taskSlice";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = async (taskTitle: string) => {
    const response = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskTitle }),
    });

    const newTask = await response.json();
    dispatch(addTask(newTask));
  };

  const handleDeleteTask = async (taskId: number) => {
    const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "DELETE",
    });

    dispatch(deleteTask(taskId));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}{" "}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const taskTitle = e.currentTarget.task.value;
          if (taskTitle) {
            handleAddTask(taskTitle);
            e.currentTarget.task.value = "";
          }
        }}
      >
        <input type="text" name="task" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default App;
