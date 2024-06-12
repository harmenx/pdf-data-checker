
import { Request, Response } from "express";
import { PdfService } from "../pdf-service";
import { compareCompanyData } from "../utils/compareData";
import { CSVDatabaseService } from "../service/csvDatabase";
const API_KEY = process.env.API_KEY  || 'TEST_KEY';
const PDF_SERVICE_API_KEY  = process.env.PDF_SERVICE_KEY  || 'TEST_KEY';
const DATABASE_SERVICE_API_KEY  = process.env.DATABASE_SERVICE_KEY  || 'TEST_KEY';

const pdfService = new PdfService(PDF_SERVICE_API_KEY );
const databaseService = new CSVDatabaseService(DATABASE_SERVICE_API_KEY );



export const uploadPDF = async (req: Request, res: Response) => {

    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== API_KEY ) {
        return res.status(401).send("Unauthorized.");
    }

    try {
        const filePath = `${req.file.destination}${req.file.originalname}`;
        const pdfData = await pdfService.extract(filePath);
        const companyData = databaseService.extractData(pdfData['Company Name'] as string);

        if (!companyData) {
            return res.status(404).send("Company not found.");
        }

        const comparisonResult = compareCompanyData(pdfData, companyData);

        res.json(comparisonResult);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(`An error occurred: ${error.message}`);
        }
    }
};