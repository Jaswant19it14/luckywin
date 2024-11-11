"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import Landing from "./home";

export function LatestPost() {
  // const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [hidden, setHidden] = useState(true);
  // const createPost = api.post.create.useMutation({
  //   onSuccess: async () => {
  //     await utils.post.invalidate();
  //     setName("");
  //   },
  // });

  const Menu =[
    {
      name:"Profile",
      url : " "
    },
    {
      name:"Games",
      url : " "
    },
    {
      name:"Wallet",
      url : " "
    },
    {
      name:"FAQs",
      url : " "
    }
  ]

  return (
    <>
    <div className="h-full">

    {/* Header */}
      <div className="flex justify-between shadow-sm shadow-slate-400">
        <div >
        {!hidden ? (
              <img
                src="assets/back.svg"
                alt=""
                onClick={() => setHidden(!hidden)}
              />
        ) : (
          <img
                src="assets/menu.svg"
                alt=""
                onClick={() => setHidden(!hidden)}
              />
              
            )}
            
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex justify-around w-full">
            Logo
          </div>
          <div className="w-[20%]">
            Coins
          </div>
        </div>
      </div>
      <div className="flex-col items-end w-full gap-4">
        {!hidden&&<div className="flex-col z-20 gap-4 absolute backdrop-blur-sm w-[100%] p-2">
            {Menu.map((item,key)=>(
          <div key={key} className="w-[40%] lg:w-[10%] py-4 my-4 bg-blue-50 rounded-lg">
              <span className="px-3 text-ellipsis font-semibold text-blue-950 text-lg">
                {item.name}
              </span>
          </div>
            ))}
        </div>}
        <Landing/>

      </div>
      
    </div>
    </>
  );
}
