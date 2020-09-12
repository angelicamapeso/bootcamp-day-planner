class TimeblockObj {
  constructor(hour, todo) {
    this.hour = hour;
    this.todo = todo;
  }
}

let currentTimeblocks = getLocalStorageObj();
document.querySelector('.container').addEventListener('click',saveTimeBlock);

window.onload = function() {
  displayCurrentDate();
  createTimeBlocks();
  setTimeblockText(currentTimeblocks);
};

function setTimeblockText(timeblockList) {
  if (timeblockList.length === 0 ) {
    return;
  } else {
    for (let timeblock of timeblockList) {
      const textArea = document.querySelector(`#timeblock-${timeblock.hour} textarea`);
      textArea.value = timeblock.todo;
    }
  }
}

function saveTimeBlock(event) {
  if (event.target.matches('button') || event.target.matches('i')) {
    let dataHour;
    if (event.target.matches('i')) {
      dataHour = event.target.parentElement.dataset.hour;
    } else {
      dataHour = event.target.dataset.hour;
    }
    const textAreaValue = document.querySelector(`#timeblock-${dataHour} textarea`).value;
    placeLocalStorageObj(new TimeblockObj(dataHour, textAreaValue));
    setLocalStorageObj(currentTimeblocks);
  }
}

function placeLocalStorageObj(timeblockObj) {
  if (currentTimeblocks.length > 0) {
    for (let savedTimeblock of currentTimeblocks) {
      if (savedTimeblock.hour === timeblockObj.hour) {
        savedTimeblock.todo = timeblockObj.todo;
        return;
      }
    }
  } 
  currentTimeblocks.push(timeblockObj);
  return;
}

function setLocalStorageObj(timeBlockList) {
  localStorage.setItem('timeblockObjects', JSON.stringify(timeBlockList));
}

function getLocalStorageObj() {
  const currentTimeBlocks = localStorage.getItem('timeblockObjects');
  if (currentTimeBlocks) {
    return JSON.parse(currentTimeBlocks);
  } else {
    return [];
  }
}

function displayCurrentDate() {
  document.getElementById('currentDay')
    .textContent = moment().format('dddd, MMMM Do');
}

function createTimeBlocks() {
  const currentHour = parseInt(moment().format('H'));

  for (let i = 9; i <= 17; i ++) {
    const timeBlock = document.createElement('div');
    timeBlock.classList.add('row');

    const hourCol = createCol(createHour(i), 1);
    timeBlock.appendChild(hourCol);

    const textArea = createCol(createTextArea(i,currentHour),10);
    timeBlock.appendChild(textArea);

    const saveBtn = createCol(createSaveBtn(i),1);
    timeBlock.appendChild(saveBtn);

    timeBlock.id = `timeblock-${i}`;
    document.querySelector('.container').appendChild(timeBlock);
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