const scrape = require("aliexpress-product-scraper");
const download = require("image-downloader");

// options = {
//   url: "http://someurl.com/image2.jpg",
//   dest: "/path/to/dest/photo.jpg", // will be saved to /path/to/dest/photo.jpg
// };

// download
//   .image(options)
//   .then(({ filename }) => {
//     console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
//   })
//   .catch((err) => console.error(err));

// const product = scrape("32958933105");
const product = scrape("4001081693957");

let photos = [];
product.then((res) => {
  //   console.log("The JSON: ", res);
  res.feedback.forEach((feedback) => {
    feedback.photos.forEach((photo) => {
      if (photo) photos.push(photo);
    });
  });
  console.log(photos);

  let count = 0;
  photos.forEach((photo) => {
    options = {
      //   url: "http://someurl.com/image2.jpg",
      url: photo,
      dest: `./imagens/imagem - ${count}.jpeg`, // will be saved to /path/to/dest/photo.jpg
    };
    download
      .image(options)
      .then(({ filename }) => {
        console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
      })
      .catch((err) => console.error(err));
    count++;
  });
});
