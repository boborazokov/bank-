const res = document.getElementById('res');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const age = document.getElementById('age');
const number = document.getElementById('number');
const address = document.getElementById('address');
const submit = document.getElementById('submit');
const addUserForm = document.getElementById('addUserForm');
const users = JSON.parse(localStorage.getItem('user')) || [
  {
    name: "Firdavs",
    surname: "Rustamov",
    number: 915682148,
    time: new Date().getTime(),
    credit: 5000,
    history: [] // добавляем пустой массив для хранения истории операций
  }
];

const credit = document.getElementById("credit");
const historyBar = document.getElementById('historyBar');

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
      credit: credit.value,
      time: new Date().getTime(),
      history: [] // добавляем пустой массив для хранения истории операций
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
      <td>${val.credit}</td> 
      <td>
        <input type="number" id="money${i}" placeholder="Enter action">
        <button onclick="plus(${i})">+</button>
        <button onclick="minus(${i})">-</button>
        <button onclick="deleteUser(${i})">Delete</button>
        <button onclick="showOperationHistory(${i})">Show History</button>
      </td>
    </tr>`;
  } 
}

function toggleForm() {
  var userForm = document.getElementById("userForm");
  userForm.classList.toggle("show");
}

function plus(index) {
  const moneyInput = document.getElementById(`money${index}`);
  const amount = parseInt(+moneyInput.value);
  if (!isNaN(amount) && amount > 0) {
    users[index].credit += amount;
    users[index].history.push({
      type: 'add',
      amount: amount,
      time: new Date().getTime()
    });
    showresults(users);
    moneyInput.value = "";
  } else {
    alert("Please enter a valid positive number.");
  }
}

function minus(index) {
  const moneyInput = document.getElementById(`money${index}`);
  const amount = parseInt(moneyInput.value);
  if (!isNaN(amount) && amount > 0 && amount <= users[index].credit) {
    users[index].credit -= amount;
    users[index].history.push({
      type: 'remove',
      amount: amount,
      time: new Date().getTime()
    });
    showresults(users);
    moneyInput.value = "";
  } else {
    alert("Please enter a valid positive number that does not exceed the current credit.");
  }
}

function deleteUser(index) {
  users.splice(index, 1);
  showresults(users);
  historyBar.innerHTML = ''; // Очищаем историю операций при удалении пользователя
}
function showOperationHistory(index) {
  const user = users[index];
  showHistoryPanel(user.history);
  toggleHistoryBar(); // вызов функции для показа панели истории
}


function toggleHistoryBar() {
  var historyBar = document.getElementById("historyBar"); // Получаем правильный элемент
  historyBar.classList.toggle("show"); // Переключаем класс
}




function showHistoryPanel(history) {
  historyBar.innerHTML = `<h3>Operation History</h3>`;
  history.forEach(operation => {
    historyBar.innerHTML += `<p>Type: ${operation.type}, Amount: ${operation.amount}, Time: ${dateHandler(operation.time)}</p>`;
  });
}

showresults(users);
