import { describe, it, expect } from 'vitest';
import { Request, Response } from 'express';
import { Readable } from 'stream';
import { uploadPDF } from '../../controllers/pdfController';

describe('PDF Upload Controller Tests', () => {

    it('should respond with 400 when no file is uploaded', async () => {
        const req = { file: undefined } as Partial<Request>;
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).toBe(400);
                return res as Response;
            },
            send: (message: string) => {
                expect(message).toBe('No file uploaded.');
                return res as Response;
            }
        } as Partial<Response>;

        await uploadPDF(req as Request, res as Response);
    });

    it('should respond with 500 when the file is corrupted', async () => {
        const req = {
            file: {
                filename: 'sample.name',
                originalname: 'sample.name',
                mimetype: 'sample.type',
                path: 'sample.url',
                fieldname: 'test',
                size: 0,
                destination: 'test',
                buffer: Buffer.from('whatever'),
                encoding: 'utf8',
                stream: new Readable()
            },
            headers: {
                'x-api-key': 'TEST_KEY'
            }
        } as Partial<Request>;

        const res = {
            status: (statusCode: number) => {
                expect(statusCode).toBe(500);
                return res as Response;
            },
            send: (message: string) => {
                expect(message).toBe('An error occurred: Cannot extract data. Invalid file provided.');
                return res as Response;
            }
        } as Partial<Response>;

        await uploadPDF(req as Request, res as Response);
    });

});