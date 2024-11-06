import React, { useContext, useState } from 'react';
import '../App.css';

import { FaDeleteLeft } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { FaSave } from "react-icons/fa";
import { ThemeContext } from '../context/ThemeProvider';


const TodoItem = ({ editText,index,item, editingId, onEdit, onDelete, onSave,onToggle }) => {

  const {isDark}=useContext(ThemeContext);

    const handleSave = () => {
      onSave(item.id, editText);
    };
  
  

  return (
<li className={isDark?'darkMode' + ' todoItem':'lightMode'+' todoItem'} key={item.id}>
            {editingId === item.id ? (
              <div className={isDark?'darkMode' + ' editSave':'lightMode'+' editSave'}>
                <input
                className={isDark?'darkMode' + ' editInput':'lightMode'+' editInput'}
                  type='text'
                  value={editText}
                  onChange={(e) =>onEdit(item.id, e.target.value)}
                />
                <FaSave className='save' onClick={handleSave}  />
              </div>
            ) : (
           <div className={isDark?'itemBox '+'darkMode':'lightMode ' + 'itemBox'}
           onClick={() => onToggle(item.id, !item.checked)} 
          style={{
            textDecoration: item.checked ? 'line-through' : 'none',
            cursor: 'pointer',
          }}>
               {item.todo}
                <div className={isDark?'itemEdit '+'darkMode':'lightMode ' + 'itemEdit'}>
                <TiEdit className='icon' onClick={() => onEdit(item.id, item.todo)}  />
                <FaDeleteLeft className='icon' onClick={() => onDelete(item.id)} />
                </div>
              
        
           
       </div>
           )}
          </li>
  )
}

export default TodoItem