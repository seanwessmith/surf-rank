// import { useContext } from 'react';

// import { SurfContext } from '../store/surfContext';

const surflineFetch = async (path: string, qs?: any): Promise<any> => {
  const accessToken = 'c2cc8bbfc42dfda99b3a4020bc17707431ec81bb';
  // const { accessToken } = useContext(SurfContext); 
  const baseUrl = 'https://services.surfline.com/kbyg';
  const querystring = qs ? JSON.parse(JSON.stringify(qs)) : undefined;
  const params = new URLSearchParams(querystring).toString();
  const url = params ? `${baseUrl}/${path}?${params}&accesstoken=${accessToken}` : `${baseUrl}/${path}?accesstoken=${accessToken}`;
  return await fetch(url).then(r => r.json());
}

export default surflineFetch;
