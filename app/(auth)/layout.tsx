import { ReactNode } from 'react'

// Any page components placed within the (auth) directory will automatically be wrapped by this layout
const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>{children}</div>
  )
}

export default AuthLayout