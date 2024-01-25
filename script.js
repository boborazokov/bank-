const res = document.getElementById('res');
const name = document.getElementById('name');
const surname = document.getElementById('surname')
const age = document.getElementById('age');
const number = document.getElementById('number');
const address = document.getElementById('address');
const submit = document.getElementById('submit');
const addUserForm = document.getElementById('addUserForm')
const users = JSON.parse(localStorage.getItem('user')) ?? [
  {
    name: "Firdavs",
    surname: "Rustamov",
    age: 20,
    number: 915682148,
    addres: "Jizzax",
    time: new Date().getTime()
  },

  {
    name: "Javohir",
    surname: "Rustamov",
    age: 18,
    number: 905383057,
    addres: "Jizzax",
    time: new Date().getTime()
    
  },
]
addUserForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if(
    name.value.trim() == "" ||
    surname.value.trim() == "" ||
    age.value.trim() == "" ||
    number.value.trim() == "" ||
    address.value.trim() == "" 
  ) {
    alert('Enter Full Information')
  }
  else {
    users.push({
      name: name.value,
      surname: surname.value,
      age: age.value,
      number: number.value,
      addres: address.value,
      time: new Date().getTime()

    });
    showresults(users);
    name.value = "";
    surname.value = "";
    age.value = "";
    number.value = "";
    address.value = "";
  }
});
function dateHandler(vaqt) {
  var year = new Date(vaqt).getFullYear();
  var month = new Date(vaqt).getMonth() +1;
  var day = new Date(vaqt).getDate();
  return `${day}.${month}.${year}`
}

function showresults(arr) {
  localStorage.setItem('user', JSON.stringify(users));
  res.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    res.innerHTML += `
    <tr>
    <td>${i + 1}</td>
    <td>${val.name}</td>
    <td>${val.surname}</td>
    <td>${val.age}</td>
    <td>${val.number}</td>
    <td>${val.addres}</td>
    <td>${dateHandler(val.time)}</td>

    </tr>`;
  }
}

function toggleForm() {
  var userForm = document.getElementById("userForm");
  userForm.classList.toggle("show");
}
/* function click(value) {
  switch(value) {
    case 'age':
  }
} */

showresults(users)