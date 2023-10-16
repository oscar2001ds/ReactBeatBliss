

export const SongPlaying = () => {
  return (
    <div className="flex w-[20px] h-[15px] gap-[1px]">
        <div className="flex mt-auto bottom-0 w-[2px] bg-[#1FDF64] animate-song-play"/>
        <div className="flex mt-auto bottom-0 w-[2px] bg-[#1FDF64] animate-song-play animate-delay-700"/>
        <div className="flex mt-auto bottom-0 w-[2px] bg-[#1FDF64] animate-song-play animate-delay-200"/>
        <div className="flex mt-auto bottom-0 w-[2px] bg-[#1FDF64] animate-song-play animate-delay-500"/>

    </div>
  )
}
