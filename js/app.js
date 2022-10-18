// Variables
const cart = document.querySelector('#cart');
const cartContainer = document.querySelector('#list-cart tbody');
const clearCartBtn = document.querySelector('#clear-cart');
const phonesList = document.querySelector('#list-phones');
let itemsCart = [];

// Listener
eventListeners();
function eventListeners() {
  phonesList.addEventListener('click', getPhone);
  clearCartBtn.addEventListener('click', clearCart);
  cart.addEventListener('click', deletePhone);
}

// Functions

// Get phone data from html
function getPhone(e) {
  if (e.target.classList.contains('add-cart')) {
    const selectedPhone = e.target.parentElement.parentElement;
    readPhoneData(selectedPhone);
  }
}

// Read and put data into an object
function readPhoneData(phone) {
  const phoneData = {
    id: phone.querySelector('a').getAttribute('data-id'),
    image: phone.querySelector('img').src,
    title: phone.querySelector('h4').textContent,
    price: phone.querySelector('.price span').textContent,
    quantity: 1
  }

  // Check if the phone exist
  const exist = itemsCart.some(phone => phone.id === phoneData.id);

  if (exist) {
    // If it exists, only the quantity is updated
    const phones = itemsCart.map(phone => {
      if (phone.id === phoneData.id) {
        phone.quantity++;
      }
      return phone;
    })
    itemsCart = [...phones];
  } else {
    // If not, added it to cart
    itemsCart = [...itemsCart, phoneData];
  }

  // Insert the list on the HTML
  setPhone();
}

function setPhone() {
  clearCart();
  itemsCart.forEach( phone => {
    const {
      id,
      image,
      title,
      price,
      quantity
    } = phone;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img
        src="${image}"
        alt="${image}"
        width="100">
      </td>
      <td>
        ${title}
      </td>
      <td>
        ${price}
      </td>
      <td>
        ${quantity}
      </td>
      <td>
        <iconify-icon
        icon="akar-icons:circle-x"
        style="color: red; align-content: center"
        data-id="${id}"
        class="delete"
        ></iconify-icon>
      </td>
    `;

    cartContainer.appendChild(row);
  })
}

function deletePhone(e) {
  if (e.target.classList.contains('delete')) {
    const phoneId = e.target.getAttribute('data-id')
    itemsCart = itemsCart.filter(phone => phone.id !== phoneId);
    setPhone();
  }
}

function clearCart() {
  while(cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}
