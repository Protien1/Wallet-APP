const root = document.querySelector(':root')
const incomeArea = document.querySelector('.income-area')
const expensesArea = document.querySelector('.expenses-area')
const allTransactions = document.querySelector('.transactions-list')

const availableMoney = document.querySelector('.available-money')
const transactionPanel = document.querySelector('.add-transaction-panel')
const transactionName = document.querySelector('#name')
const transactionAmount = document.querySelector('#amount')
const transactionCategory = document.querySelector('#category')



const addTransactionBtn = document.querySelector('.add-transaction')
const transactionDelBtn = document.getElementsByClassName('delete')
const delAll = document.querySelector('.delete-all')
const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

let createID = 0;
const numbers = []


const checkForm = () => {
    if(transactionAmount.value !== '' && transactionName.value !== '' && transactionCategory.value !== 'none'){
        createTransfer()
    }else{
        alert('Wypełnij wszystkie pola')
    }
    
}


const createTransfer = () => {
    let icon = `fas fa-money-bill-wave`
    if(transactionCategory.value === 'shopping'){
        icon = `fas fa-cart-arrow-down`
    }else if(transactionCategory.value === 'food'){
        icon = `fas fa-hamburger`
    }else if(transactionCategory.value === 'cinema'){
        icon = `fas fa-film`
    }
    
    const transfer = document.createElement('div')
    transfer.classList.add('transaction')
    transfer.setAttribute('id', createID)
	transfer.innerHTML = `<p class="transaction-name"><i class="${icon}"></i>${transactionName.value}</p>
    <p class="transaction-amount">${transactionAmount.value}zł</p>
    <button class="delete"><i class="fas fa-times"></i></button>
    `
    

    const money = transactionAmount.value
    numbers.push(+money)
    console.log(numbers);
   
    
    if(transactionAmount.value >= 0 ){
        incomeArea.appendChild(transfer)
    }else{
        expensesArea.appendChild(transfer)   
    }
	
	hideTransactionPanel()
    countMoney()

    const delBtn = transfer.querySelector('.delete')
    delBtn.addEventListener('click', () => {
        transfer.remove()
   
    })

}


const countMoney = () => {
    const sum = numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)

    availableMoney.innerHTML= `${sum} zł`
}


const setDark = () => {
    root.style.setProperty('--first-color', '#14161f')
    root.style.setProperty('--secound-color', '#f9f9f9')
    root.style.setProperty('--border-color', '#ffffff33')
}
const setLight = () => {
    root.style.setProperty('--first-color', '#f9f9f9')
    root.style.setProperty('--secound-color', '#14161f')
    root.style.setProperty('--border-color', '#00000033')
}



const deleteAll = () => {
	incomeArea.textContent = ''
	expensesArea.textContent = ''
	incomeArea.innerHTML = ' <h3>Przychód:</h3>'
	expensesArea.innerHTML = '<h3>Wydatki:</h3>'

}

const showTransactionPanel = () => {
	transactionPanel.style.display = 'flex'
    
}
const hideTransactionPanel = () => {
	transactionPanel.style.display = 'none'
	transactionName.value = ''
	transactionAmount.value = ''
	transactionCategory.value = 'none'
}

addTransactionBtn.addEventListener('click', showTransactionPanel)
cancelBtn.addEventListener('click', hideTransactionPanel)
delAll.addEventListener('click', deleteAll)
lightBtn.addEventListener('click', setLight)
darkBtn.addEventListener('click', setDark)
saveBtn.addEventListener('click', checkForm)