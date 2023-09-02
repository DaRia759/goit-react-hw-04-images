import { Component, useState } from "react";
// import axios from "axios";
import css from './App.module.css';
import SearchBar from './SearchBar/Searchbar';
import { ToastContainer, toast } from "react-toastify";
import ImageGallery from './ImageGallery/ImageGallery';
import * as getImage from './API/api';
import Modal from './Modal/Modal';
import Button from "./Button/Button";
import Spinner from "./Loader/Loader";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";


const PER_PAGE = 12;

export const App = () => {
  const [searchWord, setSearchWord] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [error,setError] = useState(null);
  const [modalURL, setModalURL] = useState('');
  

  useEffect(() => {
    const handleFormOnSubmit = searchWord => {
      setSearchWord(searchWord);
      setImages([]);
      setPage(1);
      setTotalPages(1);
      setShowLoader(false);
      setError(null);
      setModalURL('');
    };
  }), [searchWord, images, page, totalPages, showLoader, error, modalURL];

  const onImageClick = url => {
    modalURL:url;
  };

  const cleanURL = () => {
    modalURL:'';
  };

  const handleLoadMore = () => {
        if (page < totalPages) {
            this.setState(prevState => ({ page: prevState.page + 1 }));
        }
  };

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


// export default class App extends Component {
//     state = {
//         searchWord: '',
//         images: [],
//         page: 1,
//         totalPages: 1,
//         showLoader: false,
//         error: null,
//         modalURL: '',
//     };

//     async componentDidUpdate(prevProps, prevState) {
//         const searchedWordUpdate =
//             prevState.searchWord !== this.state.searchWord;
//         const pageUpdate = prevState.page !== this.state.page;

//         if (searchedWordUpdate || pageUpdate) {
//             this.setState({ showLoader: true });
//             try {
//                 const result = await getImage.fetchImagesBundle({
//                     query: this.state.searchWord,
//                     page: this.state.page,
//                     perPage: PER_PAGE,
//                 });

//                 if (result.totalHits === 0) {
//                     toast.warning('Sorry! There is no result for your request'
//                     );
//                     this.setState({
//                         images: [],
//                         showLoader: false
//                     });
//                     return;
//                 }
//                 if (searchedWordUpdate) {
//                     toast.info(`There are ${result.totalHits} images we found`);
//                     this.setState({ totalPages: Math.ceil(result.totalHits / PER_PAGE) });
//                 }
//                 const hits = result.hits.map(element => {
//                     return {
//                         id: element.id,
//                         webformatURL: element.webformatURL,
//                         largeImageURL: element.largeImageURL,
//                         user: element.user,
//                     };
//                 });
//                 const newState = [...this.state.images, ...hits];
//                 this.setState({
//                     images: newState,
//                     showLoader: false
//                 });

//             } catch (error) {
//                 this.setState({ error: error.message });
//                 toast.error(`Error occured ${this.state.error}`);
//             } finally {
//                 this.setState({ showLoader: false });
//             }
//         }
//     }

//     handleFormOnSubmit = searchWord => {
//         this.setState({ searchWord, page: 1, images: []});
//     };

//     onImageClick = url => {
//         this.setState({ modalURL:url });
//     };

//     cleanURL = () => {
//         this.setState({ modalURL:'' });
//     };

//     handleLoadMore = () => {
//         if (this.state.page < this.state.totalPages) {
//             this.setState(prevState => ({ page: prevState.page + 1 }));
//         }
//     };


//     render() {
//         const isLoadMoreDisabled = !this.state.images.length && this.state.searchWord === '';

//         return (
//             <>
//                 <div className={css.app}>
//                     <SearchBar onSubmit={this.handleFormOnSubmit} />
//                     <ImageGallery images={this.state.images} onClick={this.onImageClick} />
//                     <Spinner show={this.state.showLoader} />
//                     {!!this.state.images.length && (
//                     <Button onClick={this.handleLoadMore} disabled={isLoadMoreDisabled} style={{ display: isLoadMoreDisabled ? 'none' : 'block' }} />
//                     )}
//                     {Boolean(this.state.modalURL) && <Modal url={this.state.modalURL} cleanURL={this.cleanURL} />}
//                 </div>
//                 <ToastContainer
//                     position="bottom-center"
//                     autoClose={3000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme="light"
//                 />
//             </>
//         )
//     }
// };
