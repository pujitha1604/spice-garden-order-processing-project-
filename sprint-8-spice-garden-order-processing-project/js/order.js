// Write JS code to dynamically add order form fields 
// Write JS function to submit and persist the order details using Axios API

document.addEventListener('DOMContentLoaded', function() {
    const orderItemsContainer = document.getElementById('orderItemsContainer');
    let orderItems = [];
    let totalAmount = 0;


    function addOrderItem() {
        const itemIndex = orderItems.length;
        const newRow = document.createElement('div');
        newRow.classList.add('order-item-row');

        newRow.innerHTML = `
        <div><input type="text" id="categoryName_${itemIndex}" placeholder="Enter category"></div>
        <div><input type="text" id="itemName_${itemIndex}" placeholder="Enter item name"></div>
        <div><input type="number" id="itemPrice_${itemIndex}" placeholder="Enter price" oninput="updateTotalAmount(${itemIndex})"></div>
        <div><input type="number" id="itemQuantity_${itemIndex}" placeholder="Enter quantity" oninput="updateTotalAmount(${itemIndex})"></div>
        <div><span id="subtotal_${itemIndex}">0</span></div>
        <div><button class="remove-btn" onclick="removeOrderItem(${itemIndex})">Remove</button></div>
    `;

    orderItemsContainer.appendChild(newRow);

        // Add an object to store item details
        orderItems.push({
            categoryName: '',
            itemName: '',
            itemPrice: 0,
            itemQuantity: 0,
            subtotal: 0
        });
    }

    function removeOrderItem(itemIndex) {
        const row = document.querySelector(`#orderItemsContainer .order-item-row:nth-child(${itemIndex + 1})`);
        if (row) {
            row.remove();
            orderItems.splice(itemIndex, 1);
            document.querySelectorAll(`#orderItemsContainer .order-item-row`).forEach((row, index) => {
                row.querySelector('.remove-btn').setAttribute('onclick', `removeOrderItem(${index})`);
                row.querySelectorAll('input, span').forEach(el => {
                    const id = el.id;
                    if (id) {
                        el.id = id.replace(/\d+$/, index);
                    }
                });
            });

            updateTotalAmount();
        }
    }

    // Function to update the total amount
    function updateTotalAmount() {
        totalAmount = 0;

        orderItems.forEach((item, index) => {
            const itemPrice = parseFloat(document.getElementById(`itemPrice_${index}`).value) || 0;
            const itemQuantity = parseFloat(document.getElementById(`itemQuantity_${index}`).value) || 0;

            const subtotal = itemPrice * itemQuantity;
            document.getElementById(`subtotal_${index}`).textContent = subtotal;

            // Update the item details in the array
            orderItems[index].categoryName = document.getElementById(`categoryName_${index}`).value;
            orderItems[index].itemName = document.getElementById(`itemName_${index}`).value;
            orderItems[index].itemPrice = itemPrice;
            orderItems[index].itemQuantity = itemQuantity;
            orderItems[index].subtotal = subtotal;

            // Accumulate the total amount
            totalAmount += subtotal;
        });
        document.getElementById('totalAmount').textContent = totalAmount;
    }


    // Function to submit the order using Axios
    function submitOrder() {
        const orderDetails = {
            customerName: document.querySelector('input[type="text"]').value,
            emailId: document.querySelector('input[type="email"]').value,
            contactNumber: document.querySelector('input[type="number"]').value,
            orderDate: document.querySelector('input[type="date"]').value,
            address: document.querySelector('input[type="text"]').value,
            items: orderItems,
            totalAmount: totalAmount
        };

        axios.post('http://localhost:3002/order', orderDetails)
            .then(response => {
                console.log('Order saved:', response.data);
                alert(`Total amount to be paid: INR ${totalAmount}\nThe order is eligible for a free soft drink.`);
            })
            .catch(error => {
                console.error('Error saving order:', error);
                alert('Failed to save order.');
            });
    }

    // Expose functions to global scope for HTML to access
    window.addOrderItem = addOrderItem;
    window.updateTotalAmount = updateTotalAmount;
    window.submitOrder = submitOrder;
    window.removeOrderItem = removeOrderItem;

    document.getElementById('addOrderItemBtn').addEventListener('click', addOrderItem);
});
