import {
  Checkbox,
  Card,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { memo } from "react";
import { Close } from "@mui/icons-material";
import { Task } from "../types";

type Props = {
  tasks: Task[],
  toggleTask: (id: number) => void,
  deleteTask: (id: number) => void, 
};

export const TaskList: React.FC<Props> = memo(({ tasks, toggleTask, deleteTask }) => {
    return (
      <Box mt={2}>
        {tasks.map(task => (
          <Card key={task.id} data-card="item" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, mb: 1 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} />
              <Typography sx={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</Typography>
            </Box>
            <IconButton onClick={() => deleteTask(task.id)} aria-label="Удалить задачу" >
              <Close color="error" />
            </IconButton>
          </Card>
        ))}
      </Box>
    );
})