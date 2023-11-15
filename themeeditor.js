function compileTheme(){
    const cssGradient = createCssGradientFromColors();
    const fontColor = document.getElementById('fontColor').value;
    const themeName = document.getElementById('themeName').value;
    const theme = {
        cssGradient,
        fontColor,
        themeName,
        themeVersion: 1
    };
    const themeJSON = JSON.stringify(theme);
    document.getElementById('themeJSON').innerHTML = themeJSON;
}

function exportTheme(){
    const cssGradient = createCssGradientFromColors();
    const fontColor = document.getElementById('fontColor').value;
    const themeName = document.getElementById('themeName').value;
    downloadBin(cssGradient, fontColor, themeName);
}

function downloadBin(cssGradient, fontColor, themeName){
    const data = {
        cssGradient,
        fontColor,
        themeName,
        themeVersion: 1
    };
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cctheme-'+themeName+'.bin';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function createCssGradientFromColors(){
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const color3 = document.getElementById('color3').value;
    const cssGradient = "linear-gradient(90deg, "+color1+" 0%, "+color2+" 50%, "+color3+" 100%)";
    return cssGradient;
}