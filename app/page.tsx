"use client";
import { useState, useEffect } from 'react';

export default function Home() {
    const [tasks, setTasks] = useState<string[]>([]);
    const [item, setItem] = useState<string>("");
    const [editingItem, setEditingItem] = useState<string | null>(null);

  
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    function removeItem(taskName: string) {
        const updatedTasks = tasks.filter(task => task !== taskName);
        setTasks(updatedTasks);
    }

    function addItem() {
        if (item.trim() !== "" && !tasks.includes(item)) {
            setTasks(prevTasks => [...prevTasks, item]);
            setItem("");
        }
    }

    function editItem(taskName: string) {
        setItem(taskName);
        setEditingItem(taskName);
    }

    function updateItem() {
        if (item.trim() !== "" && editingItem) {
            setTasks(prevTasks => prevTasks.map(task => (task === editingItem ? item : task)));
            setItem("");
            setEditingItem(null);
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Todo App</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    placeholder='Item Name'
                    value={item}
                    style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
                    onChange={(e) => setItem(e.target.value)}
                />
                <button
                    onClick={editingItem ? updateItem : addItem}
                    style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', backgroundColor: 'green', color: 'white' }}
                >
                    {editingItem ? "Update Item" : "Add Item"}
                </button>
            </div>
            <ul style={{ marginTop: '50px', listStyleType: 'none', padding: 0, width: '300px', margin: '0 auto' }}>
                {tasks.map((task) => (
                    <li
                        key={task}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px',
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '5px'
                        }}
                    >
                        {task}
                        <div>
                            <button
                                style={{ marginLeft: '10px', backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '5px', border: 'none' }}
                                onClick={() => editItem(task)}
                            >
                                Edit
                            </button>
                            <button
                                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px', border: 'none' }}
                                onClick={() => removeItem(task)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
