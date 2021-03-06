//Copyright (c) 2012, 2013, 2014 Rick Waldron waldron.rick@gmail.com Licensed under the MIT license. 
//Copyright(c) 2014, 2015 The Johnny - Five Contributors Licensed under the MIT license. 


var five = require('johnny-five');
var fs = require('fs');

//ArduinoIDEなどを使って調べた、Arduinoが接続されているCOMポートを指定
var board = new five.Board({
    port: "COM7"
});
var csv_data = [
  ['time', 'temp']
];
var formatCSV = '';

var repeatTimes = 0; 
var cnt = 0;

//取得、出力データ量調整パラメータ---------------------
var get_temp_span = 1;  //温度取得のスパン[s]
var save_csv_span = 5;  //ファイル保存のスパン[s]
//---------------------------------------------------



//Arduinoボードを定義、セットアップ
board.on("ready", () => {
  const thermometer = new five.Thermometer({
    controller: "LM35",
    pin: "A0"
  });

  setInterval(getThermoData, get_temp_span * 1000, thermometer);
});

//データを取得する
function getThermoData(thermometer) {
  date = new Date();
  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();

  const {celsius} = thermometer;

  var one_line = [hours + ":" + minutes + ":" + seconds, celsius];
  csv_data.push(one_line);
  console.log(csv_data);
  delete Date;
  if(cnt>save_csv_span) {
    cnt=0;
    exportCSV(csv_data);
    csv_data.length = 0;
  }

  cnt++;
}

//データをCSVとしてエクスポート
function exportCSV(content){
  for (var i = 0; i < content.length; i++) {
      var value = content[i];

      for (var j = 0; j < value.length; j++) { var innerValue = value[j]===null?'':value[j].toString(); var result = innerValue.replace(/"/g, '""'); if (result.search(/("|,|\n)/g) >= 0)
      result = '"' + result + '"';
      if (j > 0)
      formatCSV += ',';
      formatCSV += result;
    }
    formatCSV += '\n';
  }
  fs.writeFile('temp_' + repeatTimes +'.csv', formatCSV, 'utf8', function (err) {
    if (err) {
      console.log('could not save...');
    } else {
      console.log("　 ＿＿＿＿∧∧　　／￣￣￣￣￣￣￣￣￣");
      console.log("～' ＿＿＿_(´ー｀)＜　セーブ完了！");
      console.log('　ＵU　　　Ｕ U　　　＼＿＿＿＿＿＿＿＿＿ ');
    }

  });

  repeatTimes++;
}
