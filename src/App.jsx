import TaskProvider from "./context/TaskProvider";
import TaskPage from "./pages/TaskPage";
function App() {
  return (
    <TaskProvider>
      <TaskPage />
    </TaskProvider>
  );
}

export default App;
