import PropTypes from "prop-types";
import { useState } from "react";
import './App.css'

const data = [{
    id: 1,
    name: 'Office Task-1',
    description: 'This is the description of My First Task',
    iscompleted: false,
},
{
    id: 2,
    name: 'Office Task-2',
    description: 'This is the description of My Second Task',
    iscompleted: false,
},
{
    id: 3,
    name: 'Office Task-3',
    description: 'This is the description of My Third Task',
    iscompleted: false,
}
];

const Todo = (props) => {
    return (
        <div style={{
            textAlign: "center",
            padding: "16px",
            position: "relative",
            margin: 5,
            textAlignLast: "left",
            backgroundColor:"lightgreen",
            fontSize: "12px"

        }}
        > <p>Name:{props.name}</p>
            <p>Description:{props.description}</p>
            Status:&nbsp;
            <button onClick={() => props.toggleComplete(props.id)}>{props.iscompleted ? 'Completed' : 'Incomplete'}</button><br></br>
            <button onClick={() => props.loadEditTodo(props.id)} style={{ marginLeft: 300,backgroundColor:"green"}}>Edit</button>&nbsp;
            <button onClick={() => props.removeTodo(props.id)} style={{ marginTop: 5 ,backgroundColor:"red"}}>Delete</button>


        </div>
    );
};

Todo.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    iscompleted: PropTypes.bool,
    removeTodo: PropTypes.func,
    toggleComplete: PropTypes.func,
    loadEditTodo: PropTypes.func,
}

const initialState = {
    name: '',
    description: '',
    iscompleted: false,
}
const Todolist = () => {

    const [todos, setTodos] = useState(data);
    const [displayTodos, setDisplayStudents] = useState(data);
    const [formState, setFormState] = useState(initialState);
    const [editId, setEditId] = useState(null);
    const [filter, setFilter] = useState('all');

    const handlechange = (e) => {
        if (e.target.name === 'iscompleted') {
            setFormState({
                ...formState,
                iscompleted: e.target.checked,
            });
        } else {
            setFormState({
                ...formState,
                [e.target.name]: e.target.value,
            });
        }

    }
    const createTodo = (todoData) => {
        const temptd = { ...todoData };
        const id = Date.now();
        temptd.id = id;
        const temptds = [...todos, temptd]
        setTodos(temptds);
        setDisplayStudents(temptds);

    }
    const loadEditTodo = (id) =>{
        setEditId(id);
        const tdObj = todos.find((todo) => todo.id === id);
        setFormState(tdObj);
    };

    const editTodo = (tdData) => {

        tdData.id = editId;
        const index = todos.findIndex((todo) => todo.id === editId);
        const temptds = [...todos];
        temptds[index] = tdData;
        setTodos(temptds);
        setDisplayStudents(temptds);


        setEditId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            editTodo(formState);
        } else {
            createTodo(formState);
        }
        setFormState(initialState);
    };


    const removeTodo = (tdId) => {
        const temp = todos.filter((todo) => todo.id !== tdId);
        setTodos(temp);
        setDisplayStudents(temp);
    };

    const toggleComplete = (id) => {
        const tdObj = todos.find((todo) => todo.id === id);
        if (tdObj.iscompleted) {
            tdObj.iscompleted = false;
        } else {
            tdObj.iscompleted = true;
        } 


        const index = todos.findIndex((todo) => todo.id === id);
        const temptds = [...todos];
        temptds[index] = tdObj;
        setTodos(temptds);
        setDisplayStudents(temptds);

    };

    const changefilter = (e) => {
        setFilter(e.target.value);
        if (e.target.value === 'iscompleted') {
            setDisplayStudents(todos.filter(todo => !todo.iscompleted));
        } else if (e.target.value === 'Completed') {
            setDisplayStudents(todos.filter(todo => todo.iscompleted));
        } else {
            setDisplayStudents(todos);
        }

    }

    return (
        <>
            <div className='header'>
                <h2>MY TODO</h2>
            </div>

            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <input type={"text"} placeholder='Todo Name' style={{ width: 300, marginRight: 50, marginLeft: 50 }} name="name" value={formState.name} onChange={handlechange} required />
                    <input type={"text"} placeholder='Todo Description' style={{ width: 300, marginLeft: 50, marginRight: 50 }} name="description" value={formState.description} onChange={handlechange} required />
                    Completed &nbsp;
                    <input type={"checkbox"} name="iscompleted" value={formState.iscompleted} onChange={handlechange} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type={"submit"} className='Btn'>Add Todo</button>
                </form>
            </div>

            <div>
                <div className="dropdown">
                    <div><b>My Todos</b></div>
                    <div>
                        <b>Status filter:</b>&nbsp;
                        <select style={{ padding: 5 }} value={filter} onChange={changefilter}>
                            <option className="All" value="all">All</option>
                            <option className="Completed" value="Completed">Completed</option>
                            <option className="Incomplete" value="Incompleted">Incomplete</option>
                        </select>
                    </div>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent:"center",
            }}>
                {displayTodos.map((td) => (
                    <Todo key={td.id} {...td} removeTodo={removeTodo} toggleComplete={toggleComplete} loadEditTodo={loadEditTodo}/>))}

            </div>
        </>
    );
};

export default Todolist;