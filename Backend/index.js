import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
const SECRET_KEY = "6c9d458811e4ce70cbf5420cc9c2c01616cdd2d77e9938bb545fb34601094d35297303bead7348a7ff1a7a5a53164ee0c712c2ba3685ee8249e7044a288dcde4";

const app = express();
const PORT = 9002;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/SoulfulSaga", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`Backend started at port ${PORT}`);
        });
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
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
    // favorites: [bookSchema], 
    // cart: [bookSchema]
    cart: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            quantity: { type: Number, default: 1 }
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

        // Find user by email and password
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials. Please try again." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "Invalid credentials. Please try again." });
        }
        // User found, login successful
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, user });
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        console.error("Error signing up:", err);
        res.status(500).json({ message: "Error signing up. Please try again later." });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: "No token provided" });
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
    });
};

// Adding and removing books from favorites
app.post("/add-to-favorites", authenticateToken, async (req, res) => {
    const { book } = req.body;
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the book already exists in favorites
        const alreadyFavorite = user.favorites.some(fav => fav._id.toString() === book._id);

        if (!alreadyFavorite) {
            user.favorites.push(book);
        } else {
            user.favorites = user.favorites.filter(fav => fav._id.toString() !== book._id);
        }

        await user.save();
        res.status(200).json({
            message: alreadyFavorite ? "Book removed from favorites" : "Book added to favorites",
            favorites: user.favorites
        });
    } catch (err) {
        console.error("Error adding to favorites:", err);
        res.status(500).json({ message: "Error adding to favorites. Please try again later." });
    }
});

// Adding and removing books from cart
app.post("/add-to-cart", authenticateToken, async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.userId;

    console.log("User ID:", userId);
    console.log("Book ID:", bookId);

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid book ID" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // const cartItem = user.cart.find(item => item.bookId.toString() === bookId);

        const cartItem = user.cart.find(item => item.bookId && item.bookId.toString() === bookId);

        if (cartItem) {
            cartItem.quantity += 1; 
        } else {
            user.cart.push({ bookId }); 
        }


        await user.save();
        res.status(200).json({ message: "Book added to cart", cart: user.cart });
    } catch (err) {
        console.error("Error adding to cart:", err.stack);
        res.status(500).json({ message: "Error adding to cart. Please try again later." });
    }
});


// Remove a book from the user's cart
app.post("/remove-from-cart", authenticateToken, async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.cart = user.cart.filter(book => book._id.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: "Book removed from cart", cart: user.cart });
    } catch (err) {
        console.error("Error removing from cart:", err);
        res.status(500).json({ message: "Error removing from cart. Please try again later." });
    }
});

// Function to add a book to favorites
async function addToFavorites(userId, book) {
    try {
        const response = await fetch('http://localhost:9002/add-to-favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token for authentication
            },
            body: JSON.stringify({ book }),
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
async function removeFromFavorites(userId, bookId) {
    try {
        const response = await fetch('http://localhost:9002/remove-from-favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token for authentication
            },
            body: JSON.stringify({ bookId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error removing from favorites:", errorData.message);
            return;
        }

        console.log("Book removed from favorites successfully");
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
                'Authorization': `Bearer ${token}` // Add the token for authentication
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
                'Authorization': `Bearer ${token}` // Add the token for authentication
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
