import { isHomologacao, isLocalHost } from 'std/url';

const http = isLocalHost() ? 'http' : 'https';

const URL_PROD = 'https://api.tecno.mobi';
const URL_SAND = `${http}://sandbox.tecno.mobi`;
//const URL_SAND = `${http}://localhost:100`;

const url = isHomologacao() ? URL_SAND : URL_PROD;
export const baseURL = `${url}/api/v1`;
