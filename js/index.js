let body = document.querySelector('.body');
let heading = document.querySelector('.heading')
let dataNames = document.querySelectorAll('.data__name')
let addBtns = document.querySelectorAll('.add__icon')
let editBtn = document.querySelector('.edit__icon')
let deleteBtn = document.querySelector('.delete__icon')
let modalSection = document.querySelector('.modal__section')
let modalClose = document.querySelector('.btn__cancel')
let modalBtnDelete = document.querySelector('.btn__delete')





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



const Checker = (input, { add = null, del = null, update = null } = {}) => {
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
                    <span class="add__icon icon" onclick="Checker(root, {add: {id: '${input.id}', value: {id:'${uniqieId()}',value:'',children:[],isEditable: true}}})"><i class="fas fa-plus"></i></span>
                    <span class="edit__icon icon"><i class="fas fa-pen"></i></span>
                    <span class="delete__icon icon" onclick="Checker(root, {isModal:true})"><i class="fas fa-times"></i></span>
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
    if (input.isModal == false) {
        if (input.id !== 'root') {
            console.log('ssss')
            modalSection.innerHTML += `<div class="modal modal__open">
            <div class="modal__main">
                <div class="modal__content">
                    <div class="modal__icon">
                        <div class="modal__icon__img">
                            <img src="images/trash.svg" alt="">
                        </div>
                    </div>
                    <p class="modal__title">
                        Are you sure you want to delete this ${input.value}
                    </p>
                    <div class="modal__btns">
                        <button class="btn btn__cancel" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn__delete"  type="button"  onclick="Checker(root, {del: {id: '${input.id}'}})">Delete</button>
                    </div>
                </div>
            </div>
        </div> `
        }
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

/* function ModalOpen() {
    console.log('sss')
    modalSection.innerHTML += `
    <div class="modal modal__open">
    <div class="modal__main">
        <div class="modal__content">
            <div class="modal__icon">
                <div class="modal__icon__img">
                    <img src="images/trash.svg" alt="">
                </div>
            </div>
            <p class="modal__title">
                Are you sure you want to delete this category
            </p>
            <div class="modal__btns">
                <button class="btn btn__cancel" type="button" data-dismiss="modal">Cancel</button>
            
            </div>
        </div>
    </div>
    </div>
   `
} */
/* function ModalOpen() {
    modalOpen.classList.add('modal__open')
}

modalClose.onclick = () => {
    modalOpen.classList.remove('modal__open')
} */




Checker(root)

/* Checker(root, { add: AddType }) */
// Checker(root, { del: DelType })

/* console.log(root.children[0]) */