import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
}

const apiUrl = "http://localhost:4000/tasks";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }
);

interface TasksState {
  tasks: Task[];
  status:  "succeeded";
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: "succeeded",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tasks = action.payload;
    });
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
