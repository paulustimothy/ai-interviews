import { ReactNode } from 'react'

// Any page components placed within the (root) directory will automatically be wrapped by this layout
const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>{children}</div>
  )
}

export default RootLayout