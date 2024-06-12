import { CompanyPDFData } from '../pdf-service';
import { CompanyRecordData, CompanyComparisonResult } from './types';

function getAllKeys(pdfData : CompanyPDFData, companyData: CompanyRecordData) {
    return new Set<string>([
        ...Object.keys(pdfData),
        ...Object.keys(companyData)
    ]);
}

export function compareCompanyData(pdfData: CompanyPDFData, companyData: CompanyRecordData): CompanyComparisonResult {
    const comparisonResult: CompanyComparisonResult = {
        pdfData,
        companyData,
        differences: {}
    };

    const allKeys = getAllKeys(pdfData, companyData);

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