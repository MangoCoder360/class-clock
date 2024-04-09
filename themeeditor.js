function compileTheme(){
    const cssGradient = createCssGradientFromColors();
    const fontColor = document.getElementById('fontColor').value;
    const themeName = document.getElementById('themeName').value;
    const themeFont = document.getElementById('themeFont').value;
    const theme = {
        cssGradient,
        fontColor,
        themeName,
        themeFont,
        themeVersion: 1
    };
    const themeJSON = JSON.stringify(theme);
    document.getElementById('themeJSON').innerHTML = themeJSON;

    document.getElementById('themePreview').style.background = cssGradient;
    document.getElementById('themePreview').style.color = fontColor;
    document.getElementById('themePreviewText').style.fontFamily = themeFont;
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
    const rotation = document.getElementById('rotation').value;
    if (rotation > 360){
        document.getElementById('rotation').value = 360;
        setTimeout(compileTheme, 200);
    }
    if (rotation < 0){
        document.getElementById('rotation').value = 0;
        setTimeout(compileTheme, 200);
    }
    const cssGradient = "linear-gradient("+rotation+"deg, "+color1+" 0%, "+color2+" 50%, "+color3+" 100%)";
    return cssGradient;
}