const api = {

  getGifs() {
    const url = 'https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=10';
    return fetch(url).then((res) => res.json());
  }
};

export default api;