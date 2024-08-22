import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import validator from "validator";

const app = express();
const PORT = 9002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/SoulfulSaga", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => {
    console.log("DB connected");
    // Start the server once MongoDB is connected
    app.listen(PORT, () => {
        console.log(`BE started at port ${PORT}`);
    });
})
.catch(err => console.error("Error connecting to MongoDB:", err));

// Schema
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
            validator: validator.isEmail, // Use validator.isEmail for validation
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    favorites: [bookSchema], 
    cart: [bookSchema]
});
const User = mongoose.model("User", userSchema);

// Routes
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if all required fields are present
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
        const user = await User.findOne({ email, password }).exec();
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials. Please try again." });
        }

        // User found, login successful
        res.status(200).json(user);
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

        // Create a new User instance
        const newUser = new User({
            name,
            email,
            password
        });

        // Save the user to MongoDB
        await newUser.save();
        
        // Respond with success message or user data
        res.status(200).json(newUser);
    } catch (err) {
        console.error("Error signing up:", err);
        res.status(500).json({ message: "Error signing up. Please try again later." });
    }
});

// Add a book to the user's favorites
app.post("/add-to-favorites", async (req, res) => {
    const { userId, book } = req.body;

    try {
        // Find the user and update their favorites
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the book to the user's favorites if not already present
        const alreadyFavorite = user.favorites.some(fav => fav.title === book.title);
        if (!alreadyFavorite) {
            user.favorites.push(book);
            await user.save();
        }

        res.status(200).json({ message: "Book added to favorites" });
    } catch (err) {
        console.error("Error adding to favorites:", err);
        res.status(500).json({ message: "Error adding to favorites. Please try again later." });
    }
});

// Remove a book from the user's favorites
app.post("/remove-from-favorites", async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        // Find the user and remove the book from favorites
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the book from the user's favorites
        user.favorites = user.favorites.filter(book => book._id.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: "Book removed from favorites" });
    } catch (err) {
        console.error("Error removing from favorites:", err);
        res.status(500).json({ message: "Error removing from favorites. Please try again later." });
    }
});

// Add a book to the user's cart
app.post("/add-to-cart", async (req, res) => {
    const { userId, book } = req.body;

    try {
        // Find the user and update their cart
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the book to the user's cart if not already present
        const alreadyInCart = user.cart.some(cartItem => cartItem.title === book.title);
        if (!alreadyInCart) {
            user.cart.push(book);
            await user.save();
        }

        res.status(200).json({ message: "Book added to cart" });
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ message: "Error adding to cart. Please try again later." });
    }
});

// Remove a book from the user's cart
app.post("/remove-from-cart", async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        // Find the user and remove the book from cart
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the book from the user's cart
        user.cart = user.cart.filter(book => book._id.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: "Book removed from cart" });
    } catch (err) {
        console.error("Error removing from cart:", err);
        res.status(500).json({ message: "Error removing from cart. Please try again later." });
    }
});

// Function to add a book to favorites
async function addToFavorites(userId, book) {
    await fetch('/add-to-favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, book }),
    });
}

// Function to remove a book from favorites
async function removeFromFavorites(userId, bookId) {
    await fetch('/remove-from-favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookId }),
    });
}

// Function to add a book to cart
async function addToCart(userId, book) {
    await fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, book }),
    });
}

// Function to remove a book from cart
async function removeFromCart(userId, bookId) {
    await fetch('/remove-from-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookId }),
    });
}
