import React, { createContext } from 'react'

const AppContext = createContext();

const AppContext = ({children}) => {
  const [checkedIk3, setCheckedIk3] = useState(false);
  /* const [ik3, setIk3] = useState("");
  const [cosfii, setCosfii] = useState("0.90"); */

  return (
    <AppContext.Provider value={{ checkedIk3, setCheckedIk3, /* ik3, setIk3, cosfii, setCosfii  */}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext