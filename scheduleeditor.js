var customSchedule = [];

var scheduleForm;
var scheduleList;

// Function to render the schedule list
function renderSchedule() {
    // Sort the schedule by start times
    customSchedule.sort(function(a, b) {
        return new Date('1970/01/01 ' + a.start) - new Date('1970/01/01 ' + b.start);
    });

    scheduleList.innerHTML = '';
    customSchedule.forEach(function(schedule, index) {
        var li = document.createElement('li');
        li.innerHTML = `
            <span>${schedule.period}</span>
            <span>${schedule.start} - ${schedule.end}</span>
            <button onclick="editSchedule(${index})">Edit</button>
            <button onclick="deleteSchedule(${index})">Delete</button>
        `;
        scheduleList.appendChild(li);
    });
}

// Function to add a new schedule
function addSchedule(event) {
    event.preventDefault();
    var periodInput = document.getElementById('period');
    var startInput = document.getElementById('start');
    var endInput = document.getElementById('end');

    var newSchedule = {
        period: periodInput.value,
        start: startInput.value,
        end: endInput.value
    };

    customSchedule.push(newSchedule);
    renderSchedule();

    // Reset form inputs
    periodInput.value = '';
    startInput.value = '';
    endInput.value = '';
}

// Function to edit a schedule
function editSchedule(index) {
    var schedule = customSchedule[index];
    var periodInput = document.getElementById('period');
    var startInput = document.getElementById('start');
    var endInput = document.getElementById('end');

    periodInput.value = schedule.period;
    startInput.value = schedule.start;
    endInput.value = schedule.end;

    // Remove the schedule from the array
    customSchedule.splice(index, 1);
    renderSchedule();
}

// Function to delete a schedule
function deleteSchedule(index) {
    customSchedule.splice(index, 1);
    renderSchedule();
}


function saveSchedule(){
    localStorage.setItem('customSchedule', JSON.stringify(customSchedule));
    setTimeout(() => {
        document.location.href = 'school-select.html';
    }, 500);
}

function loadSchedule(){
    customSchedule = JSON.parse(localStorage.getItem('customSchedule'));
    if(customSchedule == null){
        customSchedule = [];
    }
    renderSchedule();
}

window.addEventListener("DOMContentLoaded", (event) => {
    scheduleForm = document.getElementById('schedule-form');
    scheduleList = document.getElementById('schedule-list');
    scheduleForm.addEventListener('submit', addSchedule);
    loadSchedule();
});