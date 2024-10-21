import React from 'react'

const button = ({text}) => {
  return (
    <div className='bg-blue-600 inline p-1 text-white cursor-pointer rounded text-center mt-3'>
      {text}
    </div>
  )
}

export default button
