import React, { createContext, useState,useEffect } from 'react'

export const ThemeContext=createContext();


const ThemeProvider = ({ children }) => {

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
   }, [isDark]);
  return (
   <ThemeContext.Provider value={{loading,setLoading,isDark,setIsDark}}>
    {children}
   </ThemeContext.Provider>
  )
}

export default ThemeProvider