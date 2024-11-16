import React, { useEffect, useState } from 'react';

type TimerProps = {
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    setWinner: React.Dispatch<React.SetStateAction<number>>;
    choice:number;
    reset:()=>void;
  };

let flag = true
const Timer = ({setActive,setWinner,choice,reset}:TimerProps) => {
    const [seconds, setSeconds] = useState(new Date().getSeconds().toString());

    // console.log(choice)

    useEffect(() => {
        // Simulate fetching time from a server every second
        const intervalId = setInterval(() => {
            const updateSecondsAndCheckServer = async () => {
                const serverDate = new Date();
                const seconds = 60 - serverDate.getSeconds();
        
                if (seconds >= 50) {
                    setSeconds("Time Out");
                    // setActive(false);
                    // console.log("flag",flag);
        
                    if (flag) {
                        try {
                            setActive(true);
                            const res = await fetch('/api/games/submitrg', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                            });
                            const { winner } = await res.json() as { winner: number };
                            // console.log("winner ",winner);
                            setWinner(winner)
                            // if(winner==choice){
                            //     setWinner(true)
                            // }
                            
                            // setWinner(winner);
                        } catch (error) {
                            console.error("Error:", error);
                        }
                        if(seconds<51){
                            reset()
                        }
                    }
                    flag = false;
                } else if (seconds > 45 && seconds < 50) {
                    setSeconds("Get Ready");
                    flag = true;
                } else {
                    setSeconds((60 - serverDate.getSeconds()).toString());
                }
            };
        
            // Call the asynchronous function within the synchronous interval callback
            void updateSecondsAndCheckServer();
        }, 1000);
        

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={seconds.length<3&&parseInt(seconds)<10?`text-red-600 font-semibold text-3xl`:`text-green-600 font-semibold text-3xl `}>
            {seconds}
        </div>
    );
};

export default Timer;
