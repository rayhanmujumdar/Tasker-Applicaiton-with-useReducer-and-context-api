import { useState } from "react";
import { Zoom, toast } from "react-toastify";
import { useTaskDispatch } from "../context/TaskProvider";

export default function AddAndEditTaskModal({ onClose, isEdit, editTask }) {
  const dispatch = useTaskDispatch();
  const [task, setTask] = useState(
    editTask || {
      title: "",
      description: "",
      priority: "",
      tags: "",
    }
  );
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  };
  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (Object.values(task).some((val) => val === "")) {
      toast.error("Form Submission Failed! Invalid Fields", {
        autoClose: 1500,
        position: "bottom-right",
        closeOnClick: true,
        transition: Zoom,
        pauseOnHover: true,
      });
    } else {
      if (isEdit) {
        dispatch({
          type: "edit_task",
          payload: task,
        });
      } else {
        dispatch({
          type: "add_task",
          payload: { id: crypto.randomUUID(), ...task },
        });
      }
      onClose();
    }
  };
  return (
    <>
      <div
        onClick={onClose}
        className="w-full h-full bg-black/30 fixed top-0 left-0 z-10"
      ></div>
      <form
        onSubmit={handleSubmitTask}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 absolute z-20 left-1/2 -translate-x-1/2"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isEdit ? "Edit Task" : "Add New Task"}
        </h2>
        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              value={task.title}
              onChange={handleChange}
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              value={task.description}
              onChange={handleChange}
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                value={task.tags}
                onChange={handleChange}
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                value={task.priority}
                onChange={handleChange}
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            {isEdit ? "Edit Task" : "Create new Task"}
          </button>
        </div>
      </form>
    </>
  );
}
