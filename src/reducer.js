// import { useReducer } from "react";
const reducer =(state,action)=>{
    if(action.type==='CLEAR_ALL'){
        return {...state,cart:[]}
    }
    if(action.type==='REMOVE_ITEM'){
        const newItems = state.cart.filter((item)=>item.id!==action.payLoad)
        
        return {...state,cart:newItems}

    }

    

    
    if (action.type==='INCREASE'){
        let tempCart=state.cart.map((cartItem)=>{
            if(cartItem.id===action.payLoad){
                return{...cartItem,amount:cartItem.amount+1}
            }
            return cartItem
        })
        return {...state,cart:tempCart}
    }

    if(action.type==='DECREASE'){
        let tempCart = state.cart.map((cartItem)=>{
            if(cartItem.id===action.payLoad){
                return{...cartItem,amount:cartItem.amount-1}   
            }
            return cartItem
        }).filter((cartItem)=>cartItem.amount !==0
        )
        return {...state,cart:tempCart}
    }
    if(action.type==='TOGGLE_AMOUNT'){
        let tempCart = state.cart.map((cartItem)=>{
            if(cartItem.id != action.payLoad.id){
                return cartItem
            }
            else{
                if(action.payLoad.type==='INC'){
                    
                    return{...cartItem,amount:cartItem.amount+1}
                }
                if(action.payLoad.type==='DEC'){
                    console.log('hello')
                    return{...cartItem,amount:cartItem.amount-1}
                }
            }
        }).filter((cartItem)=>cartItem.amount!==0)
        return {...state,cart:tempCart}
    }
    if(action.type =='NEW_TOTAL'){
        let {total,amount} = 
            state.cart.reduce((totalCart,cartItem)=>{
                let{price,amount}=cartItem
                // const itemTotal = 
                totalCart.total+=price*amount
                totalCart.amount+=amount
                return totalCart
            },{total:0,amount:0})
             total = parseFloat(total.toFixed(2))
        return{...state,total,amount}  
    }

    if(action.type==='LOADING'){
        return {...state,loading:true}
    }

    if(action.type==='DISPLAY_CART'){
        return{...state,cart:action.payLoad,loading:false}
    }
    throw new Error ('No action match')
}

export default reducer

