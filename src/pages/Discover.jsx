import { useEffect, useRef, useState } from "react"
import { useGlobalVariables } from "../store/GlobalVariables"
import { AlbumsContainers } from "../components/AlbumsContainers"
import { Navbar } from "../components/Navbar"


export const Discover = () => {
    const {infoButton, albumRecently, albumDiscover, albumMood } = useGlobalVariables()

    return (
        <div id="discoverPage" className={`discover-scroll flex flex-col flex-grow bg-gradient-to-b from-[#212121] via-[#121212] to-[#121212] rounded-lg gap-2 overflow-x-hidden overflow-y-auto`}>
            
            <Navbar/>

            <div className="flex flex-col flex-grow rounded-lg px-6 pb-6 gap-8 ">
                {/* Recently played Songs */}
                <AlbumsContainers title={"Moment Songs"} list={albumRecently} typeCard={'songs'} 
                gradientColors='bg-gradient-to-br from-[#181818] via-[#000000] to-[#31084f]' />
                {/* Discover albums*/}
                <div>
                    <AlbumsContainers title={"Discover albums"} list={albumDiscover} typeCard={'albums'} 
                    gradientColors='bg-gradient-to-br from-[#181818] via-[#181818] to-[#1b1b1b]' />
                </div>
                {/* Mood*/}
                <div>
                    <AlbumsContainers title={"Mood"} list={albumMood} typeCard={'albums'} 
                    gradientColors='bg-gradient-to-br from-[#181818] via-[#181818] to-[#1b1b1b]' />
                    {/* 'bg-gradient-to-br from-[#181818] via-[#181818] to-[#1b1b1b]' */}
                    {/* 'bg-gradient-to-br from-[#181818] via-[#000000] to-[#0f0444]' */}
                </div>
            </div>
            
        </div>
    )
}
