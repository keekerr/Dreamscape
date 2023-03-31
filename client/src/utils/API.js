const key = process.env.REACT_APP_ACCESS_KEY

export const searchImages = (query) => {
    return fetch(`https://api.unsplash.com/search/?client_id=${key}&photos?page=1&query=${query}`);
};