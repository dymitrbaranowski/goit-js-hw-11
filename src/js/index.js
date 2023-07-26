import { fetchImages } from '../js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');


btnLoadMore.style.display = 'none';

let pageNumber = 1;

btnSearch.addEventListener('click', async e => {
  e.preventDefault();
  cleanGallery();
  const trimmedValue = input.value.trim();
    if (!trimmedValue) {
        return;
     }
  try {
         const {hits, totalHits}= await fetchImages(trimmedValue, pageNumber);
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImageList(hits);
        Notiflix.Notify.success(
          `Hooray! We found ${totalHits} images.`
        );
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    
  } catch (e) {
    console.error(e);
     }
    
});

btnLoadMore.addEventListener('click', async () => {
  pageNumber++;
  const trimmedValue = input.value.trim();
  btnLoadMore.style.display = 'none';
  
    const { hits, totalHits } = await fetchImages(trimmedValue, pageNumber);
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (Math.floor([...totalHits / 40 ]) === pageNumber) {
      btnLoadMore.style.display = 'none';
       return Notiflix.Notify.info(
         "We're sorry, but you've reached the end of search results."
       );
    }
    
    else {
       renderImageList(hits);
      Notiflix.Notify.success(
        `Hooray! We found ${totalHits} images.`
      );
      btnLoadMore.style.display = 'block';
    }
 
    
  });


function renderImageList(images) {
  console.log(images, 'images');
  const markup = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card">

       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>

        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML  += markup;
   
}

gallery.insertAdjacentHTML('beforeend', renderImageList()) 


function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}
