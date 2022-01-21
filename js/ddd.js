let dataNames = document.querySelectorAll('.data__name')
let body = document.querySelector('.body')
let addBtns = document.querySelectorAll('.add__icon')
let editBtn = document.querySelector('.edit__icon')




/* addBtn.onclick = () => {
    console.log('s')
    let data = dataName.contentEditable = true
    let getLocalStorage = localStorage.getItem('new data')
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage)
    }
    listArr.push(data)
    localStorage.setItem('new data', JSON.stringify(listArr));
} */

for (const addBtn of addBtns) {
    addBtn.onclick = () => {
        let getLocalStorage = localStorage.getItem('new data')
        if (getLocalStorage == null) {
            listArr = [];
        } else {
            listArr = JSON.parse(getLocalStorage)
        }

        localStorage.setItem('new data', JSON.stringify(listArr));
        showData()
        console.log('test')
    }

}

function showData() {
    for (const dataName of dataNames) {
        dataName.contentEditable = true
        let value = dataName.innerHTML
        let getLocalStorage = localStorage.getItem('new data')
        if (getLocalStorage == null) {
            listArr = [];
        } else {
            listArr = JSON.parse(getLocalStorage)
        }
        let newItem = ''
        listArr.forEach((element, index) => {
            newItem += `<li class="data">
            <div class="data__details">
                <span class="data__name">${element}</span>
                <div class="icons">
                    <span class="add__icon icon"><i class="fas fa-plus"></i></span>
                    <span class="edit__icon icon"><i class="fas fa-pen"></i></span>
                    <span class="delete__icon icon"><i class="fas fa-times"></i></span>
                </div>
            </div>
        </li>`
        })
        listArr.push(value)
        localStorage.setItem('new data', JSON.stringify(listArr));
        body.innerHTML = newItem
        console.log(listArr)
    }

}

/* for (const editBtn of editBtns) {
    editBtn.onclick = () => {
        console.log('ss')
        for (const dataName of dataNames) {
            dataName.contentEditable = true
            let data = dataName.innerHTML
        }
        let getLocalStorage = localStorage.getItem('new data')
        if (getLocalStorage == null) {
            listArr = [];
        } else {
            listArr = JSON.parse(getLocalStorage)
        }
        listArr.push(data)
        localStorage.setItem('new data', JSON.stringify(listArr));
    }

} */