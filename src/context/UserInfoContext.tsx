import { FC, createContext, useContext, useState } from 'react'

const UserInfoContext = createContext({
  userInfo: {},
  setUserInfo: info => {},
})

export const useUserInfo = () => useContext(UserInfoContext)

export default UserInfoContext

export const UserInfoProvider: FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState({})
  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}
