import React, { useContext, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";

import '../App.css';
import { ThemeContext } from '../context/ThemeProvider';
import { CiDark } from "react-icons/ci";


const TodoForm = ({ onSubmit, data }) => {
  const {isDark,setIsDark}=useContext(ThemeContext);

  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText) return;
    onSubmit(inputText);
    setInputText('');
  };

  return (
      <form  className={isDark?'darkMode' + ' todoForm':'lightMode'+' todoForm'} onSubmit={handleSubmit}>
 <p>Tasks: {data.length}</p>
        <input 
 className='todoAdd'
  type='text'
  placeholder='Enter a new task...'
  onChange={(e) => setInputText(e.target.value)}
  value={inputText}
/>
<div className="buttons">
<button onClick={()=>setIsDark(!isDark)} className={isDark?'darkMode '+'darkModeBtn':'lightMode '+'darkModeBtn'}>
<CiDark />

</button>
<button  className={isDark?'darkMode '+'addBtn':'lightMode '+'addBtn'} type='submit'>
    <IoIosAddCircle />
  </button>
  </div>  
      </form>
   
  );
};

export default TodoForm;
