import React from 'react'

interface props{
  amount: React.Dispatch<React.SetStateAction<number>>
  factor:  React.Dispatch<React.SetStateAction<number>>
}

const Number = ({amount,factor}:props) => {
  return (
    <div>Nnumber</div>
  )
}

export default Number