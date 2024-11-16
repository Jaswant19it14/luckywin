import React from 'react'

interface props{
  amount: React.Dispatch<React.SetStateAction<number>>
  factor:  React.Dispatch<React.SetStateAction<number>>
}
const Tictactoe = ({amount,factor}:props) => {
  return (
    <div>tic-tac-toe</div>
  )
}

export default Tictactoe