import { useEffect, useRef, useState } from "react"
import { useGlobalVariables } from "../store/GlobalVariables"
import previousIcon from '../assets/icons/previous.svg'
import playIcon from '../assets/icons/play.svg'
import pauseIcon from '../assets/icons/pause.svg'
import nextIcon from '../assets/icons/next.svg'
import { PlaylistIcon } from '../assets/icons/PlaylistIcon.jsx'
import { InfoIcon } from '../assets/icons/InfoIcon.JSX'
import { VolumeIcon } from '../assets/icons/VolumeIcon.jsx'
import { MuteIcon } from '../assets/icons/MuteIcon.jsx'
import { info } from "autoprefixer";
import { useNavigate } from "react-router-dom"




export const Player = () => {
    const { currentPlaylist, currentSongPos, setCurrentSongPos, setCurrentSongId, playState, setPlayState,
        songName, setSongName, songImg, setSongImg, infoButton, setInfoButton, playlistButton,
        songArtist, setSongArtist, setSongGenre, artists, setArtistImg, setArtistDesc, currentAlbumId, urlsArray,
        firstPostLoad, setFirstPostLoad, urlApi} = useGlobalVariables();
    const [audio, setAudio] = useState([null, false])
    const [preventPrevSong, setPreventPrevSong] = useState(false)
    const [preventNextSong, setPreventNextSong] = useState(false)
    const [currentMinute, setCurrentMinute] = useState(0)
    const [currentSecond, setCurrentSecond] = useState(0)
    const [durationMinutes, setDurationMinutes] = useState(0)
    const [durationSeconds, setDurationSeconds] = useState(0)
    const [timeSlicerValue, setTimeSlicerValue] = useState(0)
    const [volSlicerValue, setVolSlicerValue] = useState(100)
    const [passNoMuteVolSlicerValue, setpassNoMuteVolSlicerValue] = useState(100)
    const [muteButton, setMuteButton] = useState(false)
    const [refreshCurrentSongPos, setRefreshCurrentSongPos] = useState(false)
    const navigate = useNavigate();


    const audioUrl = (dataSong, play) => {

        // fetch('https://beat-bliss-api-django.onrender.com/api/songfiles/' + dataSong.mp3_file + '/')
        fetch(`${urlApi}/songfiles/${dataSong.mp3_file}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then((mp3Data) => {
                const binaryData = atob(mp3Data.binary_file);
                const blob = new Blob([new Uint8Array(binaryData.length).map((_, i) => binaryData.charCodeAt(i))], { type: 'audio/mpeg' });
                const newAudio = new Audio(URL.createObjectURL(blob));
                setAudio([newAudio, play]);
                console.log('songName', dataSong.songName)
                setSongName(dataSong.songName);
                setSongImg(dataSong.songImg);
                setSongArtist(dataSong.artistName);
                setSongGenre(dataSong.genre);
                setCurrentSongId(dataSong.id);

                const artist = artists.filter((artist) => artist.artistName === dataSong.artistName)[0]
                setArtistImg(artist.artistImg)
                setArtistDesc(artist.artistDesc)
            })

    }


    useEffect(() => {
        if (audio[0] === null) return;
        if (playState) {
            audio[0].volume = volSlicerValue/ 100;
            audio[0].play()
        }
        else {
            audio[0].pause()
        }
    }, [playState]);

    useEffect(() => {
        if (audio[0] === null) return;

        const handleTimeUpdate = () => {
            const currentTime = audio[0].currentTime;
            const duration = audio[0].duration;

            setTimeSlicerValue(currentTime / duration * 100)

            setCurrentMinute(Math.floor(currentTime / 60))
            setCurrentSecond(Math.floor(currentTime % 60))

            setDurationMinutes(Math.floor(duration / 60));
            setDurationSeconds(Math.floor(duration % 60));
        }

        const handleEnded = () => {
            setCurrentSongPos(currentSongPos + 1 > currentPlaylist.data.length - 1 ? currentPlaylist.data.length - 1 : currentSongPos + 1)
        }

        audio[0].addEventListener('timeupdate', () => {
            handleTimeUpdate()
        })

        audio[0].addEventListener('ended', () => {
            handleEnded()
        })

        if (audio[1] && firstPostLoad) setPlayState(true);

        return () => {
            audio[0].removeEventListener('timeupdate', () => {
                handleTimeUpdate()
            })
            audio[0].removeEventListener('ended', () => {
                handleEnded()
            })
        }
    }, [audio]);


    useEffect(() => {
        if (currentPlaylist.data.length === 0 || currentPlaylist.data === null) return;
        console.log('currentPlaylist.data', currentPlaylist.data)

        if (!firstPostLoad) {
            audioUrl(currentPlaylist.data[0], false);
        }
        else {
            if (currentSongPos === currentPlaylist.initialSongPos) {
                setRefreshCurrentSongPos(!refreshCurrentSongPos)
            } else {
                setCurrentSongPos(currentPlaylist.initialSongPos)
            }
        }
    }, [currentPlaylist]);


    useEffect(() => {
        if (currentPlaylist.data.length > 0) {
            console.log('currentSongPos', currentSongPos)
            setPlayState(false)
            if (currentSongPos === currentPlaylist.data.length - 1) {
                audioUrl(currentPlaylist.data[currentPlaylist.data.length - 1], true);
                if (preventPrevSong) setPreventPrevSong(false);
                setPreventNextSong(true)
            }
            else if (currentSongPos === 0) {
                audioUrl(currentPlaylist.data[0], true);
                if (preventNextSong) setPreventNextSong(false);
                setPreventPrevSong(true)
            }
            else {
                if (preventPrevSong) setPreventPrevSong(false);
                if (preventNextSong) setPreventNextSong(false);
                audioUrl(currentPlaylist.data[currentSongPos], true);
            }
        }
    }, [currentSongPos, refreshCurrentSongPos]);


    const handleReproduction = (e) => {
        if (e.target.id === "prev") {
            if(!firstPostLoad) setFirstPostLoad(true)
            setCurrentSongPos(currentSongPos - 1 < 0 ? 0 : currentSongPos - 1)
        }
        else if (e.target.id === "play") {
            if(!firstPostLoad) setFirstPostLoad(true)
            setPlayState(true)
        }
        else if (e.target.id === "pause") {
            setPlayState(false)
        }

        else if (e.target.id === "next") {
            if(!firstPostLoad) setFirstPostLoad(true)
            setCurrentSongPos(currentSongPos + 1 > currentPlaylist.data.length - 1 ? currentPlaylist.data.length - 1 : currentSongPos + 1)
        }
        else if (e.target.id === "timeSlider") {
            audio[0].currentTime = audio[0].duration * e.target.value / 100;
        }
        else if (e.target.id === "volSlicer") {
            audio[0].volume = e.target.value / 100;
            setVolSlicerValue(e.target.value)
            setpassNoMuteVolSlicerValue(e.target.value)
        }
        else if (e.target.id === "info") {
            setInfoButton(!infoButton)
        }
        else if (e.target.id === "playlist") {

            if (currentAlbumId !== '') {
                if (playlistButton) {
                    navigate(urlsArray[urlsArray.length - 2])
                } else {
                    navigate(`/playlist/${currentAlbumId}`);
                }
            }

        }
        else if (e.target.id === "volume") {
            if (muteButton) {
                audio[0].volume = 1;
                setMuteButton(false)
                setVolSlicerValue(passNoMuteVolSlicerValue)
            }
            else {
                audio[0].volume = 0;
                setMuteButton(true)
                setVolSlicerValue(0)
            }
        }
    }

    return (
        <div className="flex w-full h-full justify-between p-2 items-center bg-[#000000] rounded-lg">

            <div className="flex h-full items-center overflow-hidden gap-3 ">
                <img className="rounded-full animate-spin-slow " src={`${songImg}`} alt="songImg"
                    style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'fill',
                        animationPlayState: playState ? 'running' : 'paused',
                    }} />
                <div className="flex w-[10vw] overflow-hidden flex-col gap-1">
                    <div className="text-sm font-medium text-white text-start hidden sm:flex" style={{ textTransform: 'capitalize' }}>{songName}</div>
                    <div className="text-xs text-gray-500 text-start hidden sm:flex" style={{ textTransform: 'capitalize' }}>{songArtist}</div>
                </div>
            </div>


            <div className="flex flex-col justify-center items-center gap-3">
                <div className="flex items-center gap-7">
                    <div className={`bg-cover bg-no-repeat hover:opacity-60 cursor-pointer ${preventPrevSong ? 'pointer-events-none opacity-60' : ''}`} id="prev" onClick={handleReproduction}
                        style={{
                            width: '15px',
                            height: '15px',
                            backgroundImage: `url(${previousIcon})`
                        }} />

                    <div className="rounded-full bg-white cursor-pointer w-[30px] h-[30px]" id={`${playState ? 'pause' : 'play'}`} onClick={handleReproduction}
                        style={{
                            paddingLeft: `${playState ? '6px' : '9px'}`,
                            paddingRight: `${playState ? '6px' : '3px'}`,
                            paddingTop: `${playState ? '6px' : '8px'}`,
                            paddingBottom: `${playState ? '6px' : '8px'}`,
                        }}>

                        <div className="w-full h-full bg-contain bg-no-repeat pointer-events-none" style={{
                            backgroundImage: `url(${playState ? pauseIcon : playIcon})`,
                        }}>

                        </div>
                    </div>

                    <div className={`bg-cover bg-no-repeat hover:opacity-60 cursor-pointer ${preventNextSong ? 'pointer-events-none opacity-60' : ''}`} id="next" onClick={handleReproduction}
                        style={{
                            width: '15px',
                            height: '15px',
                            backgroundImage: `url(${nextIcon})`
                        }} />
                </div>
                <div className="flex items-center gap-2">
                    <div id="currentTime" className="text-gray-500 text-[10px] leading-[1px]">
                        {currentMinute}:{currentSecond < 10 ? `0${currentSecond}` : currentSecond}
                    </div>

                    <input type="range" id="timeSlider" min={0} max={100} step={1} value={timeSlicerValue} onChange={handleReproduction}
                        style={{
                            width: "30vw",
                            height: "3px",
                            backgroundSize: `${timeSlicerValue}% 100%`,
                        }} />


                    <div id="duration" className="text-gray-500 text-[10px] leading-[1px]">
                        {durationMinutes}:{durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds}
                    </div>
                </div>
            </div>

            <div className="flex h-full items-center">
                <div className={`cursor-pointer w-[13px] h-[13px] hover:opacity-60 ${infoButton ? 'text-[#1FDF64]' : 'text-white'}`} id="info" onClick={handleReproduction}>
                    <InfoIcon />
                </div>
                <div className={`w-[18px] h-[18px] hover:opacity-60 ml-3 ${playlistButton ? 'text-[#1FDF64]' : 'text-white'} ${currentAlbumId === '' ? 'opacity-40 pointer-events-none' : 'opacity-100 cursor-pointer'}`} id="playlist" onClick={handleReproduction}>
                    <PlaylistIcon />
                </div>
                <div className="flex items-center ml-2">
                    <div className={`cursor-pointer w-[20px] h-[20px] text-white hover:text-[#1FDF64]`} id="volume" onClick={handleReproduction}>
                        {
                            muteButton ? <MuteIcon /> : <VolumeIcon />
                        }
                    </div>

                    <div className="w-[15vw] sm:w-[85px]">
                        <input type="range" id="volSlicer" min={0} max={100} step={1} value={volSlicerValue} onChange={handleReproduction}
                            style={{
                                width: "100%",
                                height: "3px",
                                backgroundSize: `${volSlicerValue}% 100%`,
                            }} />
                    </div>
                </div>
            </div>

        </div>
    )
}
