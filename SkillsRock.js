//2 Напишите функцию, которая выводит числа от 1 до 100. Но для кратных трём выводите "Fizz" вместо числа, а для
// кратных пяти — "Buzz". Для чисел, кратных как трём, так и пяти, выводите "FizzBuzz".

 function fizzBuzz() {
     for (let i = 1; i <= 100; i++) {
         // Если число кратно и 3, и 5, выводим "FizzBuzz"
         if (i % 3 === 0 && i % 5 === 0) {
             console.log("FizzBuzz");
         }
         else if (i % 3 === 0) {
             console.log("Fizz");
         }
         else if (i % 5 === 0) {
             console.log("Buzz");
         }
         else {
             console.log(i);
         }
     }
 }
fizzBuzz()

//3. Разбиение массива на части
//Напишите функцию, которая разбивает массив на группы заданного размера.

function chunkArray(array, size) {
   let copy=[]
    for (let i = 0; i < array.length; i += size) {
        copy.push(array.slice(i, i + size));
    }
    return copy;
}
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3));


// Задание 2: Манипуляции с DOM (1-1.5 часа)
// 1. Приложение для списка дел
// Создайте простое приложение для списка задач, используя HTML, CSS и JavaScript. Приложение должно включать следующие функции:
//     Текстовое поле для добавления новых задач.
//     Кнопка для добавления задачи в список.
//     Возможность отметить задачу как выполненную (по клику на нее).
// Завершённая задача должна отличаться от незавершённой визуально.
//     Кнопка для удаления задачи.


document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');

        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        listItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', () => listItem.remove());

        // Добавляем возможность отметить задачу как выполненную
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        listItem.appendChild(deleteBtn);

        taskList.appendChild(listItem);

        // Очищаем поле ввода после добавления задачи
        taskInput.value = '';
    }
}

// 1. Fetch API — Случайные пользователи
// Используйте Random User API, чтобы получить 10 случайных пользователей и отобразить их в виде списка. Для каждого пользователя нужно отобразить его имя, email и фотографию профиля.
//     Требуется:
// Использовать fetch для выполнения запроса к API.
//     Обрабатывать состояние загрузки (например, показывать «Загрузка...», пока данные получаются).
// Обрабатывать ошибки в случае неудачи запроса к API (например, показывать сообщение «Не удалось загрузить пользователей»).

function fetchRandomUsers() {
    const loadingDiv = document.getElementById('loading');
    const userList = document.getElementById('user-list');
    loadingDiv.textContent = 'Загрузка...';
    fetch('https://randomuser.me/api/?results=10')
        .then(response => response.json())
        .then(data => {
            loadingDiv.style.display = 'none';
            userList.innerHTML = '';
            data.results.forEach(user => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">
                    <div>
                        <h3>${user.name.first} ${user.name.last}</h3>
                        <p>${user.email}</p>
                    </div>`
                userList.appendChild(listItem)
            })
        })
        .catch(() => {
            loadingDiv.textContent = 'Не удалось загрузить пользователей';
        })
}
fetchRandomUsers()


// 1. Функция debounce
// Напишите функцию debounce. Эта функция должна гарантировать, что данная функция не вызывается слишком часто. При вызове она должна ожидать определенное количество времени перед выполнением. Если функция вызывается снова в течение этого времени, таймер должен быть сброшен.

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

//пример

function sayHello(name) {
    console.log('Привет, ' + name);
}
const newDebounce= debounce(sayHello, 2000);

newDebounce('Саша');
newDebounce('Маша');



// 2. Глубокое клонирование объекта
// Напишите функцию, которая выполняет глубокое клонирование объекта, т.е. вложенные объекты также должны быть склонированы, а не переданы по ссылке.

function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    let clone = Array.isArray(obj) ? [] : {}

    for (let key in obj) {

        clone[key] = deepClone(obj[key])
    }
    return clone
}

// Пример
const newObj = {
    name: 'Max',
    age: 30,
    address: {
        country: 'Russia',
        cities: ['Moscow', 'Tver']
    }
};
const copyObj = deepClone(newObj);

newObj.address.country = 'Belarus';

console.log(newObj.address.country);
console.log(copyObj.address.country);
