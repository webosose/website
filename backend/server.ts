import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import axios from 'axios';

const app = express();
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173','http://14.46.254.67:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Root route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API');
});

// Middleware to verify JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    (req as any).user = decoded;
    next();
  });
};

// API: register
app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        password_hash: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.user_id });
  } catch (error) {
    next(error);
  }
});

// API: login
app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ userId: user.user_id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
});

app.get(
  "/widget/weather",
    authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { location } = req.query;

            // Use location if provided
            if (location) {
                const apiKey = process.env.WEATHER_API_KEY || "your_api_key_here";
                const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`;

                if (!location) {
                  return res
                    .status(400)
                    .json({ error: "Location parameter is required." });
                }

                const response = await axios.get(weatherApiUrl, {
                    params: {
                        q: location,
                        appid: apiKey,
                        units: "metric",
                    },
                });

                return res.json(response.data);
            }
          } catch (error) {
            console.error("Weather API error:", error);
            next(error);
        }
    }
  );

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
