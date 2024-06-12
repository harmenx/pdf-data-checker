import { CompanyPDFData } from '../pdf-service';
import { CompanyRecordData, CompanyComparisonResult } from './types';

export function compareCompanyData(pdfData: CompanyPDFData, companyData: CompanyRecordData): CompanyComparisonResult {
    const comparisonResult: CompanyComparisonResult = {
        pdfData,
        companyData,
        differences: {}
    };

    const allKeys = new Set<string>([
        ...Object.keys(pdfData),
        ...Object.keys(companyData)
    ]);

    allKeys.forEach((key) => {
        const companyValue = companyData[key] ?? '';
        const pdfValue = pdfData[key] ?? '';

        if (companyValue !== pdfValue) {
            comparisonResult.differences[key] = {
                database: String(companyValue),
                pdf: String(pdfValue)
            };
        }
    });

    return comparisonResult;
}