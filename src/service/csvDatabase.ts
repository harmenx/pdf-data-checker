import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { CompanyRecordData } from '../utils/types';

const databasePath = path.resolve(__dirname, '../../data/database.csv');

export class CSVDatabaseService {
    private records: CompanyRecordData[] = [];

    constructor(key: string) {
        if (key !== "TEST_KEY") {
            throw new Error("Invalid key");
        }
        this.loadCSVDatabase();

    }
    private loadCSVDatabase() {
        try {
            const fileContent = fs.readFileSync(databasePath, 'utf8');
            this.records = this.parseCSV(fileContent);
        } catch (error) {
            console.error(`Failed to load database: ${error.message}`);
            throw error;
        }
    }

    private parseCSV(data: string): CompanyRecordData[] {
        try {
            const records = parse(data, {
                columns: true,
                cast: true
            });
            return records;
        } catch (error) {
            console.error(`Failed to parse CSV: ${error.message}`);
            throw error;
        }

    }

    public extractData(companyName: string): CompanyRecordData | undefined {
        console.log(this.records, companyName);
        return this.records.find(company => company["Company Name"] === companyName);
    }
}