import { createContext, useContext, useState } from "react"

const MainContext = createContext()

export const useMain = () => {
  return useContext(MainContext)
}

export const MainProvider = ({ children }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [settings, setSettings] = useState({
    online: false,
    storage: false,
    darkmode: false
  })

  const useMainValues = () => {
    return {
      name,
      email,
      settings
    }
  }

  const changeName = value => setName(value)
  const changeEmail = value => setEmail(value)
  const changeSettings = value => setSettings(value)

  return (
    <MainContext.Provider
      value={{
        useMainValues,
        changeName,
        changeEmail,
        changeSettings
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
