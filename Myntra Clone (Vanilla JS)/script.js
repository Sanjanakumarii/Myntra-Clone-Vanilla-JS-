// Sample Product Data
const products = [
  {id:1,name:"Men T-Shirt",category:"men",price:499,img:"https://via.placeholder.com/200x200?text=Men+T-Shirt"},
  {id:2,name:"Women Dress",category:"women",price:899,img:"https://via.placeholder.com/200x200?text=Women+Dress"},
  {id:3,name:"Kids Shoes",category:"kids",price:699,img:"https://via.placeholder.com/200x200?text=Kids+Shoes"},
  {id:4,name:"Men Jeans",category:"men",price:1299,img:"https://via.placeholder.com/200x200?text=Men+Jeans"},
  {id:5,name:"Women Top",category:"women",price:599,img:"https://via.placeholder.com/200x200?text=Women+Top"},
  {id:6,name:"Kids T-Shirt",category:"kids",price:399,img:"https://via.placeholder.com/200x200?text=Kids+T-Shirt"}
];

const productGrid = document.getElementById("product-grid");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function displayProducts(data) {
  productGrid.innerHTML = "";
  data.forEach(prod=>{
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>₹${prod.price}</p>
      <button onclick="addToCart(${prod.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p=>p.id===id);
  cart.push(product);
  localStorage.setItem("cart",JSON.stringify(cart));
  cartCount.textContent = cart.length;
}

// Filter Products
filterBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const category = btn.getAttribute("data-category");
    if(category==="all"){
      displayProducts(products);
    }else{
      const filtered = products.filter(p=>p.category===category);
      displayProducts(filtered);
    }
  });
});

// Search Products
searchInput.addEventListener("input",()=>{
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(query));
  displayProducts(filtered);
});

// Initialize
displayProducts(products);
cartCount.textContent = cart.length;
