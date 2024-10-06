document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Product added to cart!');
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.add-to-cart');
    const quantityInput = document.getElementById('quantity');

    addToCartButton.addEventListener('click', () => {
        const quantity = quantityInput.value;
        alert(`Added ${quantity} Apple iPhone 16 to cart!`);
        // Здесь можно добавить код для фактического добавления товара в корзину
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceElement = document.getElementById('total');

    cartItems.forEach(item => {
        const plusButton = item.querySelector('.plus');
        const minusButton = item.querySelector('.minus');
        const removeButton = item.querySelector('.remove');
        const countElement = item.querySelector('.count');
        let quantity = parseInt(countElement.textContent, 10);
        const price = 1402.00; // Пример цены товара

        // Обновление итоговой цены
        function updateTotal() {
            let total = 0;
            cartItems.forEach(item => {
                const count = parseInt(item.querySelector('.count').textContent, 10);
                total += count * price; // Рассчитываем итог на основе количества и цены
            });
            totalPriceElement.textContent = `$${total.toFixed(2)}`;
        }

        // Увеличение количества товара
        plusButton.addEventListener('click', function() {
            quantity++;
            countElement.textContent = quantity;
            updateTotal();
        });

        // Уменьшение количества товара
        minusButton.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                countElement.textContent = quantity;
                updateTotal();
            }
        });

        // Удаление товара из корзины
        removeButton.addEventListener('click', function() {
            item.remove();
            updateTotal();
        });
    });
});
setTimeout(() => {
    window.location.href = "index.html"; // Переход на главную страницу
}, 3000); // Время в миллисекундах (3 секунды)
// Проверяем наличие корзины в localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для добавления товара в корзину
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Проверяем, есть ли такой товар в корзине
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // Если товар уже есть, увеличиваем его количество
    } else {
        cart.push(product); // Добавляем новый товар в корзину
    }

    // Сохраняем обновлённую корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} добавлен в корзину!`);
}

// Отображаем корзину на странице cart.html
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    // Очищаем контейнер перед обновлением
    cartContainer.innerHTML = '';
    let total = 0;

    // Добавляем каждый товар из корзины
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>Цена: ${item.price} $</p>
            <p>Количество: ${item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Удалить</button>
        `;
        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalContainer.textContent = `Итого: ${total.toFixed(2)} $`;
}

// Удаление товара из корзины
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    alert(`${productName} удалён из корзины!`);
}
