import React, { useContext } from 'react';
import '../App.css';
import Loading from './Loading';
import TodoItem from './TodoItem';
import { ThemeContext } from '../context/ThemeProvider';


const TodoList = ({ editText, data, editingId, onEdit, onDelete, onSave, onToggle }) => {
const {loading,isDark,setIsDark}=useContext(ThemeContext);



console.log(loading)


  return (
    <ul className={isDark?'darkMode'+' todoList':'lightMode'+' todoList'} >
      {loading ? (
        <Loading/> 
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <TodoItem
            key={item.id}
            item={item}
            editingId={editingId}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            onToggle={onToggle}
            index={index + 1}
            editText={editText}
          
          />
        ))
      ) : (
        <li className="no-tasks" style={{listStyle:'none',textAlign:'center',fontSize:'20px'}}>No tasks to show</li>
      )}
    </ul>
  );
};

export default TodoList;
