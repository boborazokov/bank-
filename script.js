
const res = document.getElementById('res');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const age = document.getElementById('age');
const number = document.getElementById('number');
const address = document.getElementById('address');
const submit = document.getElementById('submit');
const addUserForm = document.getElementById('addUserForm');
const users = JSON.parse(localStorage.getItem('user')) ?? [
  {
    name: "Firdavs",
    surname: "Rustamov",
    number: 915682148,
    time: new Date().getTime(),
    cridit: 5000,
  }
];


const credit = document.getElementById("credit");

addUserForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (
    name.value.trim() == "" ||
    surname.value.trim() == "" ||
    number.value.trim() == "" ||
    credit.value.trim() == ""
  ) {
    alert('Enter Full Information');
  } else {
    users.push({
      name: name.value,
      surname: surname.value,
      number: number.value,
      credit: cridit.value,
      time: new Date().getTime()
    });
    showresults(users);
    name.value = "";
    surname.value = "";
    number.value = "";
    credit.value = "";
  }
});


function dateHandler(vaqt) {
  var year = new Date(vaqt).getFullYear();
  var month = new Date(vaqt).getMonth() + 1;
  var day = new Date(vaqt).getDate();
  return `${day}.${month}.${year}`;
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
      <td>${val.cridit}</td> 
      <td>
        <input type="number" id="money${i}" placeholder="Enter action">
        <button onclick="plus(${i})">+</button>
        <button onclick="minus(${i})">-</button>
        <button onclick="deleteUser(${i})">Delete</button>  
      </td>
    </tr>`;
  } 
}

function toggleForm() {
  var userForm = document.getElementById("userForm");
  userForm.classList.toggle("show");
}

localStorage.clear();

function plus(index) {
  const moneyInput = document.getElementById(`money${index}`);
  const amount = parseInt(moneyInput.value);
  if (!isNaN(amount) && amount > 0) {
    users[index].cridit += amount;
    showresults(users);
    moneyInput.value = "";
  } else {
    alert("Please enter a valid positive number.");
  }
}

function minus(index) {
  const moneyInput = document.getElementById(`money${index}`);
  const amount = parseInt(moneyInput.value);
  if (!isNaN(amount) && amount > 0 && amount <= users[index].cridit) {
    users[index].cridit -= amount;
    showresults(users);
    moneyInput.value = "";
  } else {
    alert("Please enter a valid positive number that does not exceed the current credit.");
  }
}

function deleteUser(index) {
  users.splice(index, 1);
  showresults(users);
}

function toggleTransactionDetails(index) {
  const transactionDetails = document.getElementById('transactionDetails');
  const transactionList = document.getElementById('transactionList');
  if (transactionDetails.style.display === 'none') {
    transactionList.innerHTML = ''; // Очищаем список транзакций перед добавлением новых
    const userTransactions = users[index].transactions;
    for (const transaction of userTransactions) {
      transactionList.innerHTML += `
        <li>${transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount)} (${dateHandler(transaction.date)})</li>
      `;
    }
    transactionDetails.style.display = 'block';
  } else {
    transactionDetails.style.display = 'none';
  }
}
showresults(users);
