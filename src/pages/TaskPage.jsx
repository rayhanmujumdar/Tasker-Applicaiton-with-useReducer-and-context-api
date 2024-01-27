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
import { Zoom, toast } from "react-toastify";

export default function TaskPage() {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const dispatch = useTaskDispatch();
  const state = useTasksState();
  // handler
  const handleRemoveAllTask = () => {
    const isConfirm = confirm("are you sure delete all task?");
    if (isConfirm) {
      dispatch({
        type: "remove_all_task",
      });
      toast.success("Delete all Task successfully", {
        autoClose: 1500,
        position: "bottom-right",
        closeOnClick: true,
        transition: Zoom,
        pauseOnHover: true,
      });
    }
  };
  const handleEdit = (task) => {
    setIsEdit(true);
    setShowModal(true);
    setEditTask(task);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditTask(null);
    setIsEdit(false);
  };
  const handleAddTaskBtn = () => {
    setShowModal(true);
    setIsEdit(false);
    setEditTask(null);
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
        {/* Task Header */}
        <TaskHeader>
          {showModal && (
            <AddAndEditTaskModal
              isEdit={isEdit}
              editTask={editTask}
              onClose={handleCloseModal}
            />
          )}
          <Searchbox onSearch={handleSearch} />
          <Button onClick={handleAddTaskBtn}>Add Task</Button>
          <Button
            disabled={state.tasks.length === 0}
            onClick={handleRemoveAllTask}
            className="bg-red-500 disabled:bg-red-300 "
          >
            Delete All
          </Button>
        </TaskHeader>
        {/* TaskLists */}
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
