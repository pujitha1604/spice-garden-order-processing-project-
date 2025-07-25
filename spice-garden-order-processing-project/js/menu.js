// Write code for fetching menu details using Axios API
document.addEventListener('DOMContentLoaded', fetchMenu);

function fetchMenu() {
    axios.get('menu.json')
        .then(response => {
            displayMenu(response.data.menu);
        })
        .catch(error => console.error('error fetching menu:', error));
}

function displayMenu(menuItems) {
    const menuTableBody = document.querySelector('#menuTable tbody');
    menuTableBody.innerHTML = ''; 

    menuItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.itemName}</td>  
            <td>${item.price}</td>
        `;
        menuTableBody.appendChild(row);
    });
}

function filterMenu() {
    const category = document.getElementById('categoryFilter').value;

    axios.get('menu.json')  // Fetch menu again for filtering
        .then(response => {
            const menuItems = response.data.menu;
            const filteredItems = category === 'All' ? menuItems : menuItems.filter(item => item.category === category);
            displayMenu(filteredItems);
        })
        .catch(error => console.error('Error filtering menu:', error));
}

