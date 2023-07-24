import axios from 'axios';


axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '38440528-27ad43a15fe64cab61d6047d1';

export const fetchImages = async (inputValue, pageNr) => {
  const { data } = await axios.get(
    `?key=${KEY}&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`
  );
    return data;
}
