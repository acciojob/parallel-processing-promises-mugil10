const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {
  return new Promise(function(resolve, reject) {
    const img = new Image();

    img.onload = function() {
      resolve(img);
    };

    img.onerror = function() {
      reject(new Error("Failed to download image: " + url));
    };

    img.src = url;
  });
}

function downloadImages() {
  output.innerHTML = "";
  error.innerHTML = "";
  loading.style.display = "block";

  const promises = images.map(function(image) {
    return downloadImage(image.url);
  });

  Promise.all(promises)
    .then(function(downloadedImages) {
      loading.style.display = "none";

      downloadedImages.forEach(function(img) {
        output.appendChild(img);
      });
    })
    .catch(function(err) {
      loading.style.display = "none";
      error.textContent = err.message;
    });
}

btn.addEventListener("click", downloadImages);