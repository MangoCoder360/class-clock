var fsMode = false;

const schedule = [
    { period: 'Period 1', start: '09:00', end: '09:55' },
    { period: 'Period 2', start: '10:00', end: '10:54' },
    { period: 'Period 3', start: '10:59', end: '11:53' },
    { period: 'Lunch', start: '11:53', end: '12:23' },
    { period: 'Period 4', start: '12:28', end: '13:22' },
    { period: 'GRIT 101', start: '13:27', end: '13:52' },
    { period: 'Period 5', start: '13:57', end: '14:51' },
    { period: 'Period 6', start: '14:56', end: '15:50' },
  ];
  
  function updateSchedule() {
    const currentTime = new Date();
    const currentDay = currentTime.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ...)
  
    // Check if it's a weekend (Saturday or Sunday)
    if (currentDay === 0 || currentDay === 6) {
      document.getElementById('period').textContent = 'Weekend';
      document.getElementById('time-left').textContent = '';
      document.getElementById('day-progress').textContent = '';
      document.getElementById('period-progress').textContent = '';
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
        document.getElementById('time-left').textContent = `${minutesLeft}:${secondsLeft}`;
      }
      else{
        document.getElementById('time-left').textContent = `${minutesLeft}:${secondsLeft} remaining`;
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
    } else {
      document.getElementById('period').textContent = 'Class is not in session';
      document.getElementById('time-left').textContent = '';
      document.getElementById('day-progress').textContent = '';
      document.getElementById('period-progress').textContent = '';
    }
  }

  setInterval(updateSchedule, 200);


function fsCountdown(){
  var elementsToHide = document.getElementsByClassName("hide");
  if(fsMode){
    for(var i = 0; i < elementsToHide.length; i++){
      elementsToHide[i].style.display = "block";
      document.getElementById("time-left").style.fontSize = "4em";
    }
  }
  else{
    for(var i = 0; i < elementsToHide.length; i++){
      elementsToHide[i].style.display = "none";
      document.getElementById("time-left").style.fontSize = "20vw";
    }
  }
  fsMode = !fsMode;
}