import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from './counterSlice';

export default function CounterView() {

  const count = useSelector((state) => state.counter.count);

  console.log("Count", count);

  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count : {count}</h2>
      <button onClick={()=>{dispatch(increment())}} >Increment</button>
      <button onClick={()=>{dispatch(incrementByAmount(5))}} >Increment By 5</button>
      <button onClick={()=>{dispatch(decrement())}} >Decrement</button>
      <button onClick={()=>{dispatch(reset())}} >Reset</button>
    </div>
  )
}
