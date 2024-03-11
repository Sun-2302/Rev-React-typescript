import { nanoid } from "nanoid";
import { useState } from "react";
import { Task } from "../interface/Task";


export function useTaskManager(){
    const [title, setTitle] = useState("");
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
  
    const completeTask = (id: string): void => {
      setTasks(tasks.filter((task: Task) => task.id !== id));
    };
  
    const updateTask = (id: string, taskUpdate: string): void => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title: taskUpdate } : task
      );
  
      setTasks(updatedTasks);
    }
  
    const addTask = (): void => {
      if (title.length < 1) {
        return;
      }
  
      const newTask: Task = {
        // using nanoid to generate unique id
        id: nanoid(),
        title
      };
      setTasks((prev) => prev.concat(newTask));
      setTitle("");
    };
  
    const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(ev.target.value);
    };
  
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
    return {
        title,
        setTitle,
        searchKeyword,
        setSearchKeyword,
        tasks,
        completeTask,
        updateTask,
        addTask,
        handleSearch,
        filteredTasks,
      };
  
  
}