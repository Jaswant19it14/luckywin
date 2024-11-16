import React, { useEffect, useState } from "react";
import Timer from "./timer";
import { Session } from "next-auth";

// let coins = 100
let chosen = 4
interface props{
  amount: React.Dispatch<React.SetStateAction<number>>
  factor:  React.Dispatch<React.SetStateAction<number>>
  session: Session | null
  coins:number
}


const Color = ({amount,factor,session,coins}:props) => {
  const [bet, setAmount] = useState(0);
  const [choice, setChoice] = useState(1);
  const [winner, setWinner] = useState(3);
  const [active, setActive] = useState(true);
  const [win, setWin] = useState(false);
  const [history, setHistory] = useState<{data:[{winner:number,count:number}]}>()
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const amt = [
    { count: 10 },
    { count: 20 },
    { count: 50 },
    { count: 100 },
    { count: 200 },
    { count: 500 },
    { count: 1000 },
    { count: 2000 },
    { count: 5000 },
  ];
  console.log("###############################",chosen,winner,coins)

 
// };

  if(chosen==winner){
    chosen=4
    setWinner(3)
    if(session){
      void addCredits({id:session.user.id,amount:bet*1.8})
    }
    
    // amount(bet)
    // factor(1.8)

    console.log("1",bet)
    // upDateCoins(true)
    // console.log('@@@@@@/@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  }else if(winner!=3){
    // chosen=4
    // setWinner(3)
    console.log("2",bet)
  }

  const reset = () => {
    // console.log("reset called")
    setChoice(3);
    // setAmount(0);
  };

  // console.log(bet,"bet")
  const submitAmount = async () => {
    console.log(coins,bet)
    if(coins>=bet){

      setActive(false);
      setWinner(3)
      // console.log(
        //   "Submitting bet:",
        //   bet,
        //   "on " + `${choice == 0 ? "red" : choice == 1 ? "green" : "none"}`,
        // );
        try {
          const res = await fetch("/api/games/submitrg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice: choice, amount: bet, id:session?.user.id }),
      });
      const data = (await res.json()) as {message:string,credits:number};
      
      console.log("data",data);
    } catch (error) {
      console.error("Error:", error);
    }
    
    chosen = choice
    reset();
  }else{
    console.log(active ,choice ,bet)
    setError(true)
  }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/games/submitrg", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json() as {data:{data:[{winner:number,count:number}]}};
        setHistory(data.data);
        // console.log("data",data);
      } catch (error) {
        console.error("Error:", error);
      }    
    };
    // console.log("######### CHOSEN VALUE ",chosen,choice ,"WINNER ",winner)
    // if(chosen==winner){
    //   setWin(true)
    // }
    // chosen=4
    // setWinner(3)
  
    void fetchData();
  }, [active,setWinner]);
  
  

  return (
    <>
    {error&&
      <div className="absolute flex h-[80vh] w-[100vw] backdrop-blur-sm justify-center items-center">
      <div className="rounded shadow-sm ">

        <div className="flex w-full justify-end">
          <button className="shadow-md shadow-red-700 rounded-full px-2 bg-transparent " onClick={()=>{setError(false)}}>
          x
          </button>
        </div>
      <div className={`${winner==0?'bg-red-600':'bg-green-600'} py-4 px-6 rounded shadow-sm text-white font-semibold text-center text-lg`}>
        {/* <img src="/assets/victory.jpg" alt="" className="w-[40vw] mb-2" /> */}
        Insufficient Coins
      </div>
      </div>
      </div>
    }
    {win&&
      <div className="absolute flex h-[80vh] w-[100vw] backdrop-blur-sm justify-center items-center">
      <div className="rounded shadow-sm ">

        <div className="flex w-full justify-end">
          <button className="shadow-md shadow-red-700 rounded-full px-2 bg-transparent " onClick={()=>{setWin(false);setWinner(3)}}>
          x
          </button>
        </div>
      <div className={`${winner==0?'bg-red-600':'bg-green-600'} py-4 px-6 rounded shadow-sm text-white font-semibold text-center text-lg`}>
        <img src="/assets/victory.jpg" alt="" className="w-[40vw] mb-2" />
        You Won
      </div>
      </div>
      </div>
    }
      <div className="m-4">
        <div className="flex justify-between gap-2 lg:justify-start">
          <div className="w-[60vw] flex-col items-center">
            <div className="rounded-md px-2 py-4 text-center">
              <Timer setActive={setActive} setWinner={setWinner} choice={chosen} reset={reset} />
            </div>
            <div className="flex rounded-full border-4 border-white border-l-green-600 border-r-red-600 px-2 py-4 text-center">
              <div className="w-[50%]">
                <button
                  className="${} rounded-full bg-red-600 p-8 shadow-lg shadow-green-600 active:bg-red-500"
                  onClick={() => {
                    setChoice(0);
                  }}
                ></button>
              </div>
              <div className="w-[50%]">
                <button
                  className="rounded-full bg-green-600 p-8 shadow-lg shadow-red-600 active:bg-green-500"
                  onClick={() => setChoice(1)}
                ></button>
              </div>
            </div>
            <div className="mt-4 flex justify-around">
              <input
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-[60%] rounded border border-slate-400 px-2"
                placeholder="200"
                value={bet}
              />
              <button
                className="rounded-md bg-red-500 p-2 font-semibold text-slate-300"
                onClick={() => setAmount(0)}
              >
                Clear
              </button>
            </div>
            <div className="my-4">
              <div className="grid grid-flow-row grid-cols-3 gap-2">
                {amt.map((item, key) => (
                  <button
                    key={key}
                    className="items-center rounded-tl-xl border-2 border-green-400 bg-green-500 py-1 text-center font-semibold text-green-50 text-md active:opacity-50"
                    onClick={() => setAmount(bet + item.count)}
                  >
                    +{item.count}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4 w-[30vw] rounded-md g:w-[10vw]">
            History
            {history?.data.map((item,key)=><>
            <div key={key} className="flex text-xs justify-between w-full my-1">
              <div>
                {item.count}
              </div>
              <div className={`p-2 rounded full ${item.winner==0?'bg-red-600':'bg-green-600'}`}>

              </div>

              {/* {item.count}-----{item.winner} */}
            </div>
            </>)}
          </div>
        </div>
        <div className="w-full">
          <button
            disabled={!active || choice == 3 || bet == 0}
            className={`w-full rounded-md ${choice == 0 ? `bg-red-600` : choice == 1 ? `bg-green-600` : `bg-blue-600`} px-4 py-2 text-center font-semibold text-white shadow-md active:bg-blue-500`}
            onClick={submitAmount}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Color;


export const addCredits = async ({id,amount}:{id:string,amount:number}) => {
  // setLoading(true);
  // setError(null);

  try {
    console.log("#####################################___________######### adding credits",id,amount)
    const response = await fetch("/api/credits/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update credits");
    }

    const data = await response.json() as JSON;
    console.log(data)
    // setCredits(data.credits); // Set the updated credits in the state
  } catch (err) {
    // setError(err.message || "An error occurred");
  } finally {
    // setLoading(false);
  }
};
