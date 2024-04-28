const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors'); // Import cors module
const { PrismaClient } = require('@prisma/client');
const axios = require('axios'); // Import axios for making HTTP requests
const jwt = require('jsonwebtoken'); // Import JWT for token generation and verification
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const path = require('path');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Initialize ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server and apply middleware
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

// Secret key for JWT
const JWT_SECRET = 'your-strong-secret-key'; // Replace with a strong and unique secret key

// User registration endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

        // Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists in the database
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the password provided with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);

        // Send the token back to the client
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
}

// Define routes for CRUD operations
const bookRoutes = require('./routes/book');
app.use('/api', bookRoutes);

const authorRoutes = require('./routes/author');
app.use('/api', authorRoutes);

const topicRoutes = require('./routes/topic');
app.use('/api', topicRoutes);

// Route to fetch weather data from OpenWeatherMap API
app.get('/weather', verifyToken, async (req, res) => {
    const cityName = req.query.city;

    if (!cityName) {
        return res.status(400).json({ error: 'City parameter is missing' });
    }

    try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: cityName,
                appid: 'f4f64f2610dc4e68db2f80c43eb09075'
            }
        });

        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description
        };

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.response.data);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Serve static files (CSS, JavaScript, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and listen for connections
startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error starting server:', error);
});


