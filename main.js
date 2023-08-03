const galleryImages = [
    { 
        src: "./assets/gallery/image1.jpg",
        alt: "image One"
    },
    { 
        src: "./assets/gallery/image2.jpg",
        alt: "image two"
    },
    { 
        src: "./assets/gallery/image3.jpg",
        alt: "image three"
    }
];
const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ];

//toggle a menu section
function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function() {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    document.querySelector("#close-nav-menu").addEventListener("click", function() {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}


//temprature conversion to fahranite
function celsiuseToFahr(temprature){
    let fahr = (temprature * 9/5) + 32;
    return fahr;
}
//greeting section
function greetingHandler() {
    let greetingText;
    let currentHour = new Date().getHours();

if (currentHour < 12) {
    greetingText = "Good Morning!";
} else if (currentHour < 19) {
    greetingText = "Good Afternoon!"
} else if (currentHour < 24) {
    greetingText = "Good Evening!"
} else {
    greetingText = "Welcome!"
}
const weatherCondition = "sunny";
const userLocation = "Addis Ababa";
let temprature = 25;
let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it’s ${temprature.toFixed(1)}C outside.`;
let fahraniteText = `The weather is ${weatherCondition} in ${userLocation} and it’s ${celsiuseToFahr(temprature).toFixed(1)}F outside.`;
document.querySelector("#greeting").innerHTML = greetingText;
document.querySelector("p#weather").innerHTML = celsiusText;

document.querySelector(".weather-group").addEventListener("click", function(e){
    if (e.target.id == "celsius") {
        document.querySelector("p#weather").innerHTML = celsiusText;
    } else if(e.target.id == "fahr") {
        document.querySelector("p#weather").innerHTML = fahraniteText;
    }
})
}

//Date and Time section
function clockHandler() {
setInterval(function(){
    let localTime = new Date();
    document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0");
}, 1000)
}

//Gallary section
function galleryHandler() {

let heroImge = document.querySelector("#gallery > img");
let thumbnails = document.querySelector("#gallery .thumbnails");
heroImge.src = galleryImages[0].src;
heroImge.alt = galleryImages[0].alt;
galleryImages.forEach(function(image, index) {
    let thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = image.alt;
    thumb.dataset.arrayIndex = index;
    thumb.dataset.selected = index === 0 ? true : false;
    thumb.addEventListener("click", function(e) {
        let selectedIndex = e.target.dataset.arrayIndex;
        let selectedImage = galleryImages[selectedIndex];
        heroImge.src = selectedImage.src;
        heroImge.alt = selectedImage.alt;
        thumbnails.querySelectorAll("img").forEach(function(img){
            img.dataset.selected = fales;
        });
        e.target.dataset.selected = true;
    });
    thumbnails.appendChild(thumb);
});
}
function populateProduct(productList) {
    let productSection = document.querySelector(".products-area");
    productSection.textContent = "";
      //run loop through the products
      productList.forEach(function(product, index){
        let productElemnt = document.createElement("div");
        productElemnt.classList.add("product-item");
        //create the product image
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image for " + product.title;

        //product details
        let productDetail = document.createElement("div");
        productDetail.classList.add("product-details");
          //create product title
          let productTitle = document.createElement("h3");
          productTitle.classList.add("product-title");
          productTitle.textContent = product.title;

          let productAutor = document.createElement("p");
          productAutor.classList.add("product-author");
          productAutor.textContent = product.author;

          let productPriceTitle = document.createElement("p");
          productPriceTitle.classList.add("price-title");
          productPriceTitle.textContent = "Price";

          let productPrice = document.createElement("p");
          productPrice.classList.add("product-price");
          productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";

          //Add element to product title
          productDetail.append(productTitle);
          productDetail.append(productAutor);
          productDetail.append(productPriceTitle);
          productDetail.append(productPrice);

        //Add all chiled HTML elements of the product
        productElemnt.append(productImage);
        productElemnt.append(productDetail);
        productSection.append(productElemnt);
    });

}

//function product handler
function productHandler(){
    
    let freeProducts = products.filter(function(product){
        return !product.price || product.price <= 0;
    });
    let paidProducts = products.filter(function(product){
        return product.price > 0;
    });
    populateProduct(products)
  
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;
    
    let productFilter = document.querySelector(".products-filter");
    productFilter.addEventListener("click", function(e){
        if(e.target.id === "app"){
            populateProduct(products);
        } else if(e.target.id === "paid"){
            populateProduct(paidProducts);
        } else if(e.target.id === "free"){
            populateProduct(freeProducts);
        } 
    })
}

//footer handler
function footerHandler() {
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `Ⓒ ${currentYear} - All rights reserved`;
}
//page Lode
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productHandler();
footerHandler();