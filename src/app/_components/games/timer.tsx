import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(new Date().getSeconds().toString());

    useEffect(() => {
        // Simulate fetching time from a server every second
        const intervalId = setInterval(() => {
            const serverDate = new Date(); // Replace with server time if available
            const seconds = 60-serverDate.getSeconds()
            if(seconds>=50){
                setSeconds("Time Out")
            }else if(seconds>45&&seconds<50){
                setSeconds("Get Ready")
            }else{
                setSeconds((60-serverDate.getSeconds()).toString());
            }
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
