import { useEffect, useState } from "react"
import { useGlobalVariables } from "../store/GlobalVariables"
import { useParams } from "react-router-dom"
import playIcon from '../assets/icons/play.svg'
import pauseIcon from '../assets/icons/pause.svg'
import { SongPlaying } from "../components/SongPlaying"
import { Navbar } from "../components/Navbar"
import { Heart } from "../assets/icons/Hearth"


export const PlayList = () => {
    const { posts, albums, currentAlbumId, playState, setPlayState,
        setCurrentAlbumId, setCurrentPlaylist, currentSongId, setCurrentSongId,
        setCurrentSongPos, firstPostLoad, setFirstPostLoad, userPlayLists, setUserPlayLists, userId, urlApi } = useGlobalVariables()
    const [currentAlbumName, setCurrentAlbumName] = useState('')
    const [currentAlbumImg, setCurrentAlbumImg] = useState('')
    const [currentAlbumDesc, setCurrentAlbumDesc] = useState('')
    const { albumIdParam } = useParams()
    const [albumSongs, setAlbumSongs] = useState([])
    const [hoverSongId, setHoverSongId] = useState('')
    const [isFav, setIsFav] = useState(false)
    const [currentPlaylistColors, setCurrentPlaylistColors] = useState({ color1: '#7e5751', color2: '#121212', color3: '#121212' })
    const [playListColorRefresh, setPlayListColorRefresh] = useState(false)


    const getPredominantsColors = () => {
        const albumImageContainer = document.getElementById('albumImageId')
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = albumImageContainer.offsetWidth;
        canvas.height = albumImageContainer.offsetHeight;

        context.drawImage(albumImageContainer, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const colorCounts = {};

        const opacity = 0.6;
        const umbral = 150;
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            let rgba = ''
            if (red >= umbral || green >= umbral || blue >= umbral) {
                rgba = `rgba(${Math.floor(data[i] * opacity)}, ${Math.floor(data[i + 1] * opacity)}, ${Math.floor(data[i + 2] * opacity)}, ${data[i + 3] / 255})`;
            }
            else {
                rgba = `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${data[i + 3] / 255})`;
            }
            colorCounts[rgba] = (colorCounts[rgba] || 0) + 1;
        }

        let prediminatsColors = { color1: '', color2: '', color3: '' }
        let maxCount = 0;

        for (const key in colorCounts) {
            if (colorCounts[key] > maxCount) {
                maxCount = colorCounts[key]
                prediminatsColors.color3 = prediminatsColors.color2
                prediminatsColors.color2 = prediminatsColors.color1
                prediminatsColors.color1 = key
            }
        }
        return prediminatsColors;
    };

    useEffect(() => {

        if (playListColorRefresh === false) return
        const predominantsColors = getPredominantsColors()
        setCurrentPlaylistColors(predominantsColors)
        // console.log('predominantsColors', predominantsColors)
        setPlayListColorRefresh(false)

    }, [playListColorRefresh]);

    useEffect(() => {
        if (albumIdParam === '' || albums.length===0) return
        const currentAlbum = albums.filter((album) => albumIdParam === album.id)[0]
        setCurrentAlbumName(currentAlbum.albumName)
        setCurrentAlbumDesc(currentAlbum.albumDesc)
        setCurrentAlbumImg(currentAlbum.albumImg)
        const currentAlbumSongs = posts.filter((post) => currentAlbum.songs.includes(post.id))
        setAlbumSongs(currentAlbumSongs)
        setPlayListColorRefresh(true)

        const isInUserLibrary = userPlayLists.find((album) => album.id === albumIdParam)
        if (isInUserLibrary) setIsFav(true)
        else setIsFav(false)

    }, [albumIdParam, albums]);

    const handlePlay = (e) => {
        e.stopPropagation()
        if (!firstPostLoad) setFirstPostLoad(true)
        if (currentAlbumId === albumIdParam) {
            if (currentSongId === e.target.id || e.target.id === 'globalPlayStop') {
                if (playState) {
                    setPlayState(false)
                }
                else {
                    setPlayState(true)
                }
            }
            else {
                const currentSongPosition = albumSongs.findIndex((post) => post.id === e.target.id)
                setCurrentSongPos(currentSongPosition)
                setCurrentSongId(e.target.id)
            }
        }
        else {
            const album = albums.filter((album) => albumIdParam === album.id)[0]
            const idSongs = album.songs
            const newPlaylist = posts.filter((post) => idSongs.includes(post.id))
            setPlayState(false)
            setCurrentAlbumId(albumIdParam)
            setTimeout(() => {
                setCurrentPlaylist({ data: newPlaylist, initialSongPos: 0 })
            }, 200);
        }
    }

    const postNewUserPlaylist = async(newPlaylist) => {    

        let newPlayListIDS = newPlaylist.map((album) => album.id.slice(5,))
        const data = {
            "playlists": [
                ...newPlayListIDS
            ]
        }

        console.log('data',data)
            
        const response = await fetch(`${urlApi}/users/${userId}/`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const json = await response.json()
        console.log('json',json)

    }

    const handleFav = (e) => {
        e.stopPropagation()
        if (isFav) {
            let newIdArrayFilter = userPlayLists.filter((album) => album.id !== albumIdParam)
            let newIdArray = newIdArrayFilter.map((album) => album.id.slice(5,))
            newIdArray = JSON.stringify(newIdArray)
            localStorage.setItem('userPlayLists', newIdArray)
            setIsFav(false)
            setUserPlayLists(newIdArrayFilter)
            postNewUserPlaylist(newIdArrayFilter)

        }
        else {
            let newIdArray = userPlayLists.map((album) => album.id.slice(5,))
            newIdArray.push(albumIdParam.slice(5,))
            newIdArray = JSON.stringify(newIdArray)
            localStorage.setItem('userPlayLists', newIdArray)
            setIsFav(true)

            const newAlbum = albums.find((album) => albumIdParam === album.id)
            const newUserPlaylist = [...userPlayLists, newAlbum]
            setUserPlayLists(newUserPlaylist)
            postNewUserPlaylist(newUserPlaylist)
        }
    }

    const handleHoverRow = (e) => {

        if (e.type === 'mouseenter') {
            setHoverSongId(e.target.id.slice(3,))
        }
        else if (e.type === 'mouseleave') {
            setHoverSongId('')
        }
    }

    return (
        <div id="playListPage" className={`discover-scroll flex flex-col flex-grow rounded-lg overflow-x-hidden overflow-y-auto`}
            style={{
                background: 'linear-gradient(to bottom, ' + currentPlaylistColors.color3 + ', ' + currentPlaylistColors.color2 + ', ' + currentPlaylistColors.color1 + ')'
            }}>
            <Navbar />
            <div className="flex justify-start gap-8 px-6 pb-6">
                <img id="albumImageId" src={`${currentAlbumImg}`} className="w-[200px] h-[200px] bg-cover bg-no-repeat bg-center shadow-black shadow-2xl"
                />
                <div className="flex flex-col flex-grow justify-center items-start ">
                    <p className="xs:text-xs sm:text-sm font-bold">Playlist</p>
                    <strong className="sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl" style={{ textTransform: 'capitalize' }}>{currentAlbumName}</strong>
                    <p className="xs:text-xs sm:text-sm xs:mt-2 md:mt-6 opacity-50" style={{ textTransform: 'capitalize' }}>{currentAlbumDesc}</p>
                </div>
            </div>


            <div className="p-6 flex flex-col flex-grow bg-[#121212] bg-opacity-10">
                <div className="flex">
                    <div id="globalPlayStop" className={`rounded-full w-[50px] h-[50px] bg-[rgb(1,190,70)] hover:bg-[#1FDF64]  hover:scale-110`} onClick={handlePlay}
                        style={{
                            paddingLeft: `${playState ? '16px' : '18px'}`,
                            paddingRight: `${playState ? '8px' : '6px'}`,
                            paddingTop: `${playState ? '16px' : '16px'}`,
                            paddingBottom: `${playState ? '16px' : '16px'}`,
                        }}>

                        <div className="w-full h-full bg-contain bg-no-repeat pointer-events-none" style={{
                            backgroundImage: `url(${playState && currentAlbumId === albumIdParam ? pauseIcon : playIcon})`,
                        }}>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className={`ml-6 w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:scale-110 ${isFav ? 'text-[#1FDF64]' : 'text-white'}`} onClick={handleFav}>
                            <Heart />
                        </div>
                    </div>
                </div>


                <div className="mt-5 flex flex-col gap-3">
                    <div className="flex columns-5 items-center p-1">
                        <div className="lg:w-[10%] xs:w-[30%] flex justify-start pl-5 text-md font-bold">
                            #
                        </div>

                        <div className="flex items-center justify-start text-xs font-bold md:w-[19.5%] xs:flex-grow">
                            Song
                        </div>

                        <div className="hidden lg:flex w-[20%] text-xs font-bold justify-center">
                            Genre
                        </div>

                        <div className="hidden xl:flex w-[20%] text-xs font-bold justify-center">
                            Date Added
                        </div>

                        <div className="hidden md:flex flex-grow text-xs font-bold justify-center">
                            Year
                        </div>
                    </div>
                    {
                        albumSongs.map((song, index) => {
                            return (
                                <div key={index} id={`row${song.id}`} className="flex columns-5 items-center hover:bg-[#484848] p-1" onMouseEnter={handleHoverRow} onMouseLeave={handleHoverRow}>

                                    <div className="lg:w-[10%] xs:w-[30%] flex justify-start">
                                        {hoverSongId === song.id ?

                                            <div id={`${song.id}`} className="text-white ml-5 w-[15px] h-[15px] cursor-pointer" onClick={handlePlay}>
                                                <div className="w-full h-full bg-contain bg-no-repeat pointer-events-none" style={{
                                                    backgroundImage: `url(${playState && currentSongId === song.id ? pauseIcon : playIcon})`,
                                                }}>
                                                </div>
                                            </div>
                                            :
                                            playState && currentSongId === song.id ?
                                                <div className="pl-5">
                                                    <SongPlaying />
                                                </div>
                                                :
                                                <div className="pl-5" >
                                                    {index + 1}
                                                </div>
                                        }
                                    </div>

                                    <div className="flex items-center justify-start gap-6 md:w-[20%] xs:flex-grow">
                                        <div className="w-[50px] h-[50px] bg-cover bg-no-repeat bg-center rounded-lg"
                                            style={{
                                                backgroundImage: `url(${song.songImg})`,
                                            }} />
                                        <div className="flex flex-col pointer-events-none">
                                            <strong className={`text-sm font-bold ${playState && currentSongId === song.id ? 'text-[#1FDF64]' : 'text-white'}`} style={{ textTransform: 'capitalize' }}>{song.songName}</strong>
                                            <p className="text-xs opacity-50" style={{ textTransform: 'capitalize' }}>{song.artistName}</p>
                                        </div>
                                    </div>

                                    <div className="hidden lg:flex w-[20%] text-xs justify-center pointer-events-none" style={{ textTransform: 'capitalize' }}>
                                        {song.genre}
                                    </div>

                                    <div className="hidden xl:flex w-[20%] text-xs justify-center pointer-events-none">
                                        {song.updated_at}
                                    </div>

                                    <div className="hidden md:flex text-xs flex-grow gap-6 justify-center pointer-events-none">
                                        {song.year}
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </div>
    )
}
