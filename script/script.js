//pomodoro
let timer;
let timeLeft = 0;
let isStudy = true;  
let sesiBelajar = 0;  
let isPause = false;

function startPodomoro() {
    timer = setInterval(() => {
        if (!isPause) {
            const menit = Math.floor(timeLeft / 60);
            const detik = timeLeft % 60;
            document.getElementById('timer-display').textContent = `${menit < 10 ? '0' : ''}${menit}:${detik < 10 ? '0' : ''}${detik}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                sesiBelajar++;
                infoPesan(isStudy);
                switchSesi();
            } else {
                timeLeft--;
            }
        }
    }, 1000);
}

function infoPesan(isStudy) {
    const elemenPesan = document.getElementById('pesan');
    if (isStudy) {
        elemenPesan.textContent = "Waktu belajar selesai, sekarang istirahat";
    } else {
        elemenPesan.textContent = "Waktu istirahat selesai, selamat belajar lagi";
    }


    elemenPesan.style.display = 'block';

    setTimeout(() => {
        elemenPesan.style.display = 'none';  
    }, 10000);
}

function switchSesi() {
    const waktuBelajar = parseInt(document.getElementById('waktu-belajar').value) || 25;  
    const waktuBreak = parseInt(document.getElementById('waktu-break').value) || 5;  
    
    if (isStudy) {
        timeLeft = waktuBreak * 60;
    } else {
        timeLeft = waktuBelajar * 60;
    }
    isStudy = !isStudy;  
    startPodomoro();
}

document.getElementById('start-timer').addEventListener('click', () => {
    const waktuBelajar = parseInt(document.getElementById('waktu-belajar').value) || 25;
    if (!timer) {
        timeLeft = waktuBelajar * 60;
        startPodomoro();
    }
});

document.getElementById('pause-timer').addEventListener('click', () => {
    if (!timer) return;
    isPause = !isPause;
    document.getElementById('pause-timer').textContent = isPause ? 'Resume' : 'Pause';
});

document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    isPause = false;
    sesiBelajar = 0;
    timeLeft = 25 * 60;  
    isStudy = true;
    document.getElementById('pause-timer').textContent = 'Pause';
    document.getElementById('timer-display').textContent = '25.00';
});


//todolist
const todoItems = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    const list = document.getElementById('todo-list-items');
    list.innerHTML = '';
    todoItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        
        
        checkbox.addEventListener('change', () => {
            todoItems[index].completed = checkbox.checked;
            saveTodos();
        });
        
        listItem.appendChild(checkbox);

        const textNode = document.createElement('span');
        textNode.textContent = item.text;
        listItem.appendChild(textNode);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = ' Hapus';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();  
            todoItems.splice(index, 1);
            saveTodos();
        });

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todoItems));
    renderTodos();
}

document.getElementById('tambah-todo').addEventListener('click', () => {
    const input = document.getElementById('todo-input');
    if (input.value.trim()) {
        todoItems.push({ text: input.value, completed: false });
        input.value = '';
        saveTodos();
    }
});


renderTodos();
