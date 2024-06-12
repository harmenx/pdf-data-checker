import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { promisify } from 'util';
import { CompanyRecordData } from '../utils/types';

const databasePath = path.resolve(__dirname, '../../data/database.csv');

export class CSVDatabaseService {
    private records: CompanyRecordData[] = [];

    constructor(key: string) {
        if (key !== "TEST_KEY") {
            throw new Error("Invalid key");
        }
        this.loadCSVDatabase().catch(error => console.error(`Failed to load database: ${error.message}`));
    }

    private async loadCSVDatabase(): Promise<void> {
        const readFile = promisify(fs.readFile);
        try {
            const fileContent = await readFile(databasePath, 'utf8');
            this.records = await this.parseCSV(fileContent);
        } catch (error) {
            console.error(`Failed to load database: ${error.message}`);
            throw error;
        }
    }

    private parseCSV(data: string): Promise<CompanyRecordData[]> {
        return new Promise((resolve, reject) => {
            const records: CompanyRecordData[] = [];
            parse(data, { columns: true, cast: true })
                .on('data', (row: CompanyRecordData) => records.push(row))
                .on('end', () => resolve(records))
                .on('error', (error: Error) => reject(error));
        });
    }

    public extractData(companyName: string): CompanyRecordData | undefined {
        return this.records.find(company => company["Company Name"] === companyName);
    }
}