import { describe, it, expect, beforeEach } from 'vitest';
import { CSVDatabaseService } from '../../service/csvDatabase';
import { CompanyRecordData } from '../../utils/types';

describe('csvDatabase Tests', () => {
    let service: CSVDatabaseService;

    beforeEach(async () => {
        service = new CSVDatabaseService("TEST_KEY");
    });

    it('should load records during initialization', () => {
        const records = service['records'];
        expect(records.length).toBeGreaterThan(0);
    });

    it('should return correct data for an existing company', () => {
        const companyName = 'TechCorp';
        const expectedData: CompanyRecordData = {
            "Company Name": companyName,
            "Industry": 'Technology',
        };

        const result = service.extractData(companyName);
        console.log(expectedData, result)
        for (const [key, value] of Object.entries(expectedData)) {
            expect(result).toHaveProperty(key, value);
        }
    });

    it('should return undefined for a non-existent company', () => {
        const nonExistentCompany = 'NonExistentCorp';
        const result = service.extractData(nonExistentCompany);
        expect(result).toBeUndefined();
    });
});