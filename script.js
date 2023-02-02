const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash Loader
let count = 5;
const apiKey = 'tIO1HCkMo8zoRbHBvugJa9CqzACdJ-olyApfu3mFOU8';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    }
}

//Function for setting attributes. Try to implement DRY concept!
function setAttributes(item,objAttr){
    for(key in objAttr){
        item.setAttribute(key,objAttr[key]);
    }
}

//Create elements for Links and Photos, Add it to DOM
function displayPhoto(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        //Create <a> to Unsplash link
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        //Create<img> from Unsplash API
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        
        //Event Listener check when each img is loaded
        img.addEventListener('load', imageLoaded);
        //Put the image inside <a> and then inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//Get photos from Unsplash API
async function getPhotoFromUnsplashApi(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhoto();
    }catch(err){
        console.log('Error type is:' + err);
    }
}

//If scroll near bottom of the page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotoFromUnsplashApi()
    }
})

getPhotoFromUnsplashApi();