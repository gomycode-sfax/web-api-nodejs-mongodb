
// get all
fetch('http://localhost:5000/contacts')
    .then(res => res.json())
    .then(result => {
        console.log(result);
        result.forEach(item => {
            document.getElementById('data').innerHTML += '<div class="item"><h2>' + item.name + '</h2>' + '<p>' + item.phone + '</p></div>';
        })
    })
    .catch(err => console.log(err))

// add a contact to the database
document.getElementById("form").addEventListener('submit', addContact);
function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    axios.post('http://localhost:5000/contacts', { name: name, phone: phone, email: email })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
