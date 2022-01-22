let body = document.querySelector('.body');
let heading = document.querySelector('.heading')
let modalSection = document.querySelector('.modal__section')




const root = {
    id: "root",
    value: 'Category',
    isEditable: false,
    isModal: false,
    children: []
}



function uniqieId() {
    return 'xxxxxxxx_xxxx__4xxx__yxxx__xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
var dataId = uniqieId();

const AddType = {
    id: "root",
    value: {
        id: dataId,
        value: '',
        children: []
    },
}

const DelType = {
    id: dataId
}

const Checker = (input, { add = null, del = null, update = null, modal = null } = {}) => {
    if (input.id == 'root') {
        if (update !== null) {
            update['value'] = document.querySelector(`.data__name__${update.id}`).innerText
        }
        body.innerHTML = ''
        heading.innerHTML = ''
        modalSection.innerHTML = ''
    }
    if (input.isEditable == false) {
        if (input.id !== 'root') {
            body.innerHTML += `<li class="data">
            <div class="data__details">
                <span class="data__name data__name__bg" contenteditable="${input.isEditable}">${input.value}</span>
                <div class="icons">
                    <span class="add__icon icon" onclick="Checker(root, {add: {id: '${input.id}', value: {id:'${uniqieId()}',value:'',children:[],isEditable: true,isModal:false}}})"><i class="fas fa-plus"></i></span>
                    <span class="edit__icon icon"><i class="fas fa-pen"></i></span>
                    <span class="delete__icon icon" onclick="Checker(root, {modal :{value: {id:'${input.id}',value:'${input.value}', isModal:true}}})"><i class="fas fa-times"></i></span>
                </div>
            </div>
            </li>`

        } else {
            heading.innerHTML += `<div class="head">
            <span class="head__name data__name">Categories</span>
            <div class="icons">
                <span class="add__icon icon" onclick="Checker(root, {add: {id: '${input.id}', value: {id:'${uniqieId()}',value:'',children:[],isEditable: true}}})"><i class="fas fa-plus"></i></span>
            </div>
        </div>`
        }

    } else {
        body.innerHTML += `<li class="data">
        <div class="data__details">
        <span class="data__name data__name__${input.id}" contenteditable="${input.isEditable}">${input.value}</span>
        <div class="icons">
        <span class="verify__icon icon bg__yellow" onclick="Checker(root, {del: {id: '${input.id}'}})"><i class="fas fa-times"></i></span>
        <span class="edit__icon icon bg__green" onclick="Checker(root, {update: {id: '${input.id}',isEditable: false}})"><i class="fas fa-check"></i></span>
        </div>
        </div>
        </li>`
    }
    if (modal !== null) {
        modalSection.innerHTML += `<div class="modal">
            <div class="modal__main">
                <div class="modal__content">
                    <div class="modal__icon">
                        <div class="modal__icon__img">
                            <img src="images/trash.svg" alt="">
                        </div>
                    </div>
                    <p class="modal__title">
                        Are you sure you want to delete this ${modal.value.value}
                    </p>
                    <div class="modal__btns">
                        <button class="btn btn__cancel" type="button" onclick="Checker(root, {del: {id: ' '}})">Cancel</button>
                        <button class="btn btn__delete"  type="button"  onclick="Checker(root, {del: {id: '${modal.value.id}'}})">Delete</button>
                    </div>
                </div>
            </div>
        </div>`
        setTimeout(() => {
            let modalClass = document.querySelector('.modal')
            modalClass.classList.add('modal__open')
        }, 100)

    }



    Object.entries(input).forEach(([key, value]) => {
        if (key === "id" && value === "root" && add !== null && add.id == "root") {
            input.children.push(add.value);
        }
        if (key === "id" && value === "root" && del !== null && del.id == "root") {
            input.children = [];
        }
        if (key === "children" && value.length > 0) {
            if (add !== null && value.some(child => child.id === add.id)) {
                value.find(s => s.id == add.id).children.push(add.value)
            }
            if (update !== null && value.some(child => child.id === update.id)) {
                value.find(s => s.id == update.id).value = update.value
                value.find(s => s.id == update.id).isEditable = false
            }
            if (del !== null && value.some(child => child.id === del.id)) {
                value.splice(value.findIndex(s => s.id === del.id), 1)
            }
            value.forEach(s => Checker(s, { add, del, update }))
        }

    })
}



Checker(root)