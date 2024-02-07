const res = document.getElementById('res');
const name = document.getElementById('name');
const surname = document.getElementById('surname')
const age = document.getElementById('age');
const number = document.getElementById('number');
const address = document.getElementById('address');
const submit = document.getElementById('submit');
const addUserForm = document.getElementById('addUserForm')
const cridit = document.getElementById("creidit")
const users = JSON.parse(localStorage.getItem('user')) ?? [
  {
    name: "Firdavs",
    surname: "Rustamov",
    number: 915682148,
    time: new Date().getTime() ,
    cridit: 5000,
  }

 
]
addUserForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if(
    name.value.trim() == "" ||
    surname.value.trim() == "" ||
    number.value.trim() == "" ||
    cridit.value.trim() ==""
  ) {
    alert('Enter Full Information')
  }
  else {
    users.push({
      name: name.value,
      surname: surname.value,
      number: number.value,
      cridit: cridit.value,
      time: new Date().getTime()

    });
    showresults(users);
    name.value = "";
    surname.value = "";
    number.value = "";
    cridit.value ="";
    ``
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
      <td>${val.number}</td>
      <td>${dateHandler(val.time)}</td>
      <td>${val.cridit}</td> <!-- исправлена опечатка в 'credit' -->
      <td>
        <button onclick="plus(${i})">+</button>
        <button onclick="minus(${i})">-</button>
      </td>
    </tr>
    `;
  } 
}


function plus(index) {
 
  arr[index].credit += 1;
  showresults(arr); 
}


function minus(index) {
  if (arr[index].cridit > 0) {
    arr[index].cridit -= 1;
    showresults(arr); 
  }
}

localStorage.clear()

function toggleForm() {
  var userForm = document.getElementById("userForm");
  userForm.classList.toggle("show");
}


showresults(users)