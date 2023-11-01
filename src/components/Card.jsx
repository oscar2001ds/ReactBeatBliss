import { useEffect, useState } from "react"
import { useGlobalVariables } from "../store/GlobalVariables"
import pauseIcon from '../assets/icons/pause.svg'
import playIcon from '../assets/icons/play.svg'
import { useNavigate  } from 'react-router-dom';

export const Card = ({ idValue, img, title, desc, typeCard, gradientColors='bg-gradient-to-b from-[#181818] via-[#181818] to-[#1b1b1b]' }) => {

  const { posts, currentAlbumId, setCurrentAlbumId, currentPlaylist ,setCurrentPlaylist, albums,
    setCurrentSongPos, currentSongId, setCurrentSongId, playState, setPlayState, setInfoButton, albumRecently, albumSearch, currentUrl,firstPostLoad, setFirstPostLoad } = useGlobalVariables()
  const [hoverCard, setHoverCard] = useState(false)
  const navigate = useNavigate ();

  const handleHoverCard = (e) => {
    if (e.type === 'mouseenter') {
      setHoverCard(true)
    }
    else if (e.type === 'mouseleave') {
      setHoverCard(false)
    }

  }

  const handleCardClick = (e) => {
    if (typeCard === 'songs') {
      setInfoButton(true)
    }
    else if (typeCard === 'albums') {
      navigate(`/playlist/${idValue}`);
    }
  }

  const handlePlay = (e) => {
    e.stopPropagation()
    if(!firstPostLoad) setFirstPostLoad(true)
    if (typeCard === 'songs') {
      if (currentSongId === idValue) {
        if (playState) {
          setPlayState(false)
        }
        else {
          setPlayState(true)
        }
      }
      else {
        if (currentUrl.includes('/search')) {
          const currentSongPosition = albumSearch.findIndex((post) => post.id === idValue)
          if (currentPlaylist.data !== albumSearch ) {
            setPlayState(false)
            setTimeout(() => {
              setCurrentAlbumId('')
              setCurrentPlaylist({data:albumSearch,initialSongPos:currentSongPosition})
            }, 200);
          }
          else {
            setCurrentSongId(idValue)
            setCurrentSongPos(currentSongPosition)
          }
        }
        else{
          const currentSongPosition = albumRecently.findIndex((post) => post.id === idValue)
          if (currentPlaylist.data !== albumRecently ) {
            setPlayState(false)
            setTimeout(() => {
              setCurrentAlbumId('')
              setCurrentPlaylist({data:albumRecently,initialSongPos:currentSongPosition})
            }, 200);
          }
          else {
            setCurrentSongId(idValue)
            setCurrentSongPos(currentSongPosition)
          }
        }
      }
    }
    else if (typeCard === 'albums') {
      if (currentAlbumId === idValue) {
        if (playState) {
          setPlayState(false)
        }
        else {
          setPlayState(true)
        }
      }
      else{
        const album = albums.filter((album) => album.albumName === title)[0]
        const idSongs = album.songs
        const newPlaylist = posts.filter((post) => idSongs.includes(post.id))
        setPlayState(false)
        setCurrentAlbumId(idValue)
        setTimeout(() => {
          setCurrentPlaylist({data:newPlaylist,initialSongPos:0})
        }, 200);
      }

    }
  }


  return (
    <div id={`card${idValue}`} className={`relative w-[150px] h-[230px] overflow-hidden p-2 gap-2 rounded-xl flex flex-col items-center hover:cursor-pointer hover:to-[#484848] ${gradientColors}`}
      onMouseEnter={handleHoverCard} onMouseLeave={handleHoverCard} onClick={handleCardClick}>
      <img src={img} alt="" className="flex h-[150px] rounded-xl object-cover" />
      <div className="flex flex-col w-full items-start">
        <strong className="text-sm font-bold h-[20px] overflow-hidden text-white" style={{textTransform:'capitalize'}}>{title}</strong>
        <p className="text-xs text-gray-400 overflow-hidden" style={{textTransform:'capitalize'}}>{desc}</p>
      </div>

      <div className={`absolute bottom-1/4 right-2.5 rounded-full w-[35px] h-[35px] bg-[rgb(1,190,70)] hover:bg-[#1FDF64]  hover:scale-110 ${hoverCard || currentSongId === idValue || currentAlbumId=== idValue? '' : 'hidden'}`} onClick={handlePlay}
        style={{
          paddingLeft: `${playState ? '10px' : '10px'}`,
          paddingRight: `${playState ? '2px' : '2px'}`,
          paddingTop: `${playState ? '10px' : '10px'}`,
          paddingBottom: `${playState ? '10px' : '10px'}`,
        }}>

        <div className="w-full h-full bg-contain bg-no-repeat pointer-events-none" style={{
          backgroundImage: `url(${playState && (currentSongId === idValue || currentAlbumId=== idValue) ? pauseIcon : playIcon})`,
        }}>
        </div>

      </div>
    </div >
  )
}
