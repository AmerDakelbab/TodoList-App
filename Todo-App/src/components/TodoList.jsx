import { useState, useContext } from "react";
import Moon from '../../images/icon-moon.svg';
import Sun from '../../images/icon-sun.svg';
import cross from '../../images/icon-cross.svg';
import check from '../../images/icon-check.svg';
import '../TodoList.css';
import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom'


const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [newList, setNewList] = useState("");
    const [theme, setTheme] = useState("dark");

    const handleChange = (event) => {
        setNewList(event.target.value);
    };
    const addTask = () => {
        const task = {
            id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
            taskName: newList,
            completed: false
        };
        setTodoList(task.taskName !== "" ? [...todoList, task] : todoList);
        setNewList("");
    };
    const keyChange = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }
    const deleteTask = (id) => {
        setTodoList(todoList.filter((task) => task.id !== id));
    };
    const completeTask = (id) => {
        setTodoList(todoList.map((task) => {
            if (task.id === id) {
                return { ...task, completed: true };
            } else {
                return task;
            }
        }));
    };
    const AllTasks = () => (
        todoList.map((task) =>
            <div className="todo-list zindex" key={task.id}>
                <button className="check-button" onClick={() => completeTask(task.id)}>
                    <img style={{ display: task.completed ? 'block' : 'none' }} src={check} alt="check" className="check" />
                </button>
                <p className="task-p" style={{ 
                textDecoration: task.completed ? 'line-through' : '', 
                color: task.completed ? 'hsl(233, 14%, 35%)' : 'hsl(234, 39%, 85%)',
                ...(theme === "light" ? {
                    textDecoration: task.completed ? 'line-through' : '',
                    color: task.completed ? 'hsl(234, 39%, 85%)' : 'hsl(233, 14%, 35%)'
                } : (theme === "dark" ? {   
                    textDecoration: task.completed ? 'line-through' : '',
                    color: task.completed ? 'hsl(233, 14%, 35%)' : 'hsl(234, 39%, 85%)'
                } : {}))
}}>
  {task.taskName}
</p>                <button className="cross" onClick={() => deleteTask(task.id)}><img src={cross} alt="cross" /></button>
            </div>
        )
    );




    const CompletedTasks = () => (
        todoList.map((task) => task.completed && (
            <div className="todo-list zindex" key={task.id}>
                <button className="check-button" onClick={() => completeTask(task.id)}>
                    <img style={{ display: task.completed ? 'block' : 'none' }} src={check} alt="check" className="check" />
                </button>
                <p className="task-p" style={{ 
                textDecoration: task.completed ? 'line-through' : '', 
                color: task.completed ? 'hsl(233, 14%, 35%)' : 'hsl(234, 39%, 85%)',
                ...(theme === "light" ? {
                    textDecoration: task.completed ? 'line-through' : '',
                    color: task.completed ? 'hsl(234, 39%, 85%)' : 'hsl(233, 14%, 35%)'
                } : (theme === "dark" ? {   
                    textDecoration: task.completed ? 'line-through' : '',
                    color: task.completed ? 'hsl(233, 14%, 85%)' : 'hsl(234, 39%, 35%)'
                } : {}))
}}>
  {task.taskName}
</p>                <button className="cross" onClick={() => deleteTask(task.id)}><img src={cross} alt="cross" /></button>
            </div>
        ))
    );

    const ActiveTasks = () => (
        todoList.map((task) => !task.completed && (
            <div className="todo-list zindex" key={task.id}>
                <button className="check-button" onClick={() => completeTask(task.id)}>
                    <img style={{ display: task.completed ? 'block' : 'none' }} src={check} alt="check" className="check" />
                </button>
                <p className="task-p" style={{ 
                textDecoration: task.completed ? 'line-through' : '', 
                color: task.completed ? 'hsl(233, 14%, 35%)' : 'hsl(234, 39%, 85%)',
                ...(theme === "light" ? {
                    textDecoration: task.completed ? 'line-through' : '',
                    color: task.completed ? 'hsl(234, 39%, 85%)' : 'hsl(233, 14%, 35%)'
                } : (theme === "dark" ? {   
                    textDecoration: task.completed ? 'line-through' : '',
                    color: task.completed ? 'hsl(233, 14%, 85%)' : 'hsl(234, 39%, 35%)'
                } : {}))
}}>
  {task.taskName}
</p>
                <button className="cross" onClick={() => deleteTask(task.id)}><img src={cross} alt="cross" /></button>
            </div>
        ))
    );
    const clearCompletedTasks = () => {
        setTodoList(todoList.filter((task) => !task.completed));
    };
    const remainingTasksCount = todoList.filter(task => !task.completed).length;

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <div className="main" style={{ backgroundColor: theme === "light" ? "hsl(236, 33%, 92%)" : "hsl(235, 21%, 11%)"}}>
            <div className={theme} style={{ width: "50vw", marginTop: 100 }}>
                <div className="background-image"></div>
                <div className="header zindex">
                    <p className="title">T O D O</p>
                    <button onClick={toggleTheme} className="sun-button">
                        <img src={theme === "light" ? Sun : Moon} />
                    </button>
                </div>
                <br />D
                <div className="creating-todo zindex">
                    <button className="check-button" onClick={addTask}></button>
                    <input
                        type="text"
                        placeholder="Create a new todo.."
                        onChange={handleChange}
                        onKeyPress={keyChange}
                        value={newList}
                        className="text-input"
                    />
                </div>

                <div>
                    <Router>
                        <Routes>
                            <Route path="/" element={<AllTasks />} />
                            <Route path="/active" element={<ActiveTasks />} />
                            <Route path="/completed" element={<CompletedTasks />} />
                        </Routes>
                        <div className="bottom-part zindex">
                            <p className="tasks-left-p"> {remainingTasksCount} items left</p>
                            <span className="links">
                                <Link to="/"><button className="buttons">All</button></Link>
                                <Link to="/active"><button className="buttons">Active</button></Link>
                                <Link to="/completed"><button className="buttons">Completed</button></Link>
                            </span>
                            <button className="buttons clear-button" onClick={clearCompletedTasks}>Clear Completed</button>
                        </div>
                    </Router>
                </div>
            </div>

        </div>

    );
};
export default TodoList;