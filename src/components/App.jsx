import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import css from './App.module.css';
import SearchBar from './SearchBar/Searchbar';
import { ToastContainer, toast } from "react-toastify";
import ImageGallery from './ImageGallery/ImageGallery';
import * as getImage from './API/api';
import Modal from './Modal/Modal';
import Button from "./Button/Button";
import Spinner from "./Loader/Loader";
import 'react-toastify/dist/ReactToastify.css';



const PER_PAGE = 12;

export const App = () => {
  const [searchWord, setSearchWord] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);
  const [modalURL, setModalURL] = useState('');
  

  useEffect(() => {
    const handleFormOnSubmit = (searchWord) => {
      setSearchWord(searchWord);
      setImages([]);
      setPage(1);
      setTotalPages(1);
      setShowLoader(false);
      setError(null);
      setModalURL('');
    };

    if (searchWord) {
      const fetchData = async () => {
        setShowLoader(true);
        try {
          const result = await getImage.fetchImagesBundle({
            query: searchWord,
            page,
            perPage: PER_PAGE,
          });
          
          if (result.totalHits === 0) {
            toast.warning('Sorry! There is no result for your request');
            setImages([]);
            setShowLoader(false);
            return;
          };

          if (page === 1) {
            toast.info(`There are ${result.totalHits} images we found`);
            setTotalPages(Math.ceil(result.totalHits / PER_PAGE));
          }

          const hits = result.hits.map((element) => ({
            id: element.id,
            webformatURL: element.webformatURL,
            largeImageURL: element.largeImageURL,
            user: element.user,
          }));

          setImages((prevImages) => [...prevImages, ...hits]);
        } catch (error) {
          setError(error.message);
          toast.error(`Error occured ${error.message}`)
        } finally {
          setShowLoader(false)
        }
      };

      fetchData();
    }
  }, [searchWord, page]);

   

  const onImageClick = (url) => {
    setModalURL(url);
  };

  const cleanURL = () => {
    setModalURL('');
  };

  const handleLoadMore = () => {
        if (page +1 <= totalPages) {
            setPage((prevState) => prevState.page + 1);
        }
  };


  const isLoadMoreDisabled = !images.length && searchWord === '';

  return (
    <>
      <div className={css.app}>
        <SearchBar onSubmit={handleFormOnSubmit} />
        <ImageGallery images={images} onClick={onImageClick} />
        <Spinner show={showLoader} />
            {!!images.length && (
        <Button onClick={handleLoadMore} disabled={isLoadMoreDisabled} style={{ display: isLoadMoreDisabled ? 'none' : 'block' }} />
            )}
        {Boolean(modalURL) && <Modal url={modalURL} cleanURL={cleanURL} />}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </>
  )
};

export default App;