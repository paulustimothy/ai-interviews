import { ReactNode } from 'react'

// Any page components placed within the (auth) directory will automatically be wrapped by this layout
const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="auth-layout">{children}</div> //auth-layout is a class name from globals.css
  )
}

export default AuthLayout