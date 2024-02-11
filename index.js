import itemObjects from './data.js'

const itemsDisplay = document.querySelector('.items');

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
            <button class="item-btn">+</button>
        </article>
    `;
}

const displayItems = (items) => { 
    itemsDisplay.innerHTML = items.map(createItemHtml).join('');
}

displayItems(itemObjects);