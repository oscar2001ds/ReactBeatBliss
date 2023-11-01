import { create } from "zustand";
import loading from '../assets/img/loading.gif'

export const useGlobalVariables = create((set) => ({
    urlApi: 'https://beat-bliss-api-django.onrender.com/api',
    //urlApi: 'http://127.0.0.1:8000/api',

    posts: [
        { id: 'loadingPost1', songName: '', songImg: loading, artistName: '', genre: '', year: '', created_at: '', updated_at: '' },
        { id: 'loadingPost2', songName: '', songImg: loading, artistName: '', genre: '', year: '', created_at: '', updated_at: '' },
        { id: 'loadingPost3', songName: '', songImg: loading, artistName: '', genre: '', year: '', created_at: '', updated_at: '' },
        { id: 'loadingPost4', songName: '', songImg: loading, artistName: '', genre: '', year: '', created_at: '', updated_at: '' },
        { id: 'loadingPost5', songName: '', songImg: loading, artistName: '', genre: '', year: '', created_at: '', updated_at: '' },
        { id: 'loadingPost6', songName: '', songImg: loading, artistName: '', genre: '', year: '', created_at: '', updated_at: '' },
    ],
    setPosts: (posts) => set({ posts }),

    currentPlaylist: { data: [], initialSongPos: 0 },
    setCurrentPlaylist: (currentPlaylist) => set({ currentPlaylist }),

    albums: Array(15).fill(0).map((object, i) => {
        return { id: `loadingAlbum${i + 1}`, albumName: '', albumImg: loading, albumDesc: '', songs: Array(0) }
    }),
    setAlbums: (albums) => set({ albums }),

    originalAlbumsLength: 0,
    setOriginalAlbumsLength: (originalAlbumsLength) => set({ originalAlbumsLength }),

    artists: [

    ],
    setArtists: (artists) => set({ artists }),

    genres: [],
    setGenres: (genres) => set({ genres }),

    albumRecently: [],
    setAlbumRecently: (albumRecently) => set({ albumRecently }),

    albumDiscover: [],
    setAlbumDiscover: (albumDiscover) => set({ albumDiscover }),

    albumMood: [],
    setAlbumMood: (albumMood) => set({ albumMood }),

    albumSearch : [],
    setAlbumSearch : (albumSearch) => set({albumSearch}),

    searchValue: '',
    setSearchValue: (searchValue) => set({ searchValue }),

    error: null,
    setError: (error) => set({ error }),

    firstPostLoad: false,
    setFirstPostLoad: (firstPostLoad) => set({ firstPostLoad }),

    currentSongPos: 0,
    setCurrentSongPos: (currentSongPos) => set({ currentSongPos }),

    currentSongId: '',
    setCurrentSongId: (currentSongId) => set({ currentSongId }),

    currentAlbumId: '',
    setCurrentAlbumId: (currentAlbumId) => set({ currentAlbumId }),

    playState: false,
    setPlayState: (playState) => set({ playState }),

    songName: '',
    setSongName: (songName) => set({ songName }),

    songImg: loading,
    setSongImg: (songImg) => set({ songImg }),

    songArtist: '',
    setSongArtist: (songArtist) => set({ songArtist }),

    songGenre: '',
    setSongGenre: (songGenre) => set({ songGenre }),

    artistImg: '',
    setArtistImg: (artistImg) => set({ artistImg }),

    artistDesc: '',
    setArtistDesc: (artistDesc) => set({ artistDesc }),

    homeButton: true,
    setHomeButton: (homeButton) => set({ homeButton }),

    searchButton: false,
    setSearchButton: (searchButton) => set({ searchButton }),

    libraryButton: false,
    setLibraryButton: (libraryButton) => set({ libraryButton }),

    infoButton: true,
    setInfoButton: (infoButton) => set({ infoButton }),

    playlistButton: false,
    setPlaylistButton: (playlistButton) => set({ playlistButton }),

    currentUrl: '/',
    setCurrentUrl: (currentUrl) => set({ currentUrl }),

    urlsArray: ['/'],
    setUrlsArray: (urlsArray) => set({ urlsArray }),

    succesLogin: null,
    setSuccesLogin: (succesLogin) => set({ succesLogin }),

    userId: null,
    setUserId: (userId) => set({ userId }),

    userName: '',
    setUserName: (userName) => set({ userName }),

    userPlayLists: [],
    setUserPlayLists: (userPlayLists) => set({ userPlayLists }),

    nextPageExists: false,
    setNextPageExists: (nextPageExists) => set({ nextPageExists }),

    prevPageExists: false,
    setPrevPageExists: (prevPageExists) => set({ prevPageExists }),

}));