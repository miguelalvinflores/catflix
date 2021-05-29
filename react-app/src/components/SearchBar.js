import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import * as movieActions from "../store/movie"

function Searchbar() {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const allMovie = useSelector((state) => state.movie.allMovies);
    const [searchTerm, setSearchTerm] = useState("")
    // const [searchActive, setSearchActive] = useState(false)

    useEffect(() => {

        if (searchTerm) {
            dispatch(movieActions.searchMovies(searchTerm))
            history.push("/search")
            
        } else {
            dispatch(movieActions.retrieveMovies())
            history.push("/browse")

        }

    }, [searchTerm, dispatch])

    // useEffect(() => {
    //     const data = localStorage.getItem('currentSearchTerm');
    //     if (data) {
    //         setSearchActive(true)
    //         setSearchTerm(data)
    //     }
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('currentSearchTerm', searchTerm)
    // }, [searchTerm]);

    // const activateSearch = () => {
    //     if (location.pathname !== '/') {
    //         history.push(`/`)
    //     }
    //     setSearchActive(true)

    // }

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     activateSearch()
    // }

    // const handleEnterKey = e => {
    //     if (e.key === 'Enter') {
    //         activateSearch()
    //     }

    // }

    // const handleReset = e => {
    //     e.preventDefault()
    //     setSearchTerm('')
    //     setSearchActive(true)
    // }

    // let resetButtonActive;
    // if (location.pathname === '/') {
    //     resetButtonActive = (
    //         <button type='reset' onClick={handleReset} className='reset-button'>ⓧ</button>
    //     )
    // }

    // if () {
    //     let searchBarCon = document.querySelector('.search-bar__container')
    //     let searchBarBox = document.querySelector('.search-bar')
    //     let searchBarButton = document.querySelector('.search-button')

    //     searchBarCon?.classList.add('front-page')
    //     searchBarBox?.classList.add('search-bar__front-page')
    //     searchBarButton?.classList.add('search-button__front-page')
    // }

    return (
        <div className='search-bar__container'>
            <input
                className='search-bar'
                placeholder='Title, description, genres'
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

        </div>
    )
}


export default Searchbar