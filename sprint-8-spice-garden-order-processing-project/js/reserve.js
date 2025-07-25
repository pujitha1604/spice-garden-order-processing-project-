// Write JS function to reserve a table, persist the data using Axios API

function handleReservation() {
    // Collect the reservation details from the form
    const reservationDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        people: document.getElementById('people').value,
    };

    // Submit the reservation details using Axios

    reserveTable(reservationDetails);

    // Prevent the form from submitting the traditional way
    return false;
}

function reserveTable(reservationDetails) {
    //The URL of the server endpoint
    axios.post('http://localhost:3001/reservations', reservationDetails) 
        .then(response => {
            console.log('Reservation saved:', response.data);
            // Show a success alert message
            alert("You have successfully booked a table!");
        })
        .catch(error => {
            console.error('Error saving reservation:', error);
            // Show an error alert message if there's an issue
            alert("There was an error booking your table. Please try again.");
        });
}
