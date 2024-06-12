import { CompanyPDFData } from "../pdf-service";

export interface CompanyComparisonResult {
    pdfData: CompanyPDFData;
    companyData: CompanyRecordData;
    differences: Record<string, { database: string; pdf: string | number }>;
}

export interface CompanyRecordData {
    "Company Name": string;
    [key: string]: string | number;
}
