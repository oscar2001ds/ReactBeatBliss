import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useGlobalVariables } from "./GlobalVariables"


export const UrlsManager = () => {
    const location = useLocation()
    const { urlsArray, setUrlsArray, setHomeButton, setSearchButton, setPlaylistButton, setCurrentUrl, setPlayState, setFirstPostLoad } = useGlobalVariables()


    useEffect(() => {
        if (urlsArray.length === 0) return
        if (urlsArray[urlsArray.length - 1] === location.pathname) return
        if (urlsArray.length >= 5) {
            setUrlsArray([...urlsArray.slice(1, 5), location.pathname])
        }
        else {
            setUrlsArray([...urlsArray, location.pathname])
        }
    }, [location]);

    useEffect(() => {
        const cUrl = urlsArray[urlsArray.length - 1]
        setCurrentUrl(cUrl)
        if (cUrl === '/') {
            setHomeButton(true)
            setSearchButton(false)
            setPlaylistButton(false)
        }
        else if (cUrl === '/search/') {
            setHomeButton(false)
            setSearchButton(true)
            setPlaylistButton(false)
        }
        else if (cUrl.includes('/playlist/')) {
            setHomeButton(false)
            setSearchButton(false)
            setPlaylistButton(true)
        }
        else if (cUrl.includes('/login')) {
            setFirstPostLoad(false)
        }
        else {
            setHomeButton(false)
            setSearchButton(false)
            setPlaylistButton(false)
        }

    }, [urlsArray]);

    return (
        <></>
    )
}
