setTimeout(function() {
  location.reload();
}, 300000);

var fsMode = false;
var schoolAcronym;
var showIdealBattery = false;

var customSchedule = [];

const demoSchedule = [
    { period: 'DEMO', start: '06:00', end: '22:00' }
];

const whsTueThruFriSchedule = [
  { period: 'Before School', start: '08:45', end: '09:00' },
  { period: 'Period 1', start: '09:00', end: '09:55' },
  { period: 'Passing Time', start: '09:55', end: '10:00' },
  { period: 'Period 2', start: '10:00', end: '10:54' },
  { period: 'Passing Time', start: '10:54', end: '10:59' },
  { period: 'Period 3', start: '10:59', end: '11:53' },
  { period: 'Passing Time', start: '11:53', end: '11:58' },
  { period: 'Lunch', start: '11:58', end: '12:23' },
  { period: 'Period 4', start: '12:28', end: '13:22' },
  { period: 'Passing Time', start: '13:22', end: '13:27' },
  { period: 'GRIT 101', start: '13:27', end: '13:52' },
  { period: 'Passing Time', start: '13:52', end: '13:57' },
  { period: 'Period 5', start: '13:57', end: '14:51' },
  { period: 'Passing Time', start: '14:51', end: '14:56' },
  { period: 'Period 6', start: '14:56', end: '15:50' },
];

const whsmondaySchedule = [
  { period: 'Period 1', start: '10:15', end: '11:05' },
  { period: 'Passing Time', start: '11:05', end: '11:10' },
  { period: 'Period 2', start: '11:10', end: '11:56' },
  { period: 'Passing Time', start: '11:56', end: '12:01' },
  { period: 'Period 3', start: '12:01', end: '12:47' },
  { period: 'Passing Time', start: '12:47', end: '12:52' },
  { period: 'Lunch', start: '12:52', end: '13:17' },
  { period: 'Period 4', start: '13:22', end: '14:08' },
  { period: 'Passing Time', start: '14:08', end: '14:13' },
  { period: 'Period 5', start: '14:13', end: '14:59' },
  { period: 'Passing Time', start: '14:59', end: '15:04' },
  { period: 'Period 6', start: '15:04', end: '15:50' },
];

const wmsTueThruFriSchedule = [
  { period: 'Period 1/Homeroom', start: '08:45', end: '09:34' },
  { period: 'Period 2', start: '09:38', end: '10:26' },
  { period: 'Period 3', start: '10:30', end: '11:18' },
  { period: '6th Grade Lunch / Recess', start: '11:22', end: '11:57' },
  { period: '5th Grade Lunch / Recess', start: '11:22', end: '11:57' },
  { period: 'Period 4', start: '12:01', end: '12:49' },
  { period: 'Period 5', start: '12:53', end: '13:41' },
  { period: 'Period 6', start: '13:45', end: '14:33' },
  { period: 'Period 7', start: '14:37', end: '15:25' },
];

const wmsMondaySchedule = [
  { period: 'Period 1', start: '10:00', end: '10:33' },
  { period: 'Period 2', start: '10:37', end: '11:10' },
  { period: 'Period 3', start: '11:14', end: '11:47' },
  { period: '6th Grade Lunch / Recess', start: '11:47', end: '12:22' },
  { period: '5th Grade Lunch / Recess', start: '11:47', end: '12:22' },
  { period: 'Period 4', start: '12:26', end: '13:03' },
  { period: 'Period 5', start: '13:07', end: '13:40' },
  { period: 'Period 6', start: '13:44', end: '14:17' },
  { period: 'Period 7', start: '14:21', end: '14:54' },
  { period: 'Trojan Time', start: '14:58', end: '15:25' },
];



var schedule = [];
  
  function updateSchedule() {
    const currentTime = new Date();
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
      dayEndTime.setHours(15);
      dayEndTime.setMinutes(50);
      dayEndTime.setSeconds(0);
  
      const timeLeft = new Date(endTime - currentTime);
      const minutesLeft = timeLeft.getMinutes();
      const secondsLeft = timeLeft.getSeconds();
  
      const periodStart = new Date();
      periodStart.setHours(Number(currentPeriod.start.split(':')[0]));
      periodStart.setMinutes(Number(currentPeriod.start.split(':')[1]));
      periodStart.setSeconds(0);
  
      const totalMinutesInPeriod = (endTime - periodStart) / (1000 * 60);
      const minutesElapsed = totalMinutesInPeriod - (timeLeft / (1000 * 60));
      const periodProgress = (minutesElapsed / totalMinutesInPeriod) * 100;
  
      document.getElementById('period').textContent = currentPeriod.period;
      if(fsMode){
        const formattedSecondsLeft = secondsLeft.toString().padStart(2, '0');
        const formattedMinutesLeft = minutesLeft.toString().padStart(2, '0');
        document.getElementById('time-left').textContent = `${formattedMinutesLeft}:${formattedSecondsLeft}`;
        document.getElementById("title").innerHTML = `${formattedMinutesLeft}:${formattedSecondsLeft} - Class Clock`;
      }
      else{
        const formattedSecondsLeft = secondsLeft.toString().padStart(2, '0');
        const formattedMinutesLeft = minutesLeft.toString().padStart(2, '0');
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

  setInterval(updateSchedule, 300);


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

function setThemeFromUrl() {
  setScheduleFromSchool();
  updateSchedule();
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get('theme');
  if (theme) {
    if(theme == "img"){
      enableBgImg();
    }
    else if (theme == "custom"){
      var data = JSON.parse(Cookies.get('custom-theme'));
      loadCustomTheme(data);
    }
    else{
      switchTheme(theme);
    }
  }
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
    document.getElementById("bgImg").innerHTML += '<br>Custom theme "'+data.themeName+'" is active.<br>';
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