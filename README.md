# LM35を用いた温度計測プログラム

## 機能
LM35を用いて温度計測が可能  
取得した温度は```temp_x.csv```の形式で出力
```csv
time, temp
14:00:00, 34
14:00:01, 33
```
## 使用機器
- Arduino
- LM35
- PC(OS問わず)
- Node.js
- npm

## 利用方法
下記の利用方法はNode.jsとnpmの導入を前提としたものである。
一応、全て下記URLに書いてあったりする。
https://github.com/rwaldron/johnny-five/wiki/Getting-Started 
### 1. PCのセットアップ
johnny-fiveというライブラリを利用するにあたって各OSごとにセットアップが必要  
下記URLを参考  
https://github.com/rwaldron/johnny-five/wiki/Getting-Started  
Windowsの場合は、管理者権限で起動したPowerShellで行う必要あり。
(PowerShellで行ったとき、VisualStudioTools(?)のインストールが止まるが、Ctrl + Cをしても動く)
### 2. ArduinoにStandardFirmataPlusを書き込み
1. Arduino IDEを起動
2. [ツール] => シリアルポートより COMポート、使用ボードを設定
3. [ファイル] => [スケッチ例] => [Firamata] => [StandardFirmataPlus] と選択後、書き込み

### 3. nodejsのライブラリのインストール
gitでcloneした場合は、```node_modules```が入っているので、必要はないと思うが、一応書いておく。
``` bash
npm install johnny-five
```

### 4. 実行
プログラム上部に温度取得間隔と、ファイル出力間隔を設定する部分がある。  必要があれば設定すること。
```javascript
//取得、出力データ量調整パラメータ---------------------
var get_temp_span = 1;  //温度取得のスパン[s]
var save_csv_span = 5;  //ファイル保存のスパン[s]
//---------------------------------------------------
```
単位はすべて秒である。  
デフォルトでは値の読み取りにArduinoのアナログピン```A0```を使用する。

下記コマンドで実行することができる
``` bash
node mlm35.js
```

### 参考・引用文献
[Qiita javascriptで配列→csv書き出しの実現 - @banaoh](https://qiita.com/banaoh/items/4119c0e23053b1cfa80b)  
[Johnny-five](https://github.com/rwaldron/johnny-five)
