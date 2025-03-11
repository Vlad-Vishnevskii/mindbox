
import { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Add as AddIcon} from "@mui/icons-material";
import { Task, TabsEnum } from "./types";
import { TaskList } from "./components";


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [tab, setTab] = useState(TabsEnum.all);

  const saveTaskToState = (arr: Task[]) => {
    setTasks(arr)
    localStorage.setItem("tasks", JSON.stringify(arr));
  }
  
  const addTask = () => {
    if (newTask) {
      const newTaskObj = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      }
      saveTaskToState([...tasks, newTaskObj]);
      setNewTask("");
    }
  };
  
  const addTaskHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value)
  }
  
  const toggleTask = useCallback((id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }, [tasks]);
  
  const deleteTask = useCallback((id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  }, [tasks]);

  const handleChange = ((event: React.SyntheticEvent, value: TabsEnum) => {
    setTab(value);
  });

  const removeAll = () => {
    saveTaskToState([])
  }

  const removeCompleted = () => {
    const notCompleted = tasks.filter(task => !task.completed)
    saveTaskToState(notCompleted)
  }
  
  const filteredTasks = (completed: boolean) => tasks.filter(task => task.completed === completed);

  const currentTaskList = tab === "all" ? tasks : filteredTasks(tab === "completed")

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  return (
    <Box maxWidth={500} mx="auto" mt={5} p={2}>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          value={newTask}
          onChange={addTaskHandler}
          placeholder="Add task"
          variant="outlined"
        />
        <Button variant="contained" onClick={addTask} aria-label="Добавить">
          <AddIcon/>
        </Button>
      </Box>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label="All" value={TabsEnum.all} />
        <Tab label="Active" value={TabsEnum.active} />
        <Tab label="Completed" value={TabsEnum.completed} />
      </Tabs>
      <Box display="flex" gap={5} mt={2}>
        <Button variant="contained" onClick={removeAll}>
          Remove All
        </Button>
        <Button variant="contained" onClick={removeCompleted}>
          Remove completed
        </Button>
      </Box>
      <TaskList tasks={currentTaskList} toggleTask={toggleTask} deleteTask={deleteTask} />
    </Box>
  );
}


export default App;
