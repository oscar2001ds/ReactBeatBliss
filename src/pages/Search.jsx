import { useEffect, useRef, useState } from "react"
import { Navbar } from "../components/Navbar"
import { useGlobalVariables } from "../store/GlobalVariables"
import { useNavigate } from "react-router-dom"
import { AlbumsContainers } from "../components/AlbumsContainers"


export const Search = () => {

  const { genres, libraryButton, infoButton, searchValue, posts, albumSearch, setAlbumSearch } = useGlobalVariables()
  const bgArrayColors = useRef(['bg-[#006450]', 'bg-[#7358FF]', 'bg-[#1E3264]', 'bg-[#E8115B]', 'bg-[#E1118C]', 'bg-[#8C1932]', 'bg-[#148A08]', 'bg-[#503750]', 'bg-[#8D67AB]', 'bg-[#B06239]', 'bg-[#509BF5]', 'bg-[#8D67AB]', 'bg-[#D84000]', 'bg-[#E1118C]', 'bg-[#E91429]', 'bg-[#777777]', 'bg-[#438270]', 'bg-[#BA5D07]'])
  const navigate = useNavigate()

  const handleClick = (e) => {
    const albumName = 'album' + e.currentTarget.id;
    navigate(`/playlist/${albumName}`);
  }
  
  useEffect(() => {
    let modifiedSearchValue = searchValue
    if (modifiedSearchValue === ''){
      modifiedSearchValue = '<empty>'
    }
    const searchValueLowerCase = modifiedSearchValue.toLowerCase()
    const albumSearch = posts.filter((post) => {
      return post.songName.toLowerCase().includes(searchValueLowerCase)
    })

    setAlbumSearch(albumSearch)
  }, [searchValue]);


  return (
    <div id="searchPage" className={`discover-scroll flex flex-col flex-grow bg-gradient-to-b from-[#212121] via-[#121212] to-[#121212] rounded-lg  overflow-x-hidden overflow-y-auto`}>
      <Navbar />

      <div className={` flex-col rounded-lg px-8 pb-2 gap-8 mt-5 text-2xl ${albumSearch.length>0?'flex':'hidden'}`}>
        {/* Searched Songs */}
        <AlbumsContainers title={"Search: "+`${searchValue}`} list={albumSearch} typeCard={'songs'}
          gradientColors='bg-gradient-to-br from-[#181818] via-[#000000] to-[#31084f]' />
      </div>

      <div className='flex px-8 pt-4'>
        <strong className='text-white text-2xl font-bold'>Genres</strong>
      </div>
      <div className={`grid p-4 ${infoButton && !libraryButton ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}  `}>
        {
          genres.map((genre, index) => {
            return (
              <div key={genre.id} className='flex p-4 justify-center'>
                <div id={genre.id} className={`flex flex-col rounded-lg ${bgArrayColors.current[index]} w-[175px] h-[175px] overflow-hidden hover:scale-110 cursor-pointer`} onClick={handleClick}>
                  <strong className='text-white text-lg font-bold m-2 pointer-events-none' style={{ textTransform: 'capitalize' }}>{genre.genreName}</strong>
                  <div className='flex relative rotate-[25deg] pointer-events-none'>
                    <img src={genre.genreImg} alt="" className='absolute top-3 -right-12 w-[100px] h-[100px] pointer-events-none' style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}
