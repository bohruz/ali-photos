const scrape = require("aliexpress-product-scraper");
const download = require("image-downloader");

const saveImage = (url, path) => {
  options = {
    url: url,
    dest: path, // will be saved to /path/to/dest/photo.jpg
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
    })
    .catch((err) => console.error(err));
};

// Product ID
const product = scrape("4000299536893");

product.then((res) => {
  let count = 0;
  res.feedback.forEach((feedback) => {
    feedback.photos.forEach((photo) => {
      saveImage(photo, `./imagens/imagem - ${count++}.jpeg`);
    });
  });

  console.log(`${count} Images was saved`);
});
