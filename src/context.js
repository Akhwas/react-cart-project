import React, { useState, useContext, useReducer, useEffect } from 'react'
import CartItem from './CartItem'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()
const intialState = {
  loading:false,
  cart:cartItems,
  amount:1,
  total:0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,intialState)

  const clearCart = ()=>{
    dispatch({type:'CLEAR_ALL'})
  }

  const removeSingleItem = (id)=>{
    dispatch({type:'REMOVE_ITEM',payLoad:id})
    
  }

  const increase = (id)=>{
    dispatch({type:'INCREASE',payLoad:id})
  }
  const decrease = (id)=>{
    dispatch({type:'DECREASE',payLoad:id})
  }

  const newTotal = ()=>{
    dispatch({type:'NEW_TOTAL'})
  }

  const fetchData = async()=>{
    dispatch({type:'LOADING'})
    const response=await fetch(url)
    const cart = await response.json()
    dispatch({type:'DISPLAY_CART',payLoad:cart})
  }

  const toggleAmount =(id,type)=>{
    state.cart.find((cartItem)=>cartItem.id===id)
    dispatch({type:'TOGGLE_AMOUNT',payLoad:{id,type}})
  }



  useEffect(()=>{
    fetchData()},[])
 
 
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeSingleItem,
        increase,
        decrease,
        newTotal,
        fetchData,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
