let input = document.getElementById('input');
let list = document.querySelector('ul');
let checkboxComplete = document.getElementById('myCheckComplete');
let checkboxEmpty = document.getElementById('myCheckEmpty');
let buttonSave = document.getElementById('buttonSave');
let btnCheck = document.getElementById('toCheckComplete');
let elements = list.getElementsByClassName('checked')

const createListItem = (li) => {
  let span = document.createElement('SPAN');
  let arrow1 = document.createElement('SPAN');
  let arrow2 = document.createElement('SPAN');
  let edit = document.createElement('p')

  span.innerHTML = 'X';
  arrow1.innerHTML = '&#x25B2';
  arrow2.innerHTML = '&#x25BC;';
  edit.innerHTML = '&#9998;';

  span.className = 'spanClose';
  arrow1.className = 'arrow1';
  arrow2.className = 'arrow2';
  edit.className = 'edit';

  li.appendChild(span);
  li.appendChild(arrow1);
  li.appendChild(arrow2);
  li.appendChild(edit)

}

// Input Manipulation
input.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    if (input.value) {
      let li = document.createElement('LI');
      li.innerHTML = input.value;
      list.appendChild(li);
      toLocal()
      counterLiLeft();
      document.getElementById('input').value = '';

      createListItem(li);
      counterLiLeft();
      toLocal()
    } else {
      alert('Введите значение')
    }
  }
})

// Work with UL LIST
list.addEventListener('click', function (event) {
  // If click on span = delete child ul(li)
  if (event.target.className === 'spanClose') {
    event.target.parentNode.remove();
    toLocal()
    counterLiLeft()
  }
  // If click on li = add class checked
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
    toLocal()
    counterLiLeft()
  }
})

//
const toggleCompleted = (e, flag) => {
  e.target.classList.toggle('active-btn')
  let arrayOfChildrens = list.children;

  for (let i = 0; i < arrayOfChildrens.length; i++) {
    let isChecked = arrayOfChildrens[i].classList.contains('checked')
    if (flag == true ? !isChecked : isChecked) {
      arrayOfChildrens[i].classList.toggle('hide');
    }
  }
}
// Hide Completed Task
checkboxComplete.addEventListener('click', (e) => toggleCompleted(e, true));
// Hide Empty Task
checkboxEmpty.addEventListener('click', (e) => toggleCompleted(e, false));

// Local Storage 
function toLocal() {
  let todos = list.innerHTML;
  localStorage.setItem('todos', todos)
}

// On initial page load
if (localStorage.getItem('todos')) {
  list.innerHTML = localStorage.getItem('todos')
  counterLiLeft();
}

// arrows 
list.addEventListener('click', function (e) {
  let li = e.target.parentNode;
  if (e.target.className === 'arrow1') {
    // li это то что будет вставлено,
    // li.previous - элемент перед которым будет вставлен li
    list.insertBefore(li, li.previousElementSibling);
  }
  if (e.target.className === 'arrow2') {
    if (!li.nextElementSibling) {
      list.insertBefore(li, list.firstChild)
    } else {
      list.insertBefore(li.nextElementSibling, li);
    }
  }
})

// BUTTON FOR CHECK COMPLETED
function completeAllIfOneComplete() {
  let arrayOfLi = list.children;
  let isCheked = [...arrayOfLi].every(li => {
    return li.classList.contains('checked')
  })
  console.log(isCheked)
  for (let i = 0; i < arrayOfLi.length; i++) {
    if (isCheked) {
      arrayOfLi[i].classList.remove('checked')
      counterLiLeft()
    } else {
      arrayOfLi[i].classList.add('checked')
      counterLiLeft()
    }
  }
}

// function deleteAllCompleted() 
function btnCheckCompleteToCompleteAll() {
  completeAllIfOneComplete();
}

btnCheck.addEventListener('click', btnCheckCompleteToCompleteAll)

// Add Counter
function counterLiLeft() {
  let counter = document.getElementById('counter')
  let array = list.children;
  let arrayLi = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].classList != 'checked') {
      arrayLi.push(array[i])
    }
  }
  counter.innerHTML = arrayLi.length;
}

// Add Edit Li Item
let createInput = document.createElement('input');
function inputManipulation() {
  createInput.className = 'editLi';
  createInput.setAttribute('type', 'text');
  createInput.setAttribute('value', ' ');
}

let editLiItem = document.getElementsByClassName('edit')
for (let i = 0; i < editLiItem.length; i++) {
  editLiItem[i].addEventListener('click', function (e) {
    e.path[1].childNodes[0].textContent = ' ';
    inputManipulation()
    toLocal()

    e.path[1].appendChild(createInput)
    createInput.addEventListener('keydown', function (e) {
      if (e.keyCode == 13) {
        if (e.path[1].tagName === 'LI') {
          e.path[1].childNodes[0].textContent = createInput.value;
          createInput.style.display = 'none';
          toLocal();
        }
      }
    })
  })
}

// let editLiItem = document.getElementsByClassName('edit')
// for (let i = 0; i < editLiItem.length; i++) {
//   editLiItem[i].addEventListener('click', function (e) {
//     e.path[1].childNodes[0].textContent = ' ';
//     let input = document.createElement('input');
//     input.className = 'editLi';
//     input.setAttribute('type', 'text');
//     input.setAttribute('value', ' ');
//     toLocal()

//     e.path[1].appendChild(input)
//     input.addEventListener('keydown', function (e) {
//       if (e.keyCode == 13) {
//         if (e.path[1].tagName === 'LI') {
//           e.path[1].childNodes[0].textContent = input.value;
//           input.style.display = 'none';
//           toLocal();
//         }
//       }
//     })
//   })
// }

