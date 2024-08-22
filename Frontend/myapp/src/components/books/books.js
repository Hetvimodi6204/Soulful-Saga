import React, { useState } from 'react';
import './books.css';
import { FaSearch, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import book1 from '../Images/bo1.jpg';
import book2 from '../Images/bo2.jpg';
import book3 from '../Images/bo3.jpg';
import book4 from '../Images/bo4.png';
import book5 from '../Images/bo5.png';
import book6 from '../Images/bo6.jpg';
import book7 from '../Images/bo7.jpg';
import book8 from '../Images/bo8.jpg';
import book9 from '../Images/bl1.jpg';
import book10 from '../Images/bl2.jpg';
import book11 from '../Images/bl3.jpg';
import book12 from '../Images/bl4.png';
import book13 from '../Images/bl5.jpg';
import book14 from '../Images/bl6.jpg';
import book15 from '../Images/bl7.jpg';
import book16 from '../Images/bl8.jpg';
import book17 from '../Images/bl9.png';
import book18 from '../Images/bl10.jpg';

const defaultBooks = [
  { id: 1, image: book1, lang: 'English', title: 'Book1', descrip: 'Description of Book 1', price: 150 },
  { id: 2, image: book2, lang: 'English', title: 'Book 2', descrip: 'Description of Book 2', price: 150 },
  { id: 3, image: book3, lang: 'English', title: 'Book 3', descrip: 'Description of Book 3', price: 150 },
  { id: 4, image: book4, lang: 'English', title: 'Book 4', descrip: 'Description of Book 4', price: 150 },
  { id: 5, image: book5, lang: 'English', title: 'Book 5', descrip: 'Description of Book 5', price: 150 },
  { id: 6, image: book6, lang: 'Hindi', title: 'Book 6', descrip: 'Description of Book 6', price: 150 },
  { id: 7, image: book7, lang: 'Hindi', title: 'Book 7', descrip: 'Description of Book 7', price: 150 },
  { id: 8, image: book8, lang: 'Gujarati', title: 'Book 8', descrip: 'Description of Book 8', price: 150 },
];
const bookList=[
  { id: 9, image: book1, lang: 'Hindi', title: 'Bhagavad Gita as it is', descrip: 'Description of Book 7', price: 150 },
  { id: 10, image: book9, lang: 'Gujarati', title: 'Mahabharata', descrip: 'Description of Book 8', price: 150 },
  { id: 11, image: book10, lang: 'Hindi', title: 'Shrimad Bhagavatam', descrip: 'Description of Book 7', price: 150 },
  { id: 12, image: book8, lang: 'Gujarati', title: 'Ramayana', descrip: 'Description of Book 8', price: 150 },
  { id: 13, image: book17, lang: 'Hindi', title: 'Life comes from life', descrip: 'Description of Book 7', price: 150 },
  { id: 14, image: book13, lang: 'Gujarati', title: 'Perfect Questions & Perfect Answers', descrip: 'Description of Book 8', price: 150 },  
  { id: 15, image: book14, lang: 'Gujarati', title: 'Beyond Birth & Death', descrip: 'Description of Book 8', price: 150 },
  { id: 16, image: book15, lang: 'Gujarati', title: 'The Laws of Nature', descrip: 'Description of Book 8', price: 150 },
];
const additionalBooks = [
  { id: 17, image: book11, lang: 'English', title: 'Near Death Experiences', descrip: 'Description of Book 9', price: 150 },
  { id: 18, image: book12, lang: 'English', title: 'Out of Body Experience', descrip: 'Description of Book 10', price: 150 },
  { id: 19, image: book16, lang: 'English', title: 'Krsna', descrip: 'Description of Book 11', price: 150 },
  { id: 20, image: book18, lang: 'English', title: 'The Complete Book of Yoga', descrip: 'Description of Book 12', price: 150 },
];

const Books = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showMoreBooks, setShowMoreBooks] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [books, setBooks] = useState(bookList);
  const [searchInput, setSearchInput] = useState('');
  const [favorites, setFavorites] = useState([]);
  
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    alert("Item added to cart");
  };

  const toggleShowMoreBooks = () => {
    setShowMoreBooks(!showMoreBooks);
    // Reset books to default when toggling to "Show Less"
    if (showMoreBooks) {
      setBooks(defaultBooks);
    }
  };

  const toggleShowMoreCategories = () => {
    setShowMoreCategories(!showMoreCategories);
  };

  const handleSearch = () => {
    // Filter books based on search input
    const filteredBooks = defaultBooks.filter(book =>
      book.lang.toLowerCase().includes(searchInput.toLowerCase())
    );
    setBooks(filteredBooks);

    // Alert if the search input is not Hindi, English, or Gujarati
    if (searchInput.toLowerCase() !== 'hindi' && searchInput.toLowerCase() !== 'english' && searchInput.toLowerCase() !== 'gujarati') {
      alert('Please enter a valid language: Hindi, English, or Gujarati.');
    }
  };

  const loadMoreBooks = () => {
    setBooks([...books, ...additionalBooks]);
    setShowMoreBooks(true);
  };

  const handleAddToFavorites = (book) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(book.id)) {
        alert("Item removed from Favourites");
        return prevFavorites.filter((id) => id !== book.id);
      } else {
        alert("Item added to favourites");
        return [...prevFavorites, book.id];
      }
    });
  };

  const isFavorite = (book) => favorites.includes(book.id);

  return (
    <>
      {/* Hero section */}
      <div className='books-page'>
      <div className="books-container">
        <div className="quotes-col">
          <h1 className='quotes-heading'>Quotes</h1>
          <p>"God is bigger than the biggest and smaller than the smallest. That is His greatness."<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>- Dharma: The Way of Transcendence </i></p>

          <p>"To chant God's holy name means to associate directly with Him."<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i>-
              Science of Self Realization</i> </p>
          <p>"God accepts only the love with which things are offered to Him."<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i>-
              Bhagavad Gita 9.2</i></p>
        </div>
        <div className="books-overview">
          <h2>Books overview</h2>
          <div className="books-grid">
            {defaultBooks.slice(0, 6).map((book) => (
              <div className="books" key={book.id}>
                <img src={book.image} alt={book.title} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moving text strip */}
      <div className="moving-text-container">
        <div className="moving-text">
          <p>First take the science of God very seriously, then put your trust in Him.</p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bottom-strip">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by language..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={handleSearch}><FaSearch /> Search</button>
        </div>
        <div className="cart-icon">
          <span>Add to Cart</span>
          <FaShoppingCart />
          <span className="cart-count">{cartCount}</span>
        </div>
        <div className="favorites-icon">
          <FaHeart />
          <span className="favorites-count">{favorites.length}</span>
        </div>
      </div>

      <h2 className="books-header">Books List</h2>
      <div className="books-div1">
        {books.map((book) => (
          <div className="books1" key={book.id}>
            <img src={book.image} alt={book.title} />
            <div className="overlay" onClick={() => handleAddToFavorites(book)}>
              {isFavorite(book) ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
            </div>
            <div className="lang">{book.lang}</div>
            <div className="title">{book.title}</div>
            <div className="descrip">{book.descrip}</div>
            <div className="price"><LiaRupeeSignSolid />{book.price}</div>
            <button type='submit' onClick={handleAddToCart} className='addtocartbtn'>Add to Cart</button>
          </div>
        ))}
      </div>
      {!showMoreBooks && (
        <div className="load-more-container">
          <button className="load-more" onClick={loadMoreBooks}>
            Load More
          </button>
        </div>
      )}
      {showMoreBooks && (
        <div className="load-more-container">
          <button className="load-more" onClick={toggleShowMoreBooks}>
            Show Less
          </button>
        </div>
      )}

      <br />

      <h2 className="browse-categories">Browse our categories</h2>
      <div className="books-div2">
        {showMoreCategories
          ? [...defaultBooks].map((book) => (
            <div className="books2" key={book.id}>
              <img src={book.image} alt={book.title} />
              <div className="overlay" onClick={() => handleAddToFavorites(book)}>
                {isFavorite(book) ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
              </div>
            </div>
          ))
          : defaultBooks.map((book) => (
            <div className="books2" key={book.id}>
              <img src={book.image} alt={book.title} />
              <div className="overlay" onClick={() => handleAddToFavorites(book)}>
                {isFavorite(book) ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
              </div>
            </div>
          ))}
      </div>
      </div>
    </>
  );
};

export default Books;
