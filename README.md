# Gyro-Acce-Logger

加速度と傾きを取るための web app

> **Note**
>
> - android 想定
> - devicemotion, deviceorientationabsolute 　を取得可能（つまり、絶対位置への変換はできてるはず？）
> - 表示は、API から取得した値そのまま
> - 加速度：{x:number|null,y:number|null,z:number|null,time:number}
> - 傾き：{alpha:number|null, beta:number|null, gamma:number|null,time:number|null}

以下注意書き

> **Warning** for tsuji
>
> - ある程度の値までは、spreedsheet にいれられます
> - 多すぎると書き込みできない
> - その場合は、テキスト csv として出力しているので、それを copy & paste してください

> **Warning** for me
>
> - iPhone の対応を考える
