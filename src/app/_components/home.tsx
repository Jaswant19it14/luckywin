import React from "react";
import Tictactoe from "./games/tic-tac-toe";

const Landing = () => {
  const Games = [
    {
      name: "Tic-tac-toe",
      component: <Tictactoe/>,
      color: "",
      image: "assets/tic-tac-toe-icon.svg",
    },
    {
      name: "Rock-Paper-Scissor",
      component: "",
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
      component: "",
      color: "",
      image: "assets/123.png",
    },
  ];
  return (
    <>
      <div className="m-[5vw] grid grid-flow-row grid-cols-2 gap-[10vw] lg:grid-cols-3">
        {Games.map((game, key) => (
          <div
            className="h-[40vw] w-[40vw] items-center rounded-lg p-2 text-center shadow-lg lg:h-[25vw] lg:w-[25vw] active:p-6"
            key={key}
            onClick={() => {
              game.component;
            }}
          >
            <img src={game.image} alt="" />
            <span className="text-nowrap">{game.name}</span>
          </div>
        ))}
        <div
          className="h-[40vw] w-[40vw] items-center rounded-lg p-2 text-center shadow-lg lg:h-[25vw] lg:w-[25vw] active:p-6"
        //   key={key}
        //   onClick={() => {
        //     game.component;
        //   }}
        >
          {/* <img src={} alt="" /> */}
          <div className=" flex items-center justify-center h-[80%]">

          <span className="rounded-full bg-green-600 p-8 my-4"></span>
          <span className="rounded-full bg-red-600 p-8 my-4"></span>          </div>
          <span className="text-nowrap">R&G</span>
        </div>
        
      </div>
    </>
  );
};

export default Landing;
