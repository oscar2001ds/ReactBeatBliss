
import React, { useEffect } from 'react'
import { useGlobalVariables } from './GlobalVariables';

export const ApiConection = () => {

    const { posts, setCurrentPlaylist, setAlbumRecently, setAlbumMood,
        setAlbumDiscover, setPosts, setError, setAlbums, albums, artists, setArtists, genres, setGenres } = useGlobalVariables();

    const convevertToImg = (data) => {
        const binaryData = atob(data);
        const blob = new Blob([new Uint8Array(binaryData.length).map((_, i) => binaryData.charCodeAt(i))], { type: 'image/jpg' });
        const newImg = new Image();
        newImg.src = URL.createObjectURL(blob);
        return newImg.src;
    }

    // Load Generos
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/genres/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud generos');
                }
                return response.json();
            })
            .then((data) => {
                data.map((genre) => {
                    genre.id = "genre" + genre.id;
                })
                setGenres(data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    // Load Artistas despues de cargar generos
    useEffect(() => {
        if (genres.length === 0) return
        console.log('genres', genres)
        fetch('http://127.0.0.1:8000/api/artists/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud artistas');
                }
                return response.json();
            })
            .then((data) => {
                data.map((artist) => {
                    artist.id = "artist" + artist.id;
                    artist.artistImg = convevertToImg(artist.artistImg);
                })
                setArtists(data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, [genres]);

    // Load Posts despues de cargar artistas
    useEffect(() => {
        if (artists.length === 0) return
        console.log('artists', artists)
        // fetch('https://beat-bliss-api-django.onrender.com/api/posts/')
        fetch('http://127.0.0.1:8000/api/posts/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud posts');
                }
                return response.json();
            })
            .then((data) => {

                data.map((song) => {
                    song.id = "post" + song.id;
                    song.artistName = artists.filter((artist) => artist.id === "artist"+song.artistName)[0].artistName;
                    song.songImg = convevertToImg(song.songImg);
                    song.genre = genres.find((genre) => genre.id === "genre"+song.genre).genreName;
                    song.updated_at = song.updated_at.slice(0, 10);
                })
                setPosts(data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, [artists]);

    // Load Albums
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/albums/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud albums');
                }
                return response.json();
            })
            .then((data) => {
                data.map((album) => {
                    album.id = "album" + album.id;
                    album.songs = album.songs.map((song) => "post" + song);
                    album.albumImg = convevertToImg(album.albumImg);
                })
                setAlbums(data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);


    // Crear las listas de reproduccion y los albumes de la pagina de inicio
    useEffect(() => {
        if (posts.length === 0) return
        console.log('posts', posts)
        let nPosts = posts.slice(0, 5);
        setAlbumRecently(nPosts)
        setCurrentPlaylist({data:nPosts,initialSongPos:0})
    }, [posts]);

    useEffect(() => {
        if (albums.length === 0) return
        console.log('albums', albums)
        let nAlbums = albums.slice(0, 7);
        setAlbumDiscover(nAlbums)
        nAlbums = albums.slice(8, 15);
        setAlbumMood(nAlbums)
    }, [albums]);


    return (
        <>
        </>
    )
}


