import React, { useEffect, useState } from "react";
import Tictactoe from "./games/tic-tac-toe";
import Color from "./games/color";
import Rps from "./games/rps";
import Number from "./games/number";
import { Session } from 'next-auth'

interface props{
    session: Session|null,
    coins:number
  }

const Landing = ({session,coins}:props) => {
  console.log("coins1",coins)
  const [ component, setComponent] = useState(false);
  const [amount, setAmount] = useState(0);
  const [factor, setFactor] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element|null>();



  const Games = [
    {
      name: "Tic-tac-toe",
      component: <Tictactoe amount={setAmount} factor={setFactor}/>,
      color: "",
      image: "assets/tic-tac-toe-icon.svg",
    },
    {
      name: "Rock-Paper-Scissor",
      component: <Rps amount={setAmount} factor={setFactor}/>,
      color: "",
      image: "assets/rock-paper-scissors.png",
    },
    // {
    //   name: "Colour Guess",
    //   component: "",
    //   color: "",
    //   image: " ",
    // },
    {
      name: "Number Guess",
      component: <Number amount={setAmount} factor={setFactor}/>,
      color: "",
      image: "assets/123.png",
    },
  ];

  useEffect(()=>{
    setComponent(true)
    setSelectedComponent(<Color amount={setAmount} factor={setFactor} session={session} coins={coins}/>)
  },[coins])

  return (
    <>
    {component?(
      <>
          <div onClick={()=>setComponent(false)} className="py-2 px-4 bg-red-600 shadow-md rounded-md text-center text-white font-semibold">
            Back
          </div>
            {selectedComponent&&selectedComponent}
      </>
    ):(
      <div className="m-[5vw] grid grid-flow-row grid-cols-2 gap-[10vw] lg:grid-cols-3">
        <div
          className="h-[40vw] w-[40vw] items-center rounded-lg p-2 text-center shadow-lg lg:h-[25vw] lg:w-[25vw] active:p-6"
          onClick={() => {
            setSelectedComponent(<Color amount={setAmount} factor={setFactor} session={session} coins={coins}/>)
            setComponent(true)
          }}
        >
          {/* <img src={} alt="" /> */}
          <div className=" flex items-center justify-center h-[80%]">

          <span className="rounded-full bg-green-600 p-8 my-4"></span>
          <span className="rounded-full bg-red-600 p-8 my-4"></span>          
          </div>
          <span className="text-nowrap">R&G</span>
        </div>
        {Games.map((game, key) => (
          <div
            className="h-[40vw] w-[40vw] items-center rounded-lg p-2 text-center shadow-lg lg:h-[25vw] lg:w-[25vw] active:p-6"
            key={key}
            onClick={() => {
              setSelectedComponent(game.component)    
              setComponent(true)          
            }}
          >
            <img src={game.image} alt="" />
            <span className="text-nowrap">{game.name}</span>
          </div>
        ))}
        
        
      </div>
    )}
    </>
  );
};

export default Landing;
