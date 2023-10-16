import { useEffect, useRef, useState } from 'react'
import { HomeIcon } from '../assets/icons/HomeIcon.jsx'
import { SearchIcon } from '../assets/icons/Searchicon.jsx'
import { useGlobalVariables } from '../store/GlobalVariables.jsx'
import { Link } from 'react-router-dom'
import library from '../assets/icons/library.svg'
import { Trash } from '../assets/icons/Trash.jsx'


export const LeftSide = () => {

  const { homeButton, searchButton, libraryButton, setLibraryButton, currentAlbumId, userPlayLists, userName,
    setUserPlayLists, userId } = useGlobalVariables()

  const handleClick = (e) => {
    if (e.target.id === 'libraryButton') {
      setLibraryButton(!libraryButton)
    }

  }

  const postNewUserPlaylist = async (newPlaylist) => {

    let newPlayListIDS = newPlaylist.map((album) => album.id.slice(5,))
    const data = {
      "playlists": [
        ...newPlayListIDS
      ]
    }

    console.log('data', data)

    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const json = await response.json()
    console.log('json', json)

  }

  const handleTrash = (e) => {
    const albumIdSelected = e.target.id.slice(5,)
    let newIdArrayFilter = userPlayLists.filter((album) => album.id !== albumIdSelected)

    let newIdArray = newIdArrayFilter.map((album) => album.id.slice(5,))
    newIdArray = JSON.stringify(newIdArray)
    localStorage.setItem('userPlayLists', newIdArray)

    setUserPlayLists(newIdArrayFilter)
    postNewUserPlaylist(newIdArrayFilter)
  }

  return (
    <div className={`h-full max-w-[20vw] bg-dark flex flex-col gap-2 ${libraryButton ? '' : 'w-[20vw]'}`}>
      <div className="w-full h-[110px] bg-[#121212] rounded-lg flex flex-col p-4 gap-4">
        <div className={`flex ${libraryButton ? 'justify-center' : 'justify-center sm:justify-start'}`}>
          <Link to='/'>
            <div id='homeButton' className={`flex gap-3 items-center text-white cursor-pointer
              ${homeButton ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} onClick={handleClick}>
              <div className='w-[20px] h-[20px] pointer-events-none'>
                <HomeIcon />
              </div>
              <strong className={`pointer-events-none ${libraryButton ? 'hidden' : 'hidden sm:flex'}`}>Home</strong>
            </div>
          </Link>
        </div>
        <div className={`flex ${libraryButton ? 'justify-center' : 'justify-center sm:justify-start'}`}>
          <Link to='/search'>
            <div id='searchButton' className={`flex gap-3 items-center cursor-pointer
              ${searchButton ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} onClick={handleClick}>
              <div className={`w-[20px] h-[20px] pointer-events-none ${searchButton ? 'text-white' : 'text-transparent'}`}>
                <SearchIcon />
              </div>
              <strong className={`pointer-events-none ${libraryButton ? 'hidden' : 'hidden sm:flex'}`}>Search</strong>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full bg-[#121212] rounded-lg flex flex-col flex-grow p-4 gap-3">
        <div className={`flex ${libraryButton ? 'justify-center' : 'justify-center sm:justify-start'}`}>
          <div id='libraryButton' className='flex gap-3 items-center text-white cursor-pointer opacity-60 hover:opacity-100' onClick={handleClick}>
            <div className='w-[23px] h-[23px] pointer-events-none'>
              <img src={library} alt="" className='w-full h-full' />
            </div>
            <strong className={`pointer-events-none ${libraryButton ? 'hidden' : 'hidden sm:flex'}`}>Your Library</strong>
          </div>
        </div>
        {
          userPlayLists.length > 0 || userName !== ''
            ?
            userName !== '' && userPlayLists.length === 0 ?
              <div className='hidden sm:flex bg-[#242424] p-5 rounded-lg'>
                <strong className='text-sm'>
                  Add your favorite albums...
                </strong>
              </div>
              :
              userPlayLists.map((album) => {
                return (
                  <div key={album.id} className='flex items-center justify-center sm:justify-start'>
                    <Link to={`/playlist/${album.id}`}>
                      <div className='flex items-center text-white cursor-pointer opacity-60 hover:opacity-100'>
                        <div className='w-[50px] h-[50px] pointer-events-none rounded-lg'>
                          <img src={album.albumImg} alt="" className='w-full h-full rounded-lg' style={{ objectFit: 'fill' }} />
                        </div>
                        <div className='flex flex-col'>
                          <strong className={`text-sm pointer-events-none ml-3 ${currentAlbumId === album.id ? 'text-[#1FDF64]' : 'text-white'} 
                      ${libraryButton ? 'hidden' : 'hidden sm:flex'}`} style={{ textTransform: 'capitalize' }}>
                            {album.albumName}
                          </strong>
                          <p className={`text-xs text-[#979ca0] ml-3 ${libraryButton ? 'hidden' : 'hidden sm:flex'}`}>Playlist 🔘 BeatBliss</p>
                        </div>

                      </div>
                    </Link>
                    <div id={`trash${album.id}`} className='w-[20px] h-[20px] flex ml-auto cursor-pointer hover:scale-110 items-center justify-center text-[#979ca0] opacity-70 hover:text-[#1FDF64]' onClick={handleTrash}>
                      <Trash />
                    </div>
                  </div>
                )
              })

            :
            <div className='flex bg-[#242424] flex-col p-5 rounded-lg'>
              <strong>
                Login to see your playlists
              </strong>
              <Link to='/login'>
                <div className='flex justify-center items-center w-[100px] h-[30px] bg-white  rounded-full text-black font-bold text-sm mt-2 cursor-pointer hover:scale-105 hover:bg-[#1FDF64]'>
                  Log in
                </div>
              </Link>
            </div>

        }
      </div>
    </div>
  )
}
