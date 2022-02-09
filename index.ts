
type StoreItem = {
  id: string
  name: string
  price: number
}

type CartItem = {
  id: string
  quantity: number
}

let state: {
  items: StoreItem[]
  cart: CartItem[]
} = {
  items: [],
  cart: []
}

function getFileName(item: StoreItem) {
  const fileName = `${item.id
    .toString()
    .padStart(3, '0')}-${item.name.replaceAll(' ', '-')}`

  return `assets/icons/${fileName}.svg`
}

/* STATE ACTIONS */

function addItemToCart(cart: CartItem) {
  const existingItem = state.cart.find(item => item.id == cart.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    const itemToAdd = state.items.find(item => item.id == cart.id)

    state.cart.push({ ...itemToAdd, quantity: 1 })
  }

  renderCartItems()
}

function removeItemFromCart(cart: CartItem) {
  const itemToUpdate = state.cart.find(item => item.id == cart.id)

  if (itemToUpdate && itemToUpdate.quantity > 1) {
    itemToUpdate.quantity -= 1
  } else {
    state.cart = state.cart.filter(item => item.id != cart.id)
  }

  renderCartItems()
}

/* RENDER THE STORE */

const storeItemList = document.querySelector('.store--item-list')

function renderStoreItem(item) {
  const listItemEl = document.createElement('li')

  listItemEl.innerHTML = `
    <div class="store--item-icon">
      <img src=${getFileName(item)} alt="${item.name}">
    </div>
    <button>Add to cart</button>
  `

  const addBtn = listItemEl.querySelector('button')
  addBtn.addEventListener('click', () => addItemToCart(item.id))

  storeItemList.appendChild(listItemEl)
}

function renderStoreItems() {
  state.items.forEach(renderStoreItem)
}

renderStoreItems()

/* RENDER THE CART */

const cartItemList = document.querySelector('.cart--item-list')

function renderCartItem(item) {
  const listItemEl = document.createElement('li')

  listItemEl.innerHTML = `
    <img class="cart--item-icon" src=${getFileName(item)} alt="${item.name}">
    <p>${item.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  `

  const addBtn = listItemEl.querySelector('.add-btn')
  addBtn.addEventListener('click', event => addItemToCart(item.id))

  const removeBtn = listItemEl.querySelector('.remove-btn')
  removeBtn.addEventListener('click', event => removeItemFromCart(item.id))

  cartItemList.appendChild(listItemEl)
}

function renderCartItems() {
  cartItemList.innerHTML = ''

  state.cart.forEach(renderCartItem)

  renderTotal()
}

/* RENDER THE TOTAL */

const totalNumber = document.querySelector('.total-number')

function renderTotal() {
  let total = 0

  state.cart.forEach(item => (total += item.quantity * item.price))

  totalNumber.innerText = `£${total.toFixed(2)}`
}
