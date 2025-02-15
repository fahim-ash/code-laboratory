import React, { createContext, useState, useEffect } from 'react'; 

const Context = createContext();

export const GlobalContext = ({ children }) => {
    const [globalcontext, setGlobalContext] = useState( localStorage.getItem("user") || ' you are seeing hte context value');

    useEffect(() => {
      localStorage.setItem("user", globalcontext);
    }, [globalcontext]);
  
    return (
      <Context.Provider value={{ globalcontext, setGlobalContext }}>
        {children}
      </Context.Provider>
    );
  };

export default Context;
  