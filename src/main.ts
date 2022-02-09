import './style.css'

type StoreItem = {
  id: number
  name: string
  price: number
  quantity: number

}

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number

}

type State = {
  items: StoreItem[]
  cart: CartItem[]
}

const state: State = {
  items: [
    {
      id: 1,
      name: 'beetroot',
      price: 0.35,
      quantity: 0
    },
    {
      id: 2,
      name: 'carrot',
      price: 0.35,
      quantity: 0
    },
    {
      id: 3,
      name: 'apple',
      price: 0.35,
      quantity: 0
    },
    {
      id: 4,
      name: 'apricot',
      price: 0.35,
      quantity: 0
    },
    {
      id: 5,
      name: 'avocado',
      price: 0.35,
      quantity: 0
    },
    {
      id: 6,
      name: 'bananas',
      price: 0.35,
      quantity: 0
    },
    {
      id: 7,
      name: 'bell pepper',
      price: 0.35,
      quantity: 0
    },
    {
      id: 8,
      name: 'berry',
      price: 0.35,
      quantity: 0
    },
    {
      id: 9,
      name: 'blueberry',
      price: 0.35,
      quantity: 0
    },
    {
      id: 10,
      name: 'eggplant',
      price: 0.35,
      quantity: 0
    }
  ],
  cart: []
}

function getFileName(item: CartItem): string {
  const fileName: string = `${item.id
    .toString()
    .padStart(3, '0')}-${item.name.replaceAll(' ', '-')}`

  return `assets/icons/${fileName}.svg`
}

/* STATE ACTIONS */

function addItemToCart(cart: CartItem): void {
  const existingItem = state.cart.find(item => item.id == cart.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    const itemToAdd: StoreItem | undefined = state.items.find(item => item.id == cart.id)
    if (itemToAdd)
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

function renderStoreItem(item: CartItem): void {
  const listItemEl = document.createElement('li')

  listItemEl.innerHTML = `
    <div class="store--item-icon">
      <img src=${getFileName(item)} alt="${item.name}">
    </div>
    <button>Add to cart</button>
  `

  const addBtn = listItemEl.querySelector('button')
  if (addBtn)
    addBtn.addEventListener('click', () => addItemToCart(item))


  if (storeItemList)
    storeItemList.appendChild(listItemEl)

}

function renderStoreItems() {
  state.items.forEach(renderStoreItem)
}

renderStoreItems()

/* RENDER THE CART */

const cartItemList = document.querySelector('.cart--item-list')

function renderCartItem(item: CartItem) {
  const listItemEl = document.createElement('li')

  listItemEl.innerHTML = `
    <img class="cart--item-icon" src=${getFileName(item)} alt="${item.name}">
    <p>${item.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  `

  const addBtn = listItemEl.querySelector('.add-btn')
  if (addBtn)
    addBtn.addEventListener('click', event => addItemToCart(item))

  const removeBtn = listItemEl.querySelector('.remove-btn')
  if (removeBtn)
    removeBtn.addEventListener('click', event => removeItemFromCart(item))
  if (cartItemList)
    cartItemList.appendChild(listItemEl)
}

function renderCartItems() {
  if (cartItemList)
    cartItemList.innerHTML = ''

  state.cart.forEach(renderCartItem)

  renderTotal()
}

/* RENDER THE TOTAL */

const totalNumber = document.querySelector('.total-number')

function renderTotal() {
  let total = 0

  state.cart.forEach(item => (total += item.quantity * item.price))
  if (totalNumber)
    totalNumber.innerHTML = `£${total.toFixed(2)}`
}
