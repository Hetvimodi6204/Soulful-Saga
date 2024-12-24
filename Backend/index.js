import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import validator from "validator";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
const SECRET_KEY = "6c9d458811e4ce70cbf5420cc9c2c01616cdd2d77e9938bb545fb34601094d35297303bead7348a7ff1a7a5a53164ee0c712c2ba3685ee8249e7044a288dcde4";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 9002;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['https://soulful-saga-frontend.vercel.app/'],
    methods: ["GET,POST, PUT, HEAD, DELETE, PATCH"],
    credentials: true,
}));

dotenv.config();
app.use(cookieParser());

mongoose.connect(mongodb+srv://hetvimodi:hetvimodi6204@cluster0.gbttx9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0)

    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`Backend started at port ${PORT}`);
        });
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));

const bookSchema = new mongoose.Schema({
    title: String,
    price: Number,
    language: String
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    favorites: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            title: { type: String },
            price: { type: String },
            language: { type: String },
        }
    ],

    cart: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            title: { type: String },
            price: { type: String },
            language: { type: String },
            quantity: { type: Number, default: 1 },
        }
    ]
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model('Book', bookSchema);
export default Book;

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Error fetching books' });
    }
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter email and password." });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials. Please try again." });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "Invalid credentials. Please try again." });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        console.log(token);

        // Store token in a cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'Strict', // Strict or Lax depending on your use case
            secure: process.env.NODE_ENV === 'production', // True in production
        });

        console.log("cookie generated");

        // Respond with user info (excluding password)
        const { password: pass, ...userData } = user._doc;
        res.status(200).json({ ...userData, token });
        console.log("cookie stored");
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Error logging in. Please try again later." });
    }
});


app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if all required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields." });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists. Please use a different email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Respond with user info (excluding password)
        const { password: pass, ...userData } = newUser._doc;
        res.status(200).json(userData);
    } catch (err) {
        console.error("Error signing up:", err);
        res.status(500).json({ message: err });
    }
});


const authenticateToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("Token received:", token);
    if (!token) {
        return res.status(403).json({ message: "No token provided, authorization denied." });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Attach the decoded user information to the request
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(403).json({ message: "Invalid token, authorization denied." });
    }
};
// Fetch the user's favorites when fetching books
app.get("/favorites", authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId).populate('favorites.bookId');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Favorites for user:", user.favorites);
        res.status(200).json({
            favorites: user.favorites
        });
    } catch (err) {
        console.error("Error fetching favorites:", err);
        res.status(500).json({ message: "Error fetching favorites. Please try again later." });
    }
});
// Adding and removing books from favorites
app.post("/add-to-favorites", authenticateToken, async (req, res) => {
    let { bookId, title, price, language } = req.body;
    const userId = req.user.userId;

    try {
        bookId = new mongoose.Types.ObjectId(bookId);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const alreadyFavorite = user.favorites.some(fav => fav.bookId.toString() === bookId.toString());

        if (alreadyFavorite) {
            user.favorites = user.favorites.filter(fav => fav.bookId.toString() !== bookId.toString());
        } else {
            user.favorites.push({
                bookId: new mongoose.Types.ObjectId(bookId),
                title: title,
                price: price,
                language: language,
            });
        }

        await user.save();
        const updatedUser = await User.findById(userId).populate('favorites.bookId');

        res.status(200).json({
            message: alreadyFavorite ? "Book removed from favorites" : "Book added to favorites",
            favorites: updatedUser.favorites
        });
    } catch (err) {
        console.error("Error adding to favorites:", err);
        res.status(500).json({ message: "Error adding to favorites. Please try again later." });
    }
});


app.post("/add-to-cart", authenticateToken, async (req, res) => {
    let { bookId } = req.body;

    const { title, price, language, quantity = 1 } = req.body;
    const userId = req.user.userId;

    console.log("User ID:", userId);
    console.log("Book ID:", bookId);

    if (typeof bookId === 'number') {
        bookId = new mongoose.Types.ObjectId(bookId);
    }

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid book ID" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItem = user.cart.find(item => item.bookId && item.bookId.toString() === bookId);

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            user.cart.push({
                bookId: bookId,
                title: title,
                price: price,
                language: language,
                quantity: quantity
            });
        }

        await user.save();
        res.status(200).json({ message: "Book added to cart", cart: user.cart });
    } catch (err) {
        console.error("Error adding to cart:", err.stack);
        res.status(500).json({ message: "Error adding to cart. Please try again later." });
    }
});

app.post('/remove-from-favorites', authenticateToken, async (req, res) => {
    // Step 1: Extract bookId from the request body
    const { bookId } = req.body;  // Only expect bookId as input
    const userId = req.user.userId;  // The userId comes from the authenticated token

    // Step 2: Validate the bookId format (make sure it's a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        console.error("Invalid bookId format:", bookId);  // Log the error for debugging
        return res.status(400).json({ message: "Invalid bookId format" });
    }

    // Step 3: Find the user in the database by userId
    const user = await User.findById(userId);  // Find the user by the userId in the token
    if (!user) {
        console.error("User not found:", userId);  // Log if the user doesn't exist
        return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Convert bookId to ObjectId to match with the saved format in favorites
    const bookIdObject = mongoose.Types.ObjectId(bookId);

    // Step 5: Check if the bookId is in the user's favorites
    const isFavorite = user.favorites.some(fav => fav.bookId.toString() === bookIdObject.toString());
    if (!isFavorite) {
        console.error("Book not found in favorites:", bookId);  // Log if the book is not found
        return res.status(404).json({ message: "Book not found in favorites" });
    }

    // Step 6: Remove the book from the user's favorites
    user.favorites = user.favorites.filter(fav => fav.bookId.toString() !== bookIdObject.toString());

    // Step 7: Save the updated user document to the database
    await user.save();

    // Step 8: Respond with a success message and the updated favorites list
    res.status(200).json({
        message: "Book removed from favorites",
        favorites: user.favorites  // Return the updated list of favorites
    });
});



// Function to add a book to favorites
async function addToFavorites(bookId) {
    try {
        const response = await fetch('http://localhost:9002/add-to-favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer`${token}` // Add the token for authentication
            },
            body: JSON.stringify({ bookId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error adding to favorites:", errorData.message);
            return;
        }

        const data = await response.json();
        console.log("Book added to favorites successfully", data);
    } catch (error) {
        console.error("Network error:", error);
    }
}

// Function to remove a book from favorites
// Function to remove a book from favorites
async function removeFromFavorites(bookId) {
    try {
        const response = await fetch('http://localhost:9002/remove-from-favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer`${token}`, // Add the token for authentication
            },
            body: JSON.stringify({ bookId }),  // Send the bookId in the request body
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error removing from favorites:", errorData.message);
            return;
        }

        const data = await response.json();
        console.log("Book removed from favorites successfully", data);
    } catch (error) {
        console.error("Network error:", error);
    }
}

// Function to add a book to cart
async function addToCart(userId, book) {
    try {
        const response = await fetch('http://localhost:9002/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer`${token}` // Add the token for authentication
            },
            body: JSON.stringify({ book }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error adding to cart:", errorData.message);
            return;
        }

        console.log("Book added to cart successfully");
    } catch (error) {
        console.error("Network error:", error);
    }
}

// Function to remove a book from cart
async function removeFromCart(userId, bookId) {
    try {
        const response = await fetch('http://localhost:9002/remove-from-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer`${token}` // Add the token for authentication
            },
            body: JSON.stringify({ bookId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error removing from cart:", errorData.message);
            return;
        }

        console.log("Book removed from cart successfully");
    } catch (error) {
        console.error("Network error:", error);
    }
}
