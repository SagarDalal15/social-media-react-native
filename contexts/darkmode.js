import { createContext, useState } from "react";

export const DarkModeContext = createContext();
export const DarkModeContextProvider = (props) => {
  const [DarkMode, setDarkMode] = useState(false);
  return (
    <DarkModeContext.Provider value={{ DarkMode: [DarkMode, setDarkMode] }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};
