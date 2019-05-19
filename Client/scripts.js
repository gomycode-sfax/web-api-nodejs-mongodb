// import axios from 'axios';

// get all
fetch('http://localhost:4000/contacts')
    .then(res => res.json())
    .then(result => {
        console.log(result);
        result.forEach(item => {
            document.getElementById('data').innerHTML += '<div class="item"><h2>' + item.name + '</h2>' + '<p>' + item.phone + '</p></div>';
        })
    })
    .catch(err => console.log(err))

document.getElementById("form").addEventListener('submit', addContact);

function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    axios.post('http://localhost:4000/contacts', { name: name, phone: phone })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}


// //add a contact
// axios.post('http://localhost:4000/contacts', {name: "abc 6", phone: "007 6"})
//  .then(res => console.log(res))
//  .catch(err => console.log(err))