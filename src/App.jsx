import { ToastContainer } from "react-toastify";
import TaskProvider from "./context/TaskProvider";
import TaskPage from "./pages/TaskPage";
function App() {
  return (
    <TaskProvider>
      <TaskPage />
      <ToastContainer />
    </TaskProvider>
  );
}

export default App;
