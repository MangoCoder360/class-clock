setInterval(function() {
  fetch("https://ccu-api.reuben.zip/api/class-clock/1").then(function(response) {
    if(response.status == 200){
      location.reload();
    }
  });
}, 800000);

var fsMode = false;
var schoolAcronym;
var showIdealBattery = false;

var customSchedule = [];

const demoSchedule = [
    { period: 'DEMO', start: '06:00', end: '22:00' }
];

const whsTueThruFriSchedule = [
  { period: 'Before School', start: '08:30', end: '09:00' },
  { period: 'Period 1', start: '09:00', end: '09:55' },
  { period: 'Passing Time', start: '09:55', end: '10:00' },
  { period: 'Period 2', start: '10:00', end: '10:53' },
  { period: 'Passing Time', start: '10:53', end: '10:58' },
  { period: 'GRIT 101', start: '10:58', end: '11:23' },
  { period: 'Lunch', start: '11:23', end: '11:53' },
  { period: 'Passing Time', start: '11:53', end: '11:58' },
  { period: 'Period 3', start: '11:58', end: '12:51' },
  { period: 'Passing Time', start: '12:51', end: '12:56' },
  { period: 'Period 4', start: '12:56', end: '13:49' },
  { period: 'Passing Time', start: '13:49', end: '13:59' },
  { period: 'Period 5', start: '13:59', end: '14:52' },
  { period: 'Passing Time', start: '14:52', end: '14:57' },
  { period: 'Period 6', start: '14:57', end: '15:50' },
];

const whsmondaySchedule = [
  { period: 'Before School', start: '10:00', end: '10:15' },
  { period: 'Period 1', start: '10:15', end: '11:05' },
  { period: 'Passing Time', start: '11:05', end: '11:10' },
  { period: 'Period 2', start: '11:10', end: '11:56' },
  { period: 'Lunch', start: '11:56', end: '12:26' },
  { period: 'Passing Time', start: '12:26', end: '12:31' },
  { period: 'Period 3', start: '12:31', end: '13:17' },
  { period: 'Passing Time', start: '13:17', end: '13:22' },
  { period: 'Period 4', start: '13:22', end: '14:08' },
  { period: 'Passing Time', start: '14:08', end: '14:13' },
  { period: 'Period 5', start: '14:13', end: '14:59' },
  { period: 'Passing Time', start: '14:59', end: '15:04' },
  { period: 'Period 6', start: '15:04', end: '15:50' },
];

const wmsTueThruFriSchedule = [
  { period: 'Period 1', start: '08:45', end: '09:40' },
  { period: 'Passing Time', start: '09:40', end: '09:44' },
  { period: 'Period 2', start: '09:44', end: '10:31' },
  { period: 'Passing Time', start: '10:31', end: '10:35' },
  { period: 'Period 3', start: '10:35', end: '11:22' },
  { period: 'Passing Time', start: '11:22', end: '11:26' },
  { period: 'Period 4', start: '11:26', end: '12:13' },
  { period: 'Passing Time', start: '12:13', end: '12:17' },
  { period: 'Lunch / Recess', start: '12:17', end: '12:52' },
  { period: 'Passing Time', start: '12:52', end: '12:56' },
  { period: 'Period 5', start: '12:56', end: '13:43' },
  { period: 'Passing Time', start: '13:43', end: '13:47' },
  { period: 'Period 6', start: '13:47', end: '14:34' },
  { period: 'Passing Time', start: '14:34', end: '14:38' },
  { period: 'Period 7', start: '14:38', end: '15:25' }
];

const wmsMondaySchedule = [
  { period: 'Period 1', start: '10:00', end: '10:46' },
  { period: 'Passing Time', start: '10:46', end: '10:50' },
  { period: 'Period 2', start: '10:50', end: '11:26' },
  { period: 'Passing Time', start: '11:26', end: '11:30' },
  { period: 'Period 3', start: '11:30', end: '12:06' },
  { period: 'Passing Time', start: '12:06', end: '12:10' },
  { period: 'Period 4', start: '12:10', end: '12:50' },
  { period: 'Passing Time', start: '12:50', end: '12:50' },
  { period: 'Lunch / Recess', start: '12:50', end: '13:25' },
  { period: 'Passing Time', start: '13:25', end: '13:29' },
  { period: 'Period 5', start: '13:29', end: '14:05' },
  { period: 'Passing Time', start: '14:05', end: '14:09' },
  { period: 'Period 6', start: '14:09', end: '14:45' },
  { period: 'Passing Time', start: '14:45', end: '14:49' },
  { period: 'Period 7', start: '14:49', end: '15:25' }
];

const dohsMondaySchedule = [
  { period: 'Block 1', start: '08:30', end: '09:38'},
  { period: 'Brunch', start: '09:38', end: '09:45'},
  { period: 'Passing Time', start: '09:45', end: '09:51'},
  { period: 'Block 2', start: '09:51', end: '10:59'},
  { period: 'Passing Time', start: '10:59', end: '11:05'},
  { period: 'Advisory', start: '11:05', end: '11:25'},
  { period: 'Lunch', start: '11:25', end: '11:55'},
  { period: 'Passing Time', start: '11:55', end: '12:01'},
  { period: 'Block 4', start: '12:01', end: '13:09'},
  { period: 'Passing Time', start: '13:09', end: '13:15'},
  { period: 'Block 5', start: '13:15', end: '14:23'}
]

const dohsTuesdayFridaySchedule = [
  { period: 'Block 1', start: '08:30', end: '09:53' },
  { period: 'Brunch', start: '09:53', end: '10:00' },
  { period: 'Passing Time', start: '10:00', end: '10:06' },
  { period: 'Block 2', start: '10:06', end: '11:29' },
  { period: 'Passing Time', start: '11:29', end: '11:35' },
  { period: 'Intervention', start: '11:35', end: '12:11' },
  { period: 'Lunch', start: '12:11', end: '12:41' },
  { period: 'Passing Time', start: '12:41', end: '12:47' },
  { period: 'Block 4', start: '12:47', end: '14:10' },
  { period: 'Passing Time', start: '14:10', end: '14:16' },
  { period: 'Block 5', start: '14:16', end: '15:39' }
];


var schedule = [];
  
  function updateSchedule() {
    var currentTime;
    var timeOffset = Cookies.get('timeOffset');
    if(timeOffset != undefined && timeOffset != "" && timeOffset != null){
      currentTime = new Date(new Date().getTime() + timeOffset*1000);
    }
    else{
      currentTime = new Date();
    }
    const currentDay = currentTime.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ...)

    if(currentDay == 1){
      document.getElementById("scheduleName").innerHTML = schoolAcronym+" Monday Schedule";
    }
    else{
      document.getElementById("scheduleName").innerHTML = schoolAcronym+" Tuesday-Friday Schedule";
    }
  
    // Check if it's a weekend (Saturday or Sunday)
    if ((currentDay == 0 || currentDay == 6) && schoolAcronym != "DEMO" && schoolAcronym != "CUSTOM") {
      document.getElementById('period').textContent = 'Weekend';
      document.getElementById('time-left').textContent = '';
      document.getElementById('day-progress').textContent = '';
      document.getElementById('period-progress').textContent = '';
      document.getElementById("target-battery").innerHTML = "";
      document.getElementById("scheduleName").innerHTML = "No schedule today";
      return;
    }
  
    // Find the current period
    const currentPeriod = schedule.find((period) => {
      const startTime = new Date();
      startTime.setHours(Number(period.start.split(':')[0]));
      startTime.setMinutes(Number(period.start.split(':')[1]));
      startTime.setSeconds(0);
  
      const endTime = new Date();
      endTime.setHours(Number(period.end.split(':')[0]));
      endTime.setMinutes(Number(period.end.split(':')[1]));
      endTime.setSeconds(0);
  
      return currentTime >= startTime && currentTime <= endTime;
    });
  
    if (currentPeriod) {
      const endTime = new Date();
      endTime.setHours(Number(currentPeriod.end.split(':')[0]));
      endTime.setMinutes(Number(currentPeriod.end.split(':')[1]));
      endTime.setSeconds(0);

      const dayEndTime = new Date();
      dayEndTime.setHours(Number(schedule[schedule.length-1].end.split(':')[0]));
      dayEndTime.setMinutes(Number(schedule[schedule.length-1].end.split(':')[1]));
      dayEndTime.setSeconds(0);
  
      const timeLeft = new Date(endTime - currentTime);
      const minutesLeft = timeLeft.getMinutes();
      const totalMinutesLeft = Math.floor(timeLeft / (1000 * 60)); // bugfix to allow minutes over 60
      const secondsLeft = timeLeft.getSeconds();
  
      const periodStart = new Date();
      periodStart.setHours(Number(currentPeriod.start.split(':')[0]));
      periodStart.setMinutes(Number(currentPeriod.start.split(':')[1]));
      periodStart.setSeconds(0);
  
      const totalMinutesInPeriod = (endTime - periodStart) / (1000 * 60);
      const minutesElapsed = totalMinutesInPeriod - (timeLeft / (1000 * 60));
      const periodProgress = (minutesElapsed / totalMinutesInPeriod) * 100;
  
      document.getElementById('period').textContent = currentPeriod.period;
      if(fsMode){ // DEPRECATED
        const formattedSecondsLeft = secondsLeft.toString().padStart(2, '0');
        const formattedMinutesLeft = minutesLeft.toString().padStart(2, '0');
        document.getElementById('time-left').textContent = `${formattedMinutesLeft}:${formattedSecondsLeft}`;
        document.getElementById("title").innerHTML = `${formattedMinutesLeft}:${formattedSecondsLeft} - Class Clock`;
      }
      else{ // MAIN TIME CALCULATION LOGIC
        if (totalMinutesLeft < 1) {
          var decimalSecondsLeft = secondsLeft + (timeLeft.getMilliseconds() / 1000);
          finalCountdownAnimation(decimalSecondsLeft, secondsLeft);
          return;
        }

        const formattedSecondsLeft = secondsLeft.toString().padStart(2, '0');
        const formattedMinutesLeft = totalMinutesLeft.toString().padStart(2, '0');
        // if page is display.html, do not add remaining to the end
        if (window.location.href.indexOf("display.html") > -1 || window.location.href.indexOf("display") > -1) {
          document.getElementById('time-left').textContent = `${formattedMinutesLeft}:${formattedSecondsLeft}`;
        }
        else {
        document.getElementById('time-left').textContent = `${formattedMinutesLeft}:${formattedSecondsLeft} remaining`;
        }
        document.getElementById("title").innerHTML = `${formattedMinutesLeft}:${formattedSecondsLeft} - Class Clock`;
      }
      document.getElementById('period-progress').textContent = `Period Progress: ${periodProgress.toFixed(1)}%`;
  
      // Calculate the overall school day progress
      const schoolStart = new Date();
      schoolStart.setHours(9);
      schoolStart.setMinutes(0);
      schoolStart.setSeconds(0);
      const totalMinutesInSchoolDay = (dayEndTime - schoolStart) / (1000 * 60);
      const schoolDayElapsed = (currentTime - schoolStart) / (1000 * 60);
      const dayProgress = (schoolDayElapsed / totalMinutesInSchoolDay) * 100;
  
      document.getElementById('day-progress').textContent = `Day Progress: ${dayProgress.toFixed(1)}%`;
      if(Math.round(100-dayProgress)+10 >= 100){
        document.getElementById("target-battery").innerHTML = "Ideal Phone Battery: 100%";
      }
      else{
        document.getElementById("target-battery").innerHTML = "Ideal Phone Battery: "+(Math.round(100-dayProgress)+10)+"%";
      }
    } else {
      document.getElementById('period').textContent = 'Class is not in session';
      document.getElementById('time-left').textContent = '';
      document.getElementById('day-progress').textContent = '';
      document.getElementById('period-progress').textContent = '';
      document.getElementById("target-battery").innerHTML = "";
      document.getElementById("title").innerHTML = "Class Clock";
    }
  }

  setInterval(updateSchedule, 200);


function fsCountdown(){
  var elementsToHide = document.getElementsByClassName("hide");
  if(fsMode){
    renderIdealBattery();
    for(var i = 0; i < elementsToHide.length; i++){
      elementsToHide[i].style.display = "block";
      document.getElementById("time-left").style.fontSize = "4em";
    }
  }
  else{
    document.getElementById("target-battery").style.display = "none"; // hide ideal battery
    for(var i = 0; i < elementsToHide.length; i++){
      elementsToHide[i].style.display = "none";
      document.getElementById("time-left").style.fontSize = "35vw";
    }
  }
  fsMode = !fsMode;
}


function enableBgImg(){
  document.body.style.backgroundImage = 'url("https://cdn.reuben.zip/classclock/background.jpg")';
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
  document.getElementById("bgImg").innerHTML = "<p>Background Image Enabled</p><button onclick=\"window.location.href='/'\">Disable image</button>";
}

function toggleTextColor(){
  if(document.getElementById("body").style.color == "white"){
    document.getElementById("body").style.color = "black";
  }
  else{
    document.getElementById("body").style.color = "white";
  }
}

function switchTheme(themeName){
  if(themeName == "default"){
    document.body.style.background = "linear-gradient(70deg, #27a051 0%, #b18610 50%, #850505 100%)";
    document.getElementById("body").style.color = "white";
  }
  if(themeName == "old-default"){
    document.body.style.background = "linear-gradient(90deg, rgba(29,140,0,1) 0%, rgba(190,195,255,1) 50%, rgba(255,188,0,1) 100%)";
    document.getElementById("body").style.color = "black";
  }
  if(themeName == "romania"){
    document.body.style.background = "linear-gradient(90deg, #002B7F, #FCD116, #CE1126)";
    document.getElementById("body").style.color = "black";
  }
  if(themeName == "woodland"){
    document.body.style.background = "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(3,75,0,1) 100%)";
    document.getElementById("body").style.color = "white";
  }
  if(themeName == "bah-bah"){
    document.body.style.background = "linear-gradient(90deg, #0cd46d 0%, #1bc4d0 50%, #144ac8 100%)"
    document.getElementById("body").style.color = "black";
  }
  if(themeName == "craig"){
    document.body.style.background = "linear-gradient(90deg, #ff0000 0%, #85008f 50%, #0008ff 100%)"
    document.getElementById("body").style.color = "white";
  }
}

// JS entrypoint
function setThemeFromUrl() {
  setScheduleFromSchool();
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get('theme');
  if (theme) {
    if (theme == "custom"){
      var data = JSON.parse(Cookies.get('custom-theme'));
      loadCustomTheme(data);
    }
    else{
      switchTheme(theme);
    }

    Cookies.set('theme', theme, { expires: 30 });
    document.location.href = "/";
  }
  else if(Cookies.get('theme') != undefined){
    if(Cookies.get('theme') == "custom"){
      var data = JSON.parse(Cookies.get('custom-theme'));
      loadCustomTheme(data);
    }
    else{
      switchTheme(Cookies.get('theme'));
    }
  }

  whatsNewInit();

  updateSchedule();
}

function importTheme(){
      const data = prompt("Paste the theme data here:");
      Cookies.set('custom-theme', data, { expires: 30 });
      loadCustomTheme(JSON.parse(data));
      setTimeout(function(){ window.location.href = "/?theme=custom"; }, 300);
}

function loadCustomTheme(data){
  if(data.themeVersion != 1){
    alert("This theme is not compatible with this version of Class Clock.")
  }
  else{
    document.body.style.background = data.cssGradient;
    document.getElementById("body").style.color = data.fontColor;
    if(data.themeFont != undefined){
      document.getElementById("body").style.fontFamily = data.themeFont;
    }
    document.getElementById("customThemeName").innerHTML += '<br>custom theme "'+data.themeName+'" is active<br>';
  }
}

function setScheduleFromSchool(){
  var schoolName = Cookies.get('school');
  if (schoolName == undefined){
    window.location.href = "/school-select.html";
    return;
  }
  
  if(schoolName == "whs"){
    console.log("School = WHS");
    schoolAcronym = "WHS";
    setScheduleVar(whsmondaySchedule,whsTueThruFriSchedule);
  }
  else if(schoolName == "wms"){
    console.log("School = WMS");
    schoolAcronym = "WMS";
    setScheduleVar(wmsMondaySchedule,wmsTueThruFriSchedule);
  }
  else if(schoolName == "dohs"){
    console.log("School = DOHS");
    schoolAcronym = "DOHS";
    setScheduleVar(dohsMondaySchedule,dohsTuesdayFridaySchedule);
  }
  else if(schoolName == "demo"){
    console.log("School = DEMO");
    schoolAcronym = "DEMO";
    setScheduleVar(demoSchedule,demoSchedule);
  }
  else if(schoolName == "custom"){
    console.log("School = CUSTOM");
    schoolAcronym = "CUSTOM";
    loadCustomSchedule();
    setScheduleVar(customSchedule,customSchedule);
  }
  else{
    alert("School not added yet! Check back later.");
    window.location.href = "/school-select.html";
  }
}

function setScheduleVar(monSchedVar,ttfSchedVar){
  const currentTime = new Date();
  const currentDay = currentTime.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ...)
  
  if(currentDay == 1){
    schedule = monSchedVar;
  }
  else{
    schedule = ttfSchedVar;
  }
}

function toggleIdealBattery(){
  if(showIdealBattery == false){
    document.getElementById("target-battery").style.display = "block";
    showIdealBattery = true;
  }
  else{
    document.getElementById("target-battery").style.display = "none";
    showIdealBattery = false;
  }
}

function renderIdealBattery(){
  if(showIdealBattery == true){
    document.getElementById("target-battery").style.display = "block";
  }
  else{
    document.getElementById("target-battery").style.display = "none";
  }
}

function loadCustomSchedule(){
  customSchedule = JSON.parse(localStorage.getItem('customSchedule'));
  if(customSchedule == null){
      customSchedule = [];
      window.location.href = "/custom-schedule-editor.html";
  }
}

function saveTimeOffset(){
  var offset = document.getElementById("timeOffset").value;
  if(offset > -60 && offset < 60){
    Cookies.set('timeOffset', offset, { expires: 60 });
  }
}

setTimeout(() => {
  var timeOffset = Cookies.get('timeOffset');
  if(timeOffset != undefined && timeOffset != "" && timeOffset != null){
    document.getElementById("timeOffset").value = timeOffset;
  }
}, 2000);

function whatsNewAcknowledge() {
  $('#whats-new').modal('hide');
  Cookies.set('lastWhatsNewVersion', document.getElementById("whatsNewVersion").innerHTML, { expires: 365 });
}

function whatsNewInit() {
  var lastSeenVersion = Cookies.get('lastWhatsNewVersion');
  var currentVersion = document.getElementById("whatsNewVersion").innerHTML;

  if (lastSeenVersion != currentVersion) {
    var showWhatsNew = true;
  }
  else {
    var showWhatsNew = false;
  }

  if(showWhatsNew){
    var myModal = new bootstrap.Modal(document.getElementById('whats-new'), {
        keyboard: false,
        backdrop: 'static'
    });
    myModal.show();
  }
}

var lastSecond = 0;
var curFontSize = 4;
function finalCountdownAnimation(secondsLeft, formattedSecs){
  document.getElementById("title").innerHTML = "🚨🚨🚨";
  document.getElementById("time-left").innerHTML = formattedSecs;
  document.getElementById("time-left").style.fontSize = curFontSize + "em";
  document.getElementById("period").style.display = "none";
  document.getElementById("period-progress").style.display = "none";
  document.getElementById("day-progress").style.display = "none";
  document.getElementById("scheduleName").style.display = "none";
  document.getElementById("ccu-container").style.display = "none";
  document.getElementById("settings-btn").style.display = "none";

  var blurAmt = Math.pow((61 - secondsLeft) / 40, 15);
  var darknessAmt = (61 - secondsLeft) / 61;

  document.documentElement.style.filter = "brightness(" + (1.5 - darknessAmt) + ")";

  if(formattedSecs != lastSecond){
    lastSecond = formattedSecs;

    curFontSize += 0.3;
  }

  if (formattedSecs == 0) {
    document.getElementById("time-left").style.display = "none";
    document.getElementById("body").style.background = "red";
    document.documentElement.style.filter = "brightness(1)";
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
}