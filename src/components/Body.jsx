import React, { useState, useEffect } from 'react';

function TaskManager() {
    const [TaskArray, setTaskArray] = useState([]);
    const [TaskString, setTaskString] = useState("");

    useEffect(() => {
        const storedTasks = localStorage.getItem('TaskArray');
        if (storedTasks) {
            setTaskArray(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
    }, [TaskArray]);

    const AddTask = () => {
        if (TaskString.trim()) {
            const newTask = { id: Date.now(), task: TaskString };
            const updatedTasks = [...TaskArray, newTask];
            setTaskArray(updatedTasks);
            setTaskString("");
        }
    };

    const clearAllTasks = () => {
        setTaskArray([]);
        localStorage.setItem('TaskArray', JSON.stringify([]));
    };

    const handleChange = (e) => {
        setTaskString(e.target.value);
    };

    const deleteTask = (id) => {
        const updatedTasks = TaskArray.filter((item) => item.id !== id);
        setTaskArray(updatedTasks);
        localStorage.setItem('TaskArray', JSON.stringify(updatedTasks));
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 min-h-screen flex flex-col justify-center items-center py-10">
            <div className="w-full max-w-xl">
                <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
                <div className="flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Enter Your Task"
                        className="flex-grow h-12 rounded-md px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        value={TaskString}
                        onChange={handleChange}
                    />
                        src=<img width="24" height="24" src="https://img.icons8.com/material-outlined/24/add.png" alt="add"   onClick={AddTask}
                        className="h-12 w-12 ml-4 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"/>
                        
                </div>

                {TaskArray.length === 0 ? (
                    <div className='bg-blue-800 text-white py-4 px-8 rounded-md shadow-lg'>
                        <h1 className="text-lg font-semibold">You are all done</h1>
                    </div>
                ) : (
                    <div className='bg-white w-full p-4 rounded-md shadow-md'>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Your Tasks</h2>
                            <button
                                onClick={clearAllTasks}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full transition-all duration-200 ease-in-out"
                            >
                                Clear All
                            </button>
                        </div>
                        <ul className="list-disc pl-5 text-gray-700">
                            {TaskArray.map((item) => (
                                <li key={item.id} className="py-2 flex items-center justify-between">
                                    <span>{item.task}</span>
                                    <button
                                        onClick={() => deleteTask(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full transition-all duration-200 ease-in-out"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskManager;
