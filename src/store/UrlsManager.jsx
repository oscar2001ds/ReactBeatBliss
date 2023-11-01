import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useGlobalVariables } from "./GlobalVariables"


export const UrlsManager = () => {
    const location = useLocation()
    const { urlsArray, setUrlsArray, setHomeButton, setSearchButton, setPlaylistButton, 
        setCurrentUrl, currentUrl, setFirstPostLoad, setNextPageExists, setPrevPageExists } = useGlobalVariables()
    const navigate = useNavigate()

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
        else if (cUrl.includes('/search')) {
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

    useEffect(() => {
        const isPrevPage = window.history.state.idx > 0;
        const isNextPage = window.history.state.idx < (window.history.length - 1);
        if (isNextPage) {
            setNextPageExists(true)
        }
        else {
            setNextPageExists(false)
        }
        if (isPrevPage) {
            setPrevPageExists(true)
        }
        else {
            setPrevPageExists(false)
        }
    }, [currentUrl]);

    // useEffect(() => {
    //     const  handleBeforeUnload = (event) => {
    //         navigate('/')
    //       }
    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     }
    // }, []);


    return (
        <></>
    )
}
