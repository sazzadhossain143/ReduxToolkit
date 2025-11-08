import React, { useState } from 'react'
import CounterView from './features/counter/CounterView'
import PostView from './features/posts/PostView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <h1>Counter App</h1>
        <CounterView />

        <PostView />
      </div>
    </>
  )
}

export default App
