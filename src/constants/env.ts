import dotenv from 'dotenv';
import * as url from 'url';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || 'localhost';

export const DB_URL = url.parse(process.env.DB_URL || '');

export const DB_HOST = process.env.DB_HOST || DB_URL.hostname || 'localhost';
export const DB_PORT = process.env.DB_PORT || DB_URL.port || '5432';
export const DB_NAME = process.env.DB_NAME || DB_URL.pathname?.substr(1) || 'postgres';
export const DB_USER = process.env.DB_USER || DB_URL.auth?.split(':')[0] || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || DB_URL.auth?.split(':')[1] || 'postgres';
