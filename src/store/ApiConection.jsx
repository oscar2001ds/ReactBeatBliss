
import React, { useEffect, useState } from 'react'
import { useGlobalVariables } from './GlobalVariables';
import { Loading } from '../pages/Loading';

export const ApiConection = () => {

    const { posts, setCurrentPlaylist, setAlbumRecently, setAlbumMood,
        setAlbumDiscover, setPosts, setError, setAlbums, albums, artists,
        setArtists, genres, setGenres, urlApi, setOriginalAlbumsLength } = useGlobalVariables();

    const convevertToImg = (data) => {
        const binaryData = atob(data);
        const blob = new Blob([new Uint8Array(binaryData.length).map((_, i) => binaryData.charCodeAt(i))], { type: 'image/jpg' });
        const newImg = new Image();
        newImg.src = URL.createObjectURL(blob);
        return newImg.src;
    }

    const [apiLoaded, setApiLoaded] = useState(false)
    const [arraysModified, setArraysModified] = useState(false)
    const [genresLoaded, setGenresLoaded] = useState([])
    const [albumsLoaded, setAlbumsLoaded] = useState([])
    const [artistsLoaded, setArtistsLoaded] = useState([])
    const [postsLoaded, setPostsLoaded] = useState([])
    // Load Generos
    useEffect(() => {
        fetch(`${urlApi}/genres/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud generos');
                }
                return response.json();
            })
            .then((data) => {
                setGenresLoaded(data)
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    // Load Artistas
    useEffect(() => {
        fetch(`${urlApi}/artists/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud artistas');
                }
                return response.json();
            })
            .then((data) => {
                setArtistsLoaded(data)
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    // Load Posts
    useEffect(() => {
        fetch(`${urlApi}/posts/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud posts');
                }
                return response.json();
            })
            .then((data) => {
                setPostsLoaded(data)
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    // Load Albums
    useEffect(() => {
        fetch(`${urlApi}/albums/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud albums');
                }
                return response.json();
            })
            .then((data) => {
                setAlbumsLoaded(data)
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    // Modificaciones de los arreglos

    useEffect(() => {
        if (genresLoaded.length > 0 && artistsLoaded.length > 0 && postsLoaded.length > 0 && albumsLoaded.length > 0) setApiLoaded(true);
    }, [genresLoaded, artistsLoaded, postsLoaded, albumsLoaded]);


    useEffect(() => {
        if (!apiLoaded) return;
        // Modifica Artistas
        artistsLoaded.map((artist) => {
            artist.id = "artist" + artist.id;
            artist.artistImg = convevertToImg(artist.artistImg);
        })

        // Modifica Posts
        postsLoaded.map((song) => {
            song.id = "post" + song.id;
            song.artistName = artistsLoaded.filter((artist) => artist.id === "artist" + song.artistName)[0].artistName;
            song.songImg = convevertToImg(song.songImg);
            song.genre = genresLoaded.find((genre) => genre.id === song.genre).genreName;
            song.updated_at = song.updated_at.slice(0, 10);
        })

        // Modifica Generos
        genresLoaded.map((genre) => {
            genre.id = "genre" + genre.id;
            genre.genreImg = postsLoaded.find((song) => song.genre === genre.genreName).songImg;
        })

        // Modifica albums
        albumsLoaded.map((album) => {
            album.id = "album" + album.id;
            album.songs = album.songs.map((song) => "post" + song);
            album.albumImg = convevertToImg(album.albumImg);
        })
        setOriginalAlbumsLength(albumsLoaded.length);
        const genreAlbums = genresLoaded.map((genre) => {

            const albumName = genre.genreName;
            const albumDesc = "Album de " + genre.genreName;
            const albumImg = genre.genreImg;
            const songs = postsLoaded.filter((song) => song.genre === genre.genreName).map((song) => song.id);
            const album = {
                id: "album" + genre.id,
                albumName,
                albumDesc,
                albumImg,
                songs,
            }

            return album;
        })
        const newData = [...albumsLoaded, ...genreAlbums]

        // Listas de reproducción actualizadas
        let nPosts = postsLoaded.slice(0, 5);
        setAlbumRecently(nPosts)
        setCurrentPlaylist({ data: nPosts, initialSongPos: 0 })
        let nAlbums = newData.slice(0, 8);
        setAlbumDiscover(nAlbums)
        nAlbums = newData.slice(8, 16);
        setAlbumMood(nAlbums)

        // Modificar variables globales
        setArtists(artistsLoaded);
        setPosts(postsLoaded);
        setGenres(genresLoaded);
        setAlbums(newData);

        setArraysModified(true)
        // console.log('Artistas', artistsLoaded)
        // console.log('Canciones', postsLoaded)
        // console.log('Generos', genresLoaded)
        // console.log('Albums', newData)

    }, [apiLoaded]);


    // Crear las listas de reproduccion y los albumes de la pagina de inicio
    useEffect(() => {
        let nPosts = posts.slice(0, 5);
        setAlbumRecently(nPosts)
        setCurrentPlaylist({ data: nPosts, initialSongPos: 0 })

        let nAlbums = albums.slice(0, 8);
        setAlbumDiscover(nAlbums)
        nAlbums = albums.slice(8, 16);
        setAlbumMood(nAlbums)
    }, []);



    return (
        <>
            <div className={`absolute z-10 w-screen h-screen overflow-hidden ${arraysModified ? 'hidden' : 'visible'}`}>
                <Loading />
            </div>
        </>
    )
}


