function setThemeFromUrl() {
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

    showNumDaysLeft();
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
      document.getElementById("bgImg").innerHTML += '<br>Custom theme "'+data.themeName+'" is active.<br>';
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

  function showNumDaysLeft(){
    var today = new Date();
    var summerBreak = new Date("2024-08-27");
    var diff = summerBreak - today;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("time-left").innerHTML = days + " days remaining";
  }

  setInterval(() => {
    showNumDaysLeft();
  }, 5000);