const scrape = require("aliexpress-product-scraper");
const download = require("image-downloader");

function getProductID(url) {
  return url.slice(url.search(/[0-9]*.html/), url.search(/.html/));
}

const saveImage = (url, path) => {
  options = {
    url: url,
    dest: path,
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log("Saved to", filename);
    })
    .catch((err) => console.error(err));
};

// Product ID
const productID = getProductID(
  "https://pt.aliexpress.com/item/33043942809.html"
);
const product = scrape(productID);

product.then((res) => {
  let count = 0;
  res.feedback.forEach((feedback) => {
    feedback.photos.forEach((photo) => {
      saveImage(photo, `./imagens/imagem - ${count++}.jpeg`);
    });
  });

  console.log(`${count} Images was saved`);
});
