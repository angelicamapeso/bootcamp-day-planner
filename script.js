class TimeblockObj {
  constructor(hour, todo) {
    this.hour = hour;
    this.todo = todo;
  }
}

let currentTimeblocks = getCurrentTimeblocks();

window.onload = function() {
  displayCurrentDate();
  displayTimeblockRows();

  document.querySelector('.container').addEventListener('click', containerClicked);
  setTimeblockText();
};

function setTimeblockText() {
  if (currentTimeblocks.length === 0 ) {
    return;
  } else {
    for (let timeblock of currentTimeblocks) {
      document.querySelector(`#timeblock-${timeblock.hour} textarea`)
        .value = timeblock.todo;
    }
  }
}

function containerClicked(event) {
  if (isSaveButton(event)) {
    const timeblockHour = getTimeblockHour(event);
    const textAreaValue = getTextAreaValue(timeblockHour);
    placeTimeblockInList(new TimeblockObj(timeblockHour, textAreaValue));
    saveTimeblockList();
  }
}

function isSaveButton(event) {
  return event.target.matches('button') || event.target.matches('.fa-save');
}

function getTimeblockHour(event) {
  return event.target.matches('i') ? event.target.parentElement.dataset.hour : event.target.dataset.hour;
}

function getTextAreaValue(timeblockHour) {
  return document.querySelector(`#timeblock-${timeblockHour} textarea`).value;
}

function placeTimeblockInList(newTimeblockObj) {
  if (currentTimeblocks.length > 0) {
    for (let savedTimeblock of currentTimeblocks) {
      if (savedTimeblock.hour === newTimeblockObj.hour) {
        savedTimeblock.todo = newTimeblockObj.todo;
        return;
      }
    }
  } 
  currentTimeblocks.push(newTimeblockObj);
  return;
}

function saveTimeblockList() {
  localStorage.setItem('timeblockObjects', JSON.stringify(currentTimeblocks));
}

function getCurrentTimeblocks() {
  const currentTimeblocks = localStorage.getItem('timeblockObjects');
  return currentTimeblocks ? JSON.parse(currentTimeblocks) : [];
}

function displayCurrentDate() {
  document.getElementById('currentDay')
    .textContent = moment().format('dddd, MMMM Do');
}

function displayTimeblockRows() {
  const currentHour = parseInt(moment().format('H'));

  for (let i = 9; i <= 17; i ++) {
    const timeblock = document.createElement('div');
    timeblock.classList.add('row');

    const hourCol = createCol(createHour(i), 1);
    timeblock.appendChild(hourCol);

    const textArea = createCol(createTextArea(i,currentHour),10);
    timeblock.appendChild(textArea);

    const saveBtn = createCol(createSaveBtn(i),1);
    timeblock.appendChild(saveBtn);

    timeblock.id = `timeblock-${i}`;
    document.querySelector('.container').appendChild(timeblock);
  }
}

function createTimeblockRow(hourId) {
  const timeblock = document.createElement('div');
  timeblock.classList.add('row');
  timeblock.id = `timeblock-${hourId}`;
  return timeblock;
}

function appendTimeblockColumns(timeblockRow, hourCol, textAreaCol, saveBtnCol) {
  const innerCols = [hourCol, textAreaCol, saveBtnCol];
  for (let col of innerCols) {
    timeblockRow.appendChild(col);
  }
}

function createCol(element, colSize) {
  const col = document.createElement('div');
  col.classList.add(`col-${colSize}`,'p-0');
  col.appendChild(element);
  return col;
}

function createHour(hour) {
  const hourCol = document.createElement('div');
  hourCol.classList.add('hour');
  hourCol.textContent = formatHour(hour);
  return hourCol;
}

function formatHour(hour) {
  const hourString = String(hour);
  return moment(hourString, 'h').format('hA');
}

function createTextArea(hour, currentHour) {
  const textArea = document.createElement('textarea');
  textArea.classList.add(getTextAreaBackgroundClass(hour, currentHour));
  return textArea;
}

function getTextAreaBackgroundClass(hour, currentHour) {
  if (hour < currentHour) {
    return 'past';
  } else if (hour === currentHour) {
    return 'present';
  } else {
    return 'future';
  }
}

function createSaveBtn(hour) {
  const saveBtn = document.createElement('button');
  saveBtn.classList.add('saveBtn');
  saveBtn.innerHTML = '<i class="fas fa-save"></i>';
  saveBtn.setAttribute('data-hour', hour);
  return saveBtn;
}