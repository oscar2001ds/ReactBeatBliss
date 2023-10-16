import { create } from "zustand";


export const useGlobalVariables = create((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),

    currentPlaylist: {data:[],initialSongPos:0},
    setCurrentPlaylist: (currentPlaylist) => set({ currentPlaylist }),

    albums: [],
    setAlbums: (albums) => set({ albums }),

    artists: [],
    setArtists: (artists) => set({ artists }),

    genres: [],
    setGenres: (genres) => set({ genres }),

    albumRecently: [],
    setAlbumRecently: (albumRecently) => set({ albumRecently }),

    albumDiscover: [],
    setAlbumDiscover: (albumDiscover) => set({ albumDiscover }),

    albumMood: [],
    setAlbumMood: (albumMood) => set({ albumMood }),

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

    songImg: '',
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

    
    succesLogin : null,
    setSuccesLogin : (succesLogin) => set({succesLogin}),

    userId : null,
    setUserId : (userId) => set({userId}),

    userName: '',
    setUserName: (userName) => set({ userName }),
    
    userPlayLists: [],
    setUserPlayLists: (userPlayLists) => set({ userPlayLists }),

}));