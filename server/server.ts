import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import groupRoutes from "./src/routes/groupRoutes";
import betRoutes from "./src/routes/betRoutes";
import playerRoutes from "./src/routes/playerRoutes";
const corsOptions = {
}

const app = express();
const port = 3001;

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/group", groupRoutes)
app.use("/bet", betRoutes)
app.use("/player", playerRoutes)

// GUARD ROUTES
app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Route not found",
  };
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  console.log("ERROR", error);
  res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 