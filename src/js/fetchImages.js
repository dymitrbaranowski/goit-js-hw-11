import axios from 'axios';

axios.defaults.headers.common['key'] = '38440528-27ad43a15fe64cab61d6047d1';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (inputValue, pageNr) => {
  return axios.get(
    `/q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}/`
  )
    .then(async response => {
      if (response.status !== 200) {
        if (response.status !== 200) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.data;
    })
    .catch(error => {
      console.error(error);
    });
};
