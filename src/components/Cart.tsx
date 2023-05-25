import React from 'react'
import { useAppSelector } from '../../store'

export default function Cart() {
  const cart = useAppSelector(state=>state.cart) as number ;
   
  return (
    <div>Cart - {cart}</div>
  )
}
