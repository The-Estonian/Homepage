import React from 'react'
import { useSelector } from 'react-redux';

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  console.log(isAuthenticated);
  return (
    <>
    <div>Welcome page / Home!</div>
    {isAuthenticated.toString()}
    </>
  )
}

export default HomePage