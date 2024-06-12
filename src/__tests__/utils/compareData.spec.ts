import { describe, it, expect } from 'vitest';
import { CompanyPDFData } from '../../pdf-service';
import { CompanyRecordData } from '../../utils/types';
import { compareCompanyData } from '../../utils/compareData';
import { mockPdfData, mockCompanyData } from '../fixtures/fixtures';

describe('compareData Tests', () => {
  it('returns no differences when pdfData matches companyData exactly', () => {
    const result = compareCompanyData(mockPdfData, mockCompanyData);
    expect(result.differences).toEqual({});
  });

  it('identifies differences when pdfData and companyData differ', () => {
    const modifiedPdfData = { ...mockPdfData, 'Location': 'New York' };
    const result = compareCompanyData(modifiedPdfData, mockCompanyData);
    expect(result.differences).toEqual({ Location: { database: 'San Francisco', pdf: 'New York' } });
  });

  it('handles missing fields in pdfData correctly', () => {
    const partialPdfData: CompanyPDFData = { ...mockPdfData };
    delete partialPdfData['Company Name'];
    delete partialPdfData['Industry'];

    const result = compareCompanyData(partialPdfData, mockCompanyData);

    expect(result.differences).toEqual({
      'Company Name': { database: 'TechCorp', pdf: '' },
      Industry: { database: 'Technology', pdf: '' }
    });
  });

  it('handles missing fields in companyData correctly', () => {
    const partialCompanyData: CompanyRecordData = { ...mockCompanyData };
    delete partialCompanyData['Market Capitalization'];
    delete partialCompanyData['Revenue (in millions)'];

    const result = compareCompanyData(mockPdfData, partialCompanyData);

    expect(result.differences).toEqual({
      'Market Capitalization': { database: '', pdf: '5000' },
      'Revenue (in millions)': { database: '', pdf: '1500' }
    });
  });
});
