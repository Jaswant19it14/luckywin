import React, { useEffect, useState } from "react";
import Timer from "./timer";

const Color = () => {
  const [amount, setAmount] = useState(0);
  const [choice, setChoice] = useState(3);
  const [active, setActive] = useState(true);
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

  const reset = () => {
    setChoice(3)
    setAmount(0)
  }

  // console.log(amount,"amount")
  const submitAmount = () => {
    console.log("Submitting amount:", amount, "on "+`${choice==0?'red':choice==1?'green':"none"}`);
    fetch('/api/games/submitrg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ choice: choice, amount:amount }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    
    
    reset()
  };

  return (
    <>
      <div className="m-4">
        <div className="flex justify-between gap-2 lg:justify-start">
          <div className="w-[60vw] flex-col items-center">
            <div className="rounded-md px-2 py-4 text-center">
              <Timer setActive={setActive}/>
            </div>
            <div className="flex rounded-full border-4 border-white border-l-green-600 border-r-red-600 px-2 py-4 text-center">
              <div className="w-[50%]">
                <button className="rounded-full ${} bg-red-600 p-8 shadow-lg shadow-green-600 active:bg-red-500" onClick={()=>{setChoice(0)}}></button>
              </div>
              <div className="w-[50%]">
                <button className="rounded-full bg-green-600 p-8 shadow-lg shadow-red-600 active:bg-green-500" onClick={()=>setChoice(1)}></button>
              </div>
            </div>
            <div className="flex justify-around mt-4">
              <input
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-[60%] border border-slate-400 rounded px-2"
                placeholder="200"
                value={amount}
              />
              <button
                className="p-2 rounded-md bg-red-500 text-slate-300 font-semibold"
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
                    className="items-center rounded-tl-xl border-2 border-green-400 bg-green-500 py-2 text-center font-extrabold text-green-50 active:text-sm active:opacity-50"
                    onClick={() => setAmount(amount + item.count)}
                  >
                    +{item.count}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4 flex w-[30vw] justify-center rounded-md shadow-xl shadow-gray-600 lg:w-[10vw]">
            history
          </div>
        </div>
        <div className="w-full">
          <button
          disabled={!active}
            className={`w-full rounded-md ${choice==0?`bg-red-600`:choice==1?`bg-green-600`:`bg-blue-600`} px-4 py-2 text-center font-semibold text-white shadow-md active:bg-blue-500`}
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
