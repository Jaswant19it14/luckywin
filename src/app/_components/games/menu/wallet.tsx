import React from 'react'
import { Session } from 'next-auth'

interface props{
    session: Session|null
  }

const Wallet = ({session}:props) => {
  return (
    <div>Wallet</div>
  )
}

export default Wallet