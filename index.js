const alarmPage=document.getElementsByClassName('.alarm-page')
const alarmList = document.getElementById('alarmList');
const setAlarmButton = document.getElementById('setAlarm');
const currentTimeElement = document.getElementById('currentTime');
const alarmToneSelect = document.getElementById('alarmTone');

setAlarmButton.addEventListener('click', () => {
  const alarmTime = document.getElementById('alarmTime').value;
  if (alarmTime) {
    createAlarm(alarmTime);
  }
});

function createAlarm(time) {
  const alarmItem = document.createElement('li');
  alarmItem.innerHTML = `
    <span class="alarm-time">${time}</span>
    <span class="delete-button">Delete</span>
  `;
  alarmList.appendChild(alarmItem);

  const deleteButton = alarmItem.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    alarmList.removeChild(alarmItem);
  });

  scheduleAlarm(time);
}

function scheduleAlarm(alarmTime) {
  const now = new Date();
  const [hours, minutes] = alarmTime.split(':');
  const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  const timeUntilAlarm = alarmDate - now;
  if (timeUntilAlarm > 0) {
    setTimeout(() => {
      playAlarmSound();
    }, timeUntilAlarm);
  }

  const currentTimeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  const alarmTimeString = alarmTime;
  
  if (currentTimeString === alarmTimeString) {
    playAlarmSound();
  }
}

function playAlarmSound() {
  const selectedTone = alarmToneSelect.value;
  const audio = new Audio(selectedTone);
  audio.play();
}

function updateCurrentTime() {
  const now = new Date();
  const hours = make0(String(now.getHours()));
  const minutes = make0(String(now.getMinutes()));
  const seconds = make0(String(now.getSeconds()));
  const currentTimeString = `${hours}:${minutes}:${seconds}`;
  currentTimeElement.textContent = currentTimeString;
}

function make0(format){
    if(format <10){
        return '0'+format;
    }
    return format;
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
