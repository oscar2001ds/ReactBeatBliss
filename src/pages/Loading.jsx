import { useEffect, useRef, useState } from "react"

export const Loading = () => {
    const messagesArray = useRef(['Recuerda que BeatBliss es 100% funcional, disfruta de toda la música disponible.', 'La primera conexión puede demorar, por favor espera.', 'Conectando con el servidor...'])
    const [currentMsg, setCurrentMsg] = useState(messagesArray.current[0])
    useEffect(() => {
        let i = 1;
        const interval = setInterval(()=>{
            if(i>messagesArray.current.length-1) i=0;
            setCurrentMsg(messagesArray.current[i]);
            i+=1;
        },5000)

        return () => {
            clearInterval(interval);
        }
    }, []);
    
    return (
        <div className="w-full h-full bg-opacity-80 bg-gray-700 flex justify-center items-center">
            <div className="flex gap-2">
                <p className="font-bold text-2xl">
                    {currentMsg}
                </p>

            </div>
        </div>
    )
}
