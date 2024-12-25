import React, { useState, useEffect } from 'react';
import './books.css';
import { FaSearch, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { jwtDecode } from 'jwt-decode';
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
const token = localStorage.getItem('authToken');

const defaultBooks = [
  { id: 1, image: book1, lang: 'English', title: 'Book1', price: 150 },
  { id: 2, image: book2, lang: 'English', title: 'Book 2', price: 150 },
  { id: 3, image: book3, lang: 'English', title: 'Book 3', price: 150 },
  { id: 4, image: book4, lang: 'English', title: 'Book 4', price: 150 },
  { id: 5, image: book5, lang: 'English', title: 'Book 5', price: 150 },
  { id: 6, image: book6, lang: 'Hindi', title: 'Book 6', price: 150 },
  { id: 7, image: book7, lang: 'Hindi', title: 'Book 7', price: 150 },
  { id: 8, image: book8, lang: 'Gujarati', title: 'Book 8', price: 150 },
];
const bookList = [
  { id: 9, image: book1, lang: 'Hindi', title: 'Bhagavad Gita as it is', price: 150 },
  { id: 10, image: book9, lang: 'Gujarati', title: 'Mahabharata', price: 150 },
  { id: 11, image: book10, lang: 'Hindi', title: 'Shrimad Bhagavatam', price: 150 },
  { id: 12, image: book8, lang: 'Gujarati', title: 'Ramayana', price: 150 },
  { id: 13, image: book17, lang: 'Hindi', title: 'Life comes from life', price: 150 },
  { id: 14, image: book13, lang: 'Gujarati', title: 'Perfect Questions & Perfect Answers', price: 150 },
  { id: 15, image: book14, lang: 'Gujarati', title: 'Beyond Birth & Death', price: 150 },
  { id: 16, image: book15, lang: 'Gujarati', title: 'The Laws of Nature', price: 150 },
];
const additionalBooks = [
  { id: 17, image: book11, lang: 'English', title: 'Near Death Experiences', price: 150 },
  { id: 18, image: book12, lang: 'English', title: 'Out of Body Experience', price: 150 },
  { id: 19, image: book16, lang: 'English', title: 'Krsna', price: 150 },
  { id: 20, image: book18, lang: 'English', title: 'The Complete Book of Yoga', price: 150 },
];

const Books = ({ userId }) => {
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [showMoreBooks, setShowMoreBooks] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [books, setBooks] = useState(bookList);
  const [searchInput, setSearchInput] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    setFavoritesCount(favorites.length);
  }, [favorites]);

  const handleQuantityChange = (bookId, value) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [bookId]: value, // Update quantity for the specific book
    }));
  };
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  }
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('https://soulful-saga-back1.vercel.app/books');
        const books = await response.json();
        console.log(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);
  const handleAddToCart = async (book) => {
    const token = getCookie('access_token');
    const qty = quantity[book.id] || 1;
    try {
      const response = await fetch('https://soulful-saga-back1.vercel.app/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          bookId: book.id,
          title: book.title,
          price: book.price,
          language: book.language,
          quantity: qty,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding to cart:", errorData.message || 'Unknown error');
        alert("Failed to add item to cart. Please try again.");
      } else {
        const data = await response.json();
        console.log("Book added to cart successfully", data);
        setCartCount((prevCount) => prevCount + qty);
        alert("Book added to cart successfully!");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const toggleShowMoreBooks = () => {
    setShowMoreBooks(!showMoreBooks);
    if (showMoreBooks) {
      setBooks(defaultBooks);
    }
  };

  const toggleShowMoreCategories = () => {
    setShowMoreCategories(!showMoreCategories);
  };

  const handleSearch = () => {
    const filteredBooks = defaultBooks.filter(book =>
      book.lang.toLowerCase().includes(searchInput.toLowerCase())
    );
    setBooks(filteredBooks);
    if (searchInput.toLowerCase() !== 'hindi' && searchInput.toLowerCase() !== 'english' && searchInput.toLowerCase() !== 'gujarati') {
      alert('Please enter a valid language: Hindi, English, or Gujarati.');
    }
  };

  const loadMoreBooks = () => {
    setBooks([...books, ...additionalBooks]);
    setShowMoreBooks(true);
  };

  useEffect(() => {
    async function fetchFavorites() {
      const token = getCookie('access_token');
      try {
        const response = await fetch('https://soulful-saga-back1.vercel.app/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites);
          console.log("Fetched favorites:", data.favorites);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }

    fetchFavorites();
  }, []);


  const handleAddToFavorites = async (book) => {
    console.log("Book ID being sent:", book.id); 
    const token = getCookie('access_token');
    console.log("Token in request:", token);

    try {
      const response = await fetch('https://soulful-saga-back1.vercel.app/add-to-favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          bookId: book._id,
          title: book.title,
          price: book.price,
          language: book.language,
        }),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        setFavorites((prevFavorites) => {
          const isAlreadyFavorite = prevFavorites.some(fav => fav.bookId === book.id);
          if (isAlreadyFavorite) {
            return prevFavorites.filter(fav => fav.bookId !== book.id); // Remove from favorites
          } else {
            return [...prevFavorites, { bookId: book.id }]; // Add to favorites
          }
        });
        alert("Favorites updated successfully.");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to update favorites. Please try again later.");
    }
  };

  const isFavorite = (book) => {
    if (!book || !book.id) {
      return false;
    }

    // Ensure bookId exists and isn't null
    const isFav = favorites.some(fav => fav.bookId && fav.bookId.toString() === book.id.toString());

    console.log(`Checking if book ${book.title} (ID: ${book.id}) is favorite: ${isFav}`);

    return isFav;
  };

  const handleRemoveFromFavorites = async (bookId) => {
    const token = getCookie('access_token');
    try {
        const response = await fetch('https://soulful-saga-back1.vercel.app/remove-from-favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({bookId }),
        });

        if (response.ok) {
            const result = await response.json();
            // Update the favorites list after successful removal
            setFavorites(result.favorites);
            console.log("Updated favorites after removal:", result.favorites);
            alert(result.message);
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error removing from favorites:", error);
        alert("Failed to remove from favorites. Please try again later.");
    }
};

const toggleFavorite = async (book) => {
  if (isFavorite(book)) {
      // If the book is already a favorite, remove it
      await handleRemoveFromFavorites(book);
  } else {
      // Otherwise, add it to favorites
      await handleAddToFavorites(book);
  }
};



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
          <div className='icon-container'>
            <div className="cart-icon">
              <p>Add to Cart</p>
              <FaShoppingCart />
              <span className="cart-count">{cartCount}</span>
            </div>
            <div className="favorites-icon">
              <FaHeart />
              <span className="favorites-count">{favoritesCount}</span>
            </div>
          </div>
        </div>

        <h2 className="books-header">Books List</h2>
        <div className="books-div1">
          {books.map(book => (
            <div className="books1" key={book.id}>
              <img src={book.image} alt={book.title} />
              <div className="overlay" onClick={() => toggleFavorite(book)}>
                {isFavorite(book) ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
              </div>
              <div className="lang">{book.lang}</div>
              <div className="title">{book.title}</div>
              <div className="price"><LiaRupeeSignSolid />{book.price}</div>
              <button type='submit' onClick={() => handleAddToCart(book)} className='addtocartbtn'>Add to Cart</button>
              <input
                type="number"
                min="1"
                value={quantity[book.id] || 1}
                onChange={(e) => handleQuantityChange(book.id, parseInt(e.target.value))}
                className="quantity-input"
              />
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
                <div className="overlay">

                  <div onClick={() => toggleFavorite(book)}>
                    {isFavorite(book) ? (
                      <FaHeart className="favorite-icon filled" />
                    ) : (
                      <FaRegHeart className="favorite-icon" />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Books;
