import itemObjects from './data.js'

const itemsDisplay = document.querySelector('.items');
const ordersDisplay = document.querySelector('.orders');
const modalDisplay = document.querySelector('.modal');
const modalForm = document.querySelector('.modal-form');
const orderCompletionDisplay = document.querySelector('.order-completion');
orderCompletionDisplay.style.display = 'none';
let orderObj = null;


const getStrFromArr = (arr) => {
    return arr.join(', ');
}


const createItemHtml = (item) => { 
    return `
        <article class="item">
            <p class="item-img">${item.emoji}</p>
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${getStrFromArr(item.ingredients)}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <button class="item-btn" data-uuid=${item.id}>+</button>
        </article>
    `;
}


const displayItemsHtml = (items) => { 
    itemsDisplay.innerHTML = items.map(createItemHtml).join('');
}


const getObjById = (id) => { 
    return itemObjects.find(item => item.id === Number(id));
}


const createItemOrderHtml = (item, amount) => { 
    return `
        <div class="order">
            <p class="order-name">
                ${item.name}
                <span class="remove" data-uuid=${item.id}>remove</span>
            </p>
            <p class="order-price">$${item.price * amount}</p>
        </div>
    `;
}


const createOrderHtml = (obj) => { 
    let html = '';
    for (let key in obj) {
        const item = getObjById(key);
        html += createItemOrderHtml(item, obj[key]);
    }

    return html;
}


const createTotalOrderHtml = (obj) => { 
    let total = 0;
    for (let key in obj) {
        const item = getObjById(key);
        total += item.price * obj[key];
    }

    return `
        <div class="total">
            <p class="order-name">Total price:</p>
            <p class="order-price">$${total}</p>
        </div>
    `;
}


const displayOrderHtml = (obj) => { 
    if (!obj || Object.keys(obj).length === 0) return ordersDisplay.style.display = 'none';

    const html = `
        <h2>Your order</h2>
            <div class="orders-list">
                <div class="order-container">
                    ${createOrderHtml(obj)}
                </div>
                ${createTotalOrderHtml(obj)}
            </div>
            <button class="order-btn">
                Complete Order
            </button>
    `;

    orderCompletionDisplay.style.display = 'none';
    ordersDisplay.style.display = 'block';
    ordersDisplay.innerHTML = html;
}


const addToOrder = (item) => {
    if (!orderObj) {
        orderObj = {};
        orderObj[item.id] = 1;
    } else {
        if (orderObj[item.id]) {
            // orderObj[item.id]++;
        } else {
            orderObj[item.id] = 1;
        }
    }

    displayOrderHtml(orderObj);
}


const removeFromOrder = (id) => {
    delete orderObj[id];
    displayOrderHtml(orderObj);
}


const completeOrderDisplay = () => { 
    modalDisplay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}


modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(modalForm);
    const name = formData.get("name");

    orderCompletionDisplay.style.display = 'block';
    orderCompletionDisplay.innerHTML = `
        <p>Thanks, ${name}! Your order is on its way!</p>
    `;
    
    modalDisplay.style.display = "none";
    document.body.style.overflow = "auto";
    orderObj = null;
    displayOrderHtml(orderObj);
})


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('item-btn')) {
        addToOrder(getObjById(e.target.dataset.uuid));
    } else if (e.target.classList.contains('order-btn')) {
        completeOrderDisplay()
    } else if (e.target.classList.contains('remove')) {
        removeFromOrder(e.target.dataset.uuid);
    }
})
 

displayItemsHtml(itemObjects);