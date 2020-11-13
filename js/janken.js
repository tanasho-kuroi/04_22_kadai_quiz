// ・html
// 表示に必要な「要素」を記載する。
// ・js(JavaScript)
// 各ボタンやテキストの「動作」を記載する。
// ・css
// 各要素の「レイアウト」を記載する。


// 定数の設定
let janken_value;
let janken_value_com;
let janken_versus;
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

//改行コード変換関数
var nl2br = function (str) {
    return str.replace(/\n/g, '<br>');
};
//勝ち負けを関数化
// 単純に「数値の差がこうなれば勝ち負けあいこ」を設定しただけ
const JankenJudgement = (janken_value, janken_value_com) => {
    janken_versus = (janken_value - janken_value_com + 3) % 3;
    if (janken_versus == 2) {
        janken_result = win_text;
    } else if (janken_versus == 1) {
        janken_result = lose_text;
    } else if (janken_versus == 0) {
        janken_result = draw_text;
    }
    return janken_result;
}

// 乱数＆コンピュータの手代入を関数化
const JankenValueCOM = () => {
    janken_value_com = Math.floor(Math.random() * 3);
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
    return janken_text;
}

// 表示アウトプットの共通化関数
const JankenResultOutput = (janken_text, janken_result) => {
    $('#computer_hand').html('コンピュータ：' + janken_text);
    $('#judgment').html(janken_result);
}
// チートモード時の事前に手を知る時の表示アウトプットを関数化
const JankenJizenOutput = (janken_text) => {
    $('#computer_hand').html('コンピュータ：' + janken_text);
    $('#judgment').html('結果は？');
}

// グーチョキパー出した時の処理まとめ(ノーマルモード) <-ボツ予定。最初がjanken_value_com不明になる。あまりリソースかけるところではないかも
const JankenProcessNormal = (janken_value, janken_value_com, janken_text, janken_result) => {
    JankenValueCOM();
    janken_result = JankenJudgement(janken_value, janken_value_com);
    JankenResultOutput(janken_text, janken_result);
}

const JankenProcessCheat = (janken_value, janken_value_com, janken_result) => {
    janken_result = JankenJudgement(janken_value, janken_value_com);
    $('#judgment').html(janken_result);//COMの手はチートで既に出しているので、結果のみ出力
}

////////////////////////////////////////////////////////////////////////////////////////////
// チートモードのクリック判定
let cheat_mode_value = 0;
let main_title_text = '真剣じゃんけん！';
let sub_title_text = 'たかがジャンケン？\nジャンケンはいつでも真剣勝負だ！！';
// var sub_title_text = nl2br(json[0].sub_title_text);// 改行コード→<br>変換

$('#main-title').html(main_title_text);
$('#sub-title').html(sub_title_text);

$('#cheat_mode').on('click', function () {
    cheat_mode_value = cheat_mode_value ^ 1;
    console.log(cheat_mode_value);
    $('#computer_hand').html('コンピュータ：');
    $('#judgment').html('結果は？');
    var popup = document.getElementById('js-popup');

    if (cheat_mode_value == 0) {
        $('#cheat_mode_state').html('');
        document.getElementById('cheat_jizen_button').style.visibility = 'hidden';//事前ボタンの動的な表示/非表示
        document.getElementById('page-top').classList.remove('title-banner2');
        document.getElementById('page-top').classList.add('title-banner1');
        main_title_text = '真剣じゃんけん！';
        sub_title_text = 'たかがジャンケン？\nジャンケンはいつでも真剣勝負だ！！';
    } else if (cheat_mode_value == 1) {
        popup.classList.add('is-show');//ポップアップ表示
        popupImage(popup);//ポップアップ表示
        $('#cheat_mode_state').html('後出しモード！！');
        document.getElementById('cheat_jizen_button').style.visibility = 'visible';
        document.getElementById('page-top').classList.remove('title-banner1');
        document.getElementById('page-top').classList.add('title-banner2');
        main_title_text = '後出しじゃんけん！';
        sub_title_text = 'たかがジャンケンだろ？\nムキになるなよ';
    }
    // var sub_title_text = nl2br(json[0].sub_title_text);// 改行コード→<br>変換

    $('#main-title').html(main_title_text);
    $('#sub-title').html(sub_title_text);
})



////////////////////////////////////////////////////////////////////////////////////////////
// チートモード突入時のポップアップ(jQuery使わずやってみた)
function popupImage(popup) {
    // var popup = document.getElementById('js-popup');
    if (!popup) return;

    // popup.classList.add('is-show');

    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');
    // var showBtn = document.getElementById('js-show-popup');

    closePopUp(blackBg);
    closePopUp(closeBtn);
    // closePopUp(showBtn);
    var elem = 1;
    function closePopUp(elem) {
        if (!elem) return;
        elem.addEventListener('click', function () {
            popup.classList.remove('is-show');
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////
// 事前にコンピュータの手を知る
$('#cheat_mode_jizen').on('click', function () {
    JankenValueCOM();
    console.log(janken_text);
    JankenJizenOutput(janken_text);
})

////////////////////////////////////////////////////////////////////////////////////////////

//0~2の乱数を出し、それが グー/チョキ/パー となる様に割り当てる
//ノーマルモード時：コンピュータの手と結果の出力
//チートモード時：結果の出力(コンピュータの手は事前に知るから)

// グー押下時
$('#gu_btn').on('click', function () {
    janken_value = gu_value;
    console.log(janken_value);
    if (cheat_mode_value == 0) {
        JankenValueCOM();
        janken_result = JankenJudgement(janken_value, janken_value_com);
        JankenResultOutput(janken_text, janken_result);
        // JankenProcessNormal(janken_value, janken_value_com, janken_text, janken_result)//上３行を関数化しようとしたけど、難しそうだから後回し
    } else if (cheat_mode_value == 1) {
        janken_value = gu_value;
        JankenProcessCheat(janken_value, janken_value_com, janken_result);
    }
})

// チョキ押下時
$('#cho_btn').on('click', function () {
    janken_value = choki_value;
    console.log(janken_value);
    if (cheat_mode_value == 0) {
        JankenValueCOM();
        janken_result = JankenJudgement(janken_value, janken_value_com);
        JankenResultOutput(janken_text, janken_result);
    } else if (cheat_mode_value == 1) {
        janken_value = choki_value;
        JankenProcessCheat(janken_value, janken_value_com, janken_result);
    }
})

// パー押下時
$('#par_btn').on('click', function () {
    janken_value = pa_value;
    console.log(janken_value);
    if (cheat_mode_value == 0) {
        JankenValueCOM();
        janken_result = JankenJudgement(janken_value, janken_value_com);
        JankenResultOutput(janken_text, janken_result);
    } else if (cheat_mode_value == 1) {
        janken_value = pa_value;
        JankenProcessCheat(janken_value, janken_value_com, janken_result);
    }
})







