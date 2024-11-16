"use client";

import { useState, useEffect } from "react";
import Landing from "./home";
import { Session } from "next-auth";
import Faq from "./games/menu/faq";
import Profile from "./games/menu/profile";
import Wallet from "./games/menu/wallet";
import { checkCoins } from "utils/credits";
import { error } from "console";

interface Props {
  session: Session;
}

let flag = true;

export function LatestPost({ session }: Props) {
  const [coins, setCoins] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [component, setComponent] = useState<JSX.Element | null>();

  console.log("coins2", coins);

  // checkCoins(session.user.id).then(console.log).catch(console.error);


  useEffect(() => {
    const fetchCoins = async () => {
      try {
        console.log("Fetching coins...");
        const response = await fetch(
          `/api/credits/check?id=${session.user.id}`,
          { method: "GET" },
        );
        const data = await response.json() as {credits :number};

        if (response.ok && data.credits !== undefined) {
          setCoins(data.credits);
          console.log("Fetched coins:", data.credits);
        } else {
          console.error(
            "Failed to fetch credits:",
          );
        }
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    const intervalId = setInterval(() => {
      const serverDate = new Date();
      const seconds = 60 - serverDate.getSeconds();
      // console.log(seconds)
      // console.log(flag)
      if (seconds < 55 && seconds > 50 && flag) {
        void fetchCoins();
        flag = false;
      }
      if (seconds < 10) {
        flag = true;
      }
    }, 1000); // Fetch coins every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [session.user.id]);

  const updateCoins = (won: boolean) => {
    setCoins((prevCoins) => (won ? prevCoins * 1.8 : prevCoins * 0.8));
  };

  const Menu = [
    {
      name: "Profile",
      url: <Profile session={session} />,
    },
    {
      name: "Games",
      url: <Landing session={session} coins={coins} />,
    },
    {
      name: "Wallet",
      url: <Wallet session={session} />,
    },
    {
      name: "FAQs",
      url: <Faq />,
    },
  ];

  return (
    <>
      <div className="h-full">
        {/* Header */}
        <div className="flex justify-between shadow-sm shadow-slate-400">
          <div>
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
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full justify-around">
              <img src="assets/logo.svg" alt="" />
            </div>
            <div className="mr-5 flex w-[20%] items-end justify-center">
              <img src="assets/coins.svg" alt="" />
              <span className="ml-1">{coins.toFixed(0)}</span>
            </div>
          </div>
        </div>
        <div className="w-full flex-col items-end gap-4">
          {!hidden && (
            <div className="absolute z-20 w-[100%] flex-col gap-4 p-2 backdrop-blur-sm">
              {Menu.map((item, key) => (
                <div
                  key={key}
                  className="my-4 w-[40%] rounded-lg bg-blue-50 py-4 lg:w-[10%]"
                >
                  <span
                    className="text-ellipsis px-3 text-lg font-semibold text-blue-950"
                    onClick={() => {
                      setComponent(item.url)
                      setHidden(true);
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          {component ? component : <Landing session={session} coins={coins} />}
        </div>
      </div>
    </>
  );
}
