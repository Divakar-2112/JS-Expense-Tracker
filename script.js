let incomeValue = 0;
let expenseValue = 0;

function addtask() {
    let textValue = document.getElementById("textbox");
    let amountValue = document.getElementById("amountbox");
    let balanceSpan = document.querySelector("#bal span");
    let incomeSpan = document.getElementById("income");
    let expenseSpan = document.getElementById("expense");

    if (textValue.value === "" || amountValue.value === "") {
        alert("Inputs are empty");
        return;
    }

    if (isNaN(amountValue.value)) {
        alert("Please Enter a Valid Number for the amount.");
        return;
    }

    let amount = parseFloat(amountValue.value);
    let list = document.createElement('li');
    list.className = 'list-items';
    list.textContent = textValue.value;

    let span = document.createElement('span');
    span.className = 'amount';
    span.textContent = `₹${amount.toFixed(2)}`;
    span.style.marginLeft = '10px';

    let icon = document.createElement('i');
    icon.className = "fa-solid fa-xmark delete-icon";
    icon.style.cursor = 'pointer';
    icon.style.color = 'red';
    icon.style.marginLeft = '10px';
    icon.style.display = "none";

    list.addEventListener('mouseenter', () => {
        icon.style.display = "block";
    });

    list.addEventListener('mouseleave', () => {
        icon.style.display = "none";
    });

    icon.addEventListener("click", function () {
        let reduce = parseFloat(span.innerText.replace('₹', ''));

        if (reduce > 0) {
            incomeValue -= reduce; 
            incomeSpan.textContent = `₹${incomeValue.toFixed(2)}`;
        } else {
            expenseValue -= reduce; 
            expenseSpan.textContent = `₹${expenseValue.toFixed(2)}`;
        }

        list.remove(); 
        updateBalance(); 
    });

    list.appendChild(span);
    list.appendChild(icon);
    document.body.appendChild(list);

    let taskList = document.getElementById('task-list');
    taskList.appendChild(list);

    updateBalance(amount,list);
    textValue.value = "";
    amountValue.value = "";
}

function updateBalance(amount = 0,list=null) {
    let balanceSpan = document.querySelector("#bal span");
    let incomeSpan = document.getElementById("income");
    let expenseSpan = document.getElementById("expense");

    if (amount >= 0) {
        incomeValue += amount; 
        incomeSpan.textContent = `₹${incomeValue.toFixed(2)}`;
        if(list){
            list.style.borderRight='4px solid green';
        }
    } else {
        expenseValue += amount; 
        expenseSpan.textContent = `₹${expenseValue.toFixed(2)}`;
        if(list){
            list.style.borderRight='4px solid red';
        }
    }

    let balance = incomeValue + expenseValue; 
    balanceSpan.textContent = `₹${balance.toFixed(2)}`;
}


