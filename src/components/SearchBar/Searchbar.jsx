import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
    const [searchWord, setSearchWord] = useState('');

    const handleChange = (e) => {
        setSearchWord(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (searchWord.trim() === '') {
            toast.error('Please enter your request');
            return;
        } 
        onSubmit(searchWord.trim());
    };

    return (
        <header className={css.searchbar}>
            <form className={css.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={css.button}>
                    <span className={css.buttonLabel}>Search</span>
                </button>

                <input
                    className={`${css.input} ${searchWord !== '' ? css.inputError : ''}`}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    value={searchWord}
                    onChange={handleChange}
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;