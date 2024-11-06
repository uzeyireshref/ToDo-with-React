import './App.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeProvider, { ThemeContext } from './context/ThemeProvider';
import Loading from './components/Loading';


function App() {
  const [data, setData] = useState([]);

  const [inputCheck, setInputCheck] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const {setLoading}=useContext(ThemeContext);
  const {isDark,setIsDark}=useContext(ThemeContext)

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchData = () => {
    setLoading(true);
    axios.get('https://tsnhqchigbafwahtmdpf.supabase.co/rest/v1/todo?select=*', {
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleSubmit = (inputText) => {
    if (!inputText) return;

    axios.post('https://tsnhqchigbafwahtmdpf.supabase.co/rest/v1/todo', {
      todo: inputText,
    }, {
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then(() => {
      
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`https://tsnhqchigbafwahtmdpf.supabase.co/rest/v1/todo?id=eq.${id}`, {
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const handleEditSubmit = (id,newText) => {
    if (!newText) return;
    axios.patch(`https://tsnhqchigbafwahtmdpf.supabase.co/rest/v1/todo?id=eq.${id}`, {
      todo: newText, 
    }, {
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then(() => {
        setEditingId(null);
        setEditText('');
        fetchData(); 
        
      })
      .catch((err) => {
        console.log("Error while updating:", err);
      });
  };

 

  const handleEditClick = (id, todo) => {
    setEditingId(id);
    setEditText(todo);
  };
  
  
  const onToggle = (id, isChecked) => {
    axios.patch(`https://tsnhqchigbafwahtmdpf.supabase.co/rest/v1/todo?id=eq.${id}`, {
      checked: isChecked,
    }, {
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };


const dark='darkMode';
const light='lightMode'
  return (
    

<div className={isDark?'body '+dark:light + ' body'}>
    <div className={isDark?'App '+light:'App '+ dark}>
      <TodoForm data={data} onSubmit={handleSubmit}/>
    <TodoList 
      data={data}
      editingId={editingId}
      onEdit={handleEditClick}
      onDelete={handleDelete}
      onSave={handleEditSubmit}
      onToggle={onToggle}
      editText={editText} 
     />
    </div>
    </div>
  );
}

export default App;
