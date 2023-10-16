import { useEffect, useState } from "react"
import { useGlobalVariables } from "../store/GlobalVariables"

export const RightSide = () => {
  const { currentSongId, songImg, songName, songArtist, songGenre, artistImg, artistDesc, infoButton } = useGlobalVariables()

  return (
    <div className={`discover-scroll h-full w-[23vw] bg-[#121212] rounded-lg overflow-x-hidden overflow-y-auto ${infoButton?'':'hidden'}`}>
      <div className="flex flex-col w-full h-full p-4">
        <img src={songImg} alt="" className="flex h-[300px] rounded-xl object-cover" />
        <div className="flex flex-col w-full items-start">
          <strong className="text-3xl font-bold overflow-hidden text-white" style={{textTransform:'capitalize'}}>{songName}</strong>
          <p className="text-sm text-gray-400 overflow-hidden" style={{textTransform:'capitalize'}}>{songGenre}</p>
        </div>

        <img src={artistImg} alt="" className="flex h-[300px] rounded-xl object-cover mt-5" />
        <div className="flex flex-col w-full items-start mt-2 gap-2">
          <strong className="text-3xl font-bold overflow-hidden text-white" style={{textTransform:'capitalize'}}>{songArtist}</strong>
          <p className="text-xs text-gray-400 overflow-hidden" style={{textTransform:'capitalize'}}>{artistDesc}</p>
        </div>
      </div>
    </div>
  )
}
