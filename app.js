let showContactContainer = document.getElementById('showContactContainer')

if (localStorage.getItem('contacts') == undefined || localStorage.getItem('contacts') == null) {
    localStorage.setItem('contacts', '[]')
}
else {
    showContact()
}
function submitContact(e) {
    e.preventDefault()
    let contact_name = document.getElementById('name').value
    let contact_number = document.getElementById('number').value
    let contacts = JSON.parse(localStorage.getItem('contacts'))
    let contact = {
        id:Math.random().toString(36).substr(2,10),
        name: contact_name,
        phone: contact_number
    }
    contacts.push(contact)
    localStorage.setItem('contacts', JSON.stringify(contacts))
    document.getElementById('name').value = ''
    document.getElementById('number').value = ''
    showContact()

}

// Show Contact 
function showContact() {
    let contacts = JSON.parse(localStorage.getItem('contacts'))
    
    let html = '';
    contacts.forEach(contact => {
        var content = `<div class="col-12 my-2 contactBox">
                <div class="contactInfo">
                    <i class="fa fa-user"></i>
                    <div >
                        <h5>${contact.name}</h5>
                        <h6>${contact.phone}</h6>
                    </div>
                </div>
                <div class="updel">
                    <i class="fa fa-trash" onclick="deleteItem('${contact.id}')" id="delete"></i>
                    <i class="fa fa-refresh" onclick="updateItem('${contact.id}')" id="update"></i>
                </div>
            </div>

            </div>`

        html += content
    });
    showContactContainer.innerHTML = html
}

// Delete Contact 
function deleteItem(id) {
    let contacts = JSON.parse(localStorage.getItem('contacts'))
    contacts = contacts.filter(value =>{
        return value.id != id
    })
    localStorage.setItem('contacts', JSON.stringify(contacts))
    location.reload();
}

// Update Contact 
function updateItem(id) {
    let contacts = JSON.parse(localStorage.getItem('contacts'))
    contacts = contacts.filter(value=>{
        if (value.id == id) {
            let contactVal = value
            let contact_name = document.getElementById('name')
            let contact_number = document.getElementById('number')
            contact_name.value = value.name
            contact_number.value = value.phone

        }
        return value.id != id
    });
    localStorage.setItem('contacts', JSON.stringify(contacts))
    location.reload();
}