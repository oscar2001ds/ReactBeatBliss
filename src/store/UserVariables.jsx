import { useEffect } from "react"
import { useGlobalVariables } from "./GlobalVariables"


export const UserVariables = () => {
    const { albums, setUserName, setUserPlayLists, setUserId, succesLogin } = useGlobalVariables()

    useEffect(() => {
        if ((albums.length > 0 || succesLogin) && localStorage.getItem('userPlayLists') && localStorage.getItem('userName') ) {
            
            setUserName(localStorage.getItem('userName'))
            setUserId(localStorage.getItem('userId'))

            let albumsIds = JSON.parse(localStorage.getItem('userPlayLists'))
            albumsIds = albumsIds.map((album) => { return `album${album}` })
            const userPlayLists = albums.filter((album) => albumsIds.includes(album.id))
            console.log('userPlayLists', userPlayLists)
            setUserPlayLists(userPlayLists)
        }

    }, [succesLogin,albums]);

    return (
        <></>
    )
}
