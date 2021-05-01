import axios from 'axios';

const defaultContentType = 'application/json';
const baseUrl = 'https://pokeapi.co/api/v2/';

interface apiHandlerProps {
  path: string;
  method: string;
  body: {};
  cType: string;
}

export default async (payload: any) => {
  const {path, method, body, cType, header} = payload;

  const url = `${baseUrl}/${path}`;
  const contentType = cType || defaultContentType;

  const headers = {
    ...header,
    'Content-Type': `${contentType}`,
    Accept: `${contentType}`,
  };

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body,
    });

    return response.data;
  } catch {
    return {error: true};
  }
};
