import express, { Express } from "express";
import dotenv from "dotenv";
import multer from 'multer';
import { uploadPDF } from "./controllers/pdfController";

const upload = multer({ dest: 'uploads/' });

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.post('/upload', upload.single('pdf'), uploadPDF);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
