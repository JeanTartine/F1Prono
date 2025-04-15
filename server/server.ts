import express from 'express';
import cors from 'cors';
import pool from './database.js';
import groupRoutes from "./src/routes/groupRoutes";
const corsOptions = {
}

const app = express();
const port = 3001;

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to F1Prono API' });
});

app.use("/group", groupRoutes)
app.get('/players', (request, response) => {
  pool.query('SELECT * FROM player ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

// GUARD ROUTES
app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Route not found",
  };
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log("ERROR", error);
  res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

// POST ENDPOINTS
app.post('/group', (request, response) => {
  const newGroup = {
    groupName: request.body.name,
  }
  pool.pus
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 