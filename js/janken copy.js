// ・html
// 表示に必要な「要素」を記載する。
// ・js(JavaScript)
// 各ボタンやテキストの「動作」を記載する。
// ・css
// 各要素の「レイアウト」を記載する。


//チートモードとノーマルモードを完全に分けた状態



// 定数の設定
let janken_value;
let janken_value_com;
let janken_text;
let janken_result;
let result_output;
const gu_value = 0;
const choki_value = 1;
const pa_value = 2;
const gu_text = 'グー';
const choki_text = 'チョキ';
const pa_text = 'パー';
const win_text = 'あなたの勝ち';
const lose_text = 'あなたの負け';
const draw_text = 'あいこ';

//勝ち負けを関数化
// 単純に数値の差がこうなれば「勝ち負けあいこ」を設定しただけ
const JankenJudgement = (janken_value, janken_value_com) => {
    if (janken_value - janken_value_com == -1 || janken_value - janken_value_com == 2) {
        janken_result = win_text;
    } else if (janken_value - janken_value_com == -2 || janken_value - janken_value_com == 1) {
        janken_result = lose_text;
    } else if (janken_value - janken_value_com == 0) {
        janken_result = draw_text;
    }
    return janken_result;
}

// 表示アウトプットの共通化関数
const JankenResultOutput = (janken_text, janken_result) => {
    $('#computer_hand').html("コンピュータ：" + janken_text);
    $('#judgment').html(janken_result);
}
// チートモード時の事前に手を知る時の表示アウトプット
const JankenJizenOutput = (janken_text) => {
    $('#computer_hand').html("コンピュータ：" + janken_text);
    $('#judgment').html("結果は？");
}



// //0~2の乱数を出し、それが グー/チョキ/パー となる様に割り当てる
// //グーチョキパー押下時の処理をそれぞれ記載
// // グー押下時
// $('#gu_btn').on('click', function () {
//     janken_value = gu_value;
//     console.log(janken_value);
//     const janken_value_com = Math.floor(Math.random() * 3);
//     console.log(janken_value_com);
//     switch (janken_value_com) {
//         case gu_value:
//             janken_text = gu_text;
//             break;
//         case choki_value:
//             janken_text = choki_text;
//             break;
//         case pa_value:
//             janken_text = pa_text;
//             break;
//     }
//     result_output = JankenJudgement(janken_value, janken_value_com);
//     console.log(janken_result);
//     JankenResultOutput(janken_text, janken_result);

// })

// // チョキ押下時
// $('#cho_btn').on('click', function () {
//     janken_value = choki_value;
//     console.log(janken_value);
//     const janken_value_com = Math.floor(Math.random() * 3);
//     console.log(janken_value_com);
//     switch (janken_value_com) {
//         case gu_value:
//             janken_text = gu_text;
//             break;
//         case choki_value:
//             janken_text = choki_text;
//             break;
//         case pa_value:
//             janken_text = pa_text;
//             break;
//     }
//     result_output = JankenJudgement(janken_value, janken_value_com);
//     console.log(janken_result);
//     JankenResultOutput(janken_text, janken_result);
// })

// // パー押下時
// $('#par_btn').on('click', function () {
//     janken_value = pa_value;
//     console.log(janken_value);
//     const janken_value_com = Math.floor(Math.random() * 3);
//     console.log(janken_value_com);
//     switch (janken_value_com) {
//         case gu_value:
//             janken_text = gu_text;
//             break;
//         case choki_value:
//             janken_text = choki_text;
//             break;
//         case pa_value:
//             janken_text = pa_text;
//             break;
//     }
//     result_output = JankenJudgement(janken_value, janken_value_com);
//     console.log(janken_result);
//     JankenResultOutput(janken_text, janken_result);
// })



////////////////////////////////////////////////////////////////////////////////////////////////
// チートモードのクリック判定
let cheat_mode_value = 0;
// function cheat_mode_state(cheat_mode_value) {
$('#cheat_mode').on('click', function () {
    cheat_mode_value = cheat_mode_value ^ 1;
    console.log(cheat_mode_value);
    $('#computer_hand').html("コンピュータ：");
    $('#judgment').html("結果は？");


    ////////////////////////////////////////////////////////////////////////////////////////////////

    // ノーマルモードかチートモード 分岐
    if (cheat_mode_value == 1) { // CheatModeJanken()
        // document.getElementById("cheat_mode_jizen").disabled = ""; //事前ボタンの有効化
        // 事前にコンピュータの手を知る
        $('#cheat_mode_jizen').on('click', function () {
            const janken_value_com = Math.floor(Math.random() * 3);
            console.log(janken_value_com);
            switch (janken_value_com) {
                case gu_value:
                    janken_text = gu_text;
                    break;
                case choki_value:
                    janken_text = choki_text;
                    break;
                case pa_value:
                    janken_text = pa_text;
                    break;
            }
            console.log(janken_text);
            JankenJizenOutput(janken_text);

            // コンピュータの手を知ったあとのジャンケン
            $('#gu_btn').on('click', function () {
                janken_text = janken_text;
                janken_value = gu_value;
                janken_result = JankenJudgement(janken_value, janken_value_com);
                console.log(janken_result);
                // JankenResultOutput(janken_text, janken_result);
                $('#judgment').html(janken_result);

            })
            $('#cho_btn').on('click', function () {
                janken_value = choki_value;
                janken_result = JankenJudgement(janken_value, janken_value_com);
                console.log(janken_result);
                // JankenResultOutput(janken_text, janken_result);
                $('#judgment').html(janken_result);
            })
            $('#par_btn').on('click', function () {
                janken_value = pa_value;
                janken_result = JankenJudgement(janken_value, janken_value_com);
                console.log(janken_result);
                // JankenResultOutput(janken_text, janken_result);
                $('#judgment').html(janken_result);
            })
        })



        ////////////////////////////////////////////////////////////////////////////////////////////////

    } else if (cheat_mode_value == 0) { // NormalModeJanken()
        // $('#cheat_mode_jizen').prop('disabled', true)//事前ボタンの無効化。本当はこれを透明化したい。
        // document.getElementById("cheat_mode_jizen").disabled = "disabled";//事前ボタンの無効化

        //0~2の乱数を出し、それが グー/チョキ/パー となる様に割り当てる
        //グーチョキパー押下時の処理をそれぞれ記載
        // グー押下時
        $('#gu_btn').on('click', function () {
            janken_value = gu_value;
            console.log(janken_value);
            const janken_value_com = Math.floor(Math.random() * 3);
            console.log(janken_value_com);
            switch (janken_value_com) {
                case gu_value:
                    janken_text = gu_text;
                    break;
                case choki_value:
                    janken_text = choki_text;
                    break;
                case pa_value:
                    janken_text = pa_text;
                    break;
            }
            result_output = JankenJudgement(janken_value, janken_value_com);
            console.log(janken_result);
            JankenResultOutput(janken_text, janken_result);

        })

        // チョキ押下時
        $('#cho_btn').on('click', function () {
            janken_value = choki_value;
            console.log(janken_value);
            const janken_value_com = Math.floor(Math.random() * 3);
            console.log(janken_value_com);
            switch (janken_value_com) {
                case gu_value:
                    janken_text = gu_text;
                    break;
                case choki_value:
                    janken_text = choki_text;
                    break;
                case pa_value:
                    janken_text = pa_text;
                    break;
            }
            result_output = JankenJudgement(janken_value, janken_value_com);
            console.log(janken_result);
            JankenResultOutput(janken_text, janken_result);
        })

        // パー押下時
        $('#par_btn').on('click', function () {
            janken_value = pa_value;
            console.log(janken_value);
            const janken_value_com = Math.floor(Math.random() * 3);
            console.log(janken_value_com);
            switch (janken_value_com) {
                case gu_value:
                    janken_text = gu_text;
                    break;
                case choki_value:
                    janken_text = choki_text;
                    break;
                case pa_value:
                    janken_text = pa_text;
                    break;
            }
            result_output = JankenJudgement(janken_value, janken_value_com);
            console.log(janken_result);
            JankenResultOutput(janken_text, janken_result);
        })
    }

})
    // }

// }
