import React, { useEffect } from 'react'
import { useGlobalContext } from './context'

// components
import Navbar from './Navbar'
import CartContainer from './CartContainer'
// items

function App() {
  const{cart,amount,loading,newTotal}=useGlobalContext()
  useEffect(()=>newTotal(),[cart])
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
