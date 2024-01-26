import { useState } from "react";
import AddAndEditTaskModal from "../component/AddAndEditTaskModal";
import Footer from "../component/Footer";
import Header from "../component/Header";
import HeroSection from "../component/HeroSection";
import Searchbox from "../component/Searchbox";
import TaskHeader from "../component/TaskHeader";
import TaskItem from "../component/TaskItem";
import TaskLayout from "../component/TaskLayout";
import TaskLists from "../component/TaskLists";
import Button from "../component/ui/Button";
import { useTaskDispatch, useTasksState } from "../context/TaskProvider";

export default function TaskPage() {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const dispatch = useTaskDispatch();
  const state = useTasksState();
  // handler
  const handleRemoveAllTask = () => {
    dispatch({
      type: "remove_all_task",
    });
  };
  const handleEdit = (task) => {
    setIsEdit(true);
    setShowModal(true);
    setEditTask(task);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  // search handle
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };
  return (
    <>
      <Header />
      <HeroSection />
      <TaskLayout>
        <TaskHeader>
          {showModal && (
            <AddAndEditTaskModal
              isEdit={isEdit}
              editTask={editTask}
              onClose={handleClose}
            />
          )}
          <Searchbox onSearch={handleSearch} />
          <Button
            onClick={() => {
              setShowModal(true);
              setIsEdit(false);
              setEditTask(null);
            }}
          >
            Add Task
          </Button>
          <Button onClick={handleRemoveAllTask} className="bg-red-500">
            Delete All
          </Button>
        </TaskHeader>
        <TaskLists totalTask={state.tasks.length}>
          {state.tasks
            .filter((task) =>
              task.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEdit} />
            ))}
        </TaskLists>
      </TaskLayout>
      <Footer />
    </>
  );
}
