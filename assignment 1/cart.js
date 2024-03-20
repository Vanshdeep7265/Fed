document.addEventListener("DOMContentLoaded", function() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const cartTable = document.getElementById('cartTable'); 
    let total = 0;
    const totalHeader = document.createElement('th');
    totalHeader.textContent = 'Total';
    cartTable.querySelector('thead tr').appendChild(totalHeader);

    const totalCell3 = document.createElement('td');
    totalCell3.textContent = '$0';
    const totalCell4 = document.createElement('td');
    totalCell4.textContent = ''; 
    const totalCell5 = document.createElement('td');
    totalCell5.textContent = 'Total';
    cartTable.querySelector('thead tr').appendChild(totalCell4);
    cartTable.querySelector('thead tr').appendChild(totalCell5);
    cartTable.querySelector('thead tr').appendChild(totalCell3);

    const productMap = new Map(); 

    btn1.onclick = () => addToCart("Oversize tshirt", 50);
    btn2.onclick = () => addToCart("Bootcut jeans", 70);
    btn3.onclick = () => addToCart("Chelsea boots", 90);

    function addToCart(productName, price) {
        if (!productMap.has(productName)) {
            const newRow = cartTable.querySelector('tbody').insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);

            cell1.textContent = productName;
            cell2.innerHTML = '<button class="plus">+</button><button class="minus">-</button>';
            cell3.textContent = '$0';

            const productDetails = {
                price: price,
                quantity: 0,
                subtotal: 0,
                row: newRow,
                cell: cell3
            };

            productMap.set(productName, productDetails);

            const plusButton = cell2.querySelector('.plus');
            const minusButton = cell2.querySelector('.minus');

            plusButton.onclick = () => updateQuantity(productName, 1);
            minusButton.onclick = () => updateQuantity(productName, -1);
        } else {
            updateQuantity(productName, 1);
        }
    }

    function updateQuantity(productName, change) {
        const productDetails = productMap.get(productName);
        productDetails.quantity += change;
        if (productDetails.quantity < 0) {
            productDetails.quantity = 0;
        }
        productDetails.subtotal = productDetails.quantity * productDetails.price;
        productDetails.cell.textContent = '$' + productDetails.subtotal;

        if (productDetails.quantity === 0) {
            cartTable.querySelector('tbody').deleteRow(productDetails.row.rowIndex);
            productMap.delete(productName);
        }

        updateTotal();
    }

    function updateTotal() {
        let newTotal = 0;
        for (const productDetails of productMap.values()) {
            newTotal += productDetails.subtotal;
        }
        total = newTotal;
        totalCell3.textContent = '$' + total;
    }
});
