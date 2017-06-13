import { POOL_DOWNLOAD_SIZE } from './constants';

const api = {

  getGifs(term, offset) {
    const baseSearchUrl = '';
    const publicApiKey = 'dc6zaTOxFJmzC';

    const url = `https://api.giphy.com/v1/gifs/search?q=${term}&api_key=${publicApiKey}&limit=${POOL_DOWNLOAD_SIZE}&offset=${offset}`;

    return fetch(url).then((res) => res.json());
  }
};

export default api;