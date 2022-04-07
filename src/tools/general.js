export const getColor=()=>{
    let min = 0
    let max = 255
    var co = "";
    co+=(getRandom(min,max)+",");
    co+=(getRandom(min,max)+",");
    co+=getRandom(min,max);
    return RGB2Hex(co);
}
function getRandom(min,max){
    //x上限，y下限
    var x = max;
    var y = min;
    if(x<y){
        x=min;
        y=max;
    }
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}

/*
* 获取颜色值
* @param rgb, RGB颜色值，如 "23,189,246"
*/
function RGB2Hex(rgb){
    var re = rgb.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");//利用正则表达式去掉多余的部分
    var hexColor = "#";
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < 3; i++) {
        var r = null;
        var c = re[i];
        var hexAr = [];
        while (c > 16) {
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r]);
        }
        hexAr.push(hex[c]);
        hexColor += hexAr.reverse().join('');
    }
    return hexColor;
}