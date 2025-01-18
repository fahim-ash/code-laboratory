import React, { createContext, useState } from 'react'; 

const Context = createContext();

export const GlobalContext = ({ children }) => {
    const [globalcontext, setGlobalContext] = useState(' you are seeing hte context value');
  
    return (
      <Context.Provider value={{ globalcontext, setGlobalContext }}>
        {children}
      </Context.Provider>
    );
  };

export default Context;
  