import { useContext, useReducer } from "react";
import { initialTask, taskReducer } from "../reducer/taskReducer";
import { TaskContext, TaskDisPatchContext } from "./index";
export const useTasksState = () => useContext(TaskContext);
export const useTaskDispatch = () => useContext(TaskDisPatchContext);
export default function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialTask);
  return (
    <TaskDisPatchContext.Provider value={dispatch}>
      <TaskContext.Provider value={state}>{children}</TaskContext.Provider>
    </TaskDisPatchContext.Provider>
  );
}
