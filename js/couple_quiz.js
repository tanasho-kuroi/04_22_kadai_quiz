// ・html
// 表示に必要な「要素」を記載する。
// ・js(JavaScript)
// 各ボタンやテキストの「動作」を記載する。
// ・css
// 各要素の「レイアウト」を記載する。

//改行コード変換関数
var nl2br = function (str) {
   return str.replace(/\n/g, '<br>');
};

// 日時をいい感じの形式にする関数
function convertFromFirestoreTimestampToDatetime(timestamp) {
   const _d = timestamp ? new Date(timestamp * 1000) : new Date();
   const Y = _d.getFullYear();
   const m = (_d.getMonth() + 1).toString().padStart(2, '0');
   const d = _d.getDate().toString().padStart(2, '0');
   const H = _d.getHours().toString().padStart(2, '0');
   const i = _d.getMinutes().toString().padStart(2, '0');
   const s = _d.getSeconds().toString().padStart(2, '0');
   return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}

// 回答者２人を分けるための変数
let page_value;
// if (localStorage.getItem('page')) {
//    let page_value = localStorage.getItem('page');
// }

//STARTボタンを押した時に回答者を分ける変数を動かす
function start_button_click() {
   let target = document.getElementById('page_transfer');
   if (localStorage.getItem('page')) {
      page_value = localStorage.getItem('page');

      if (page_value == 0) {
         target.href = 'answer1.html';
         console.log(page_value);
         //  console.log(href);
      } else if (page_value == 1) {
         target.href = 'answer2.html';
         console.log(page_value);
         //  console.log(href);
      } else {
         page_value = 0; // 暫定で置いている。本当はSTARTボタンを無効にしたい
         console.log(page_value);
      }
   } else {
      page_value = 0;
   }
   page_value++;
   console.log(page_value);
   //    console.log(target.href);

   //   page_value = page_value + 1;//これだと、文字列を後ろに足していく感じになる(0 -> 01 -> 011)
   localStorage.setItem('page', page_value); // localstorageに保存
}

// 送信ボタンクリック時にデータを送信する処理
$('#send_button').on('click', function () {
   const data = {
      answer1: $('#answer1').val(), //Box内の値を取得
      answer2: $('#answer2').val(), //Box内の値を取得
      answer3: $('#answer3').val(), //Box内の値を取得
      time: firebase.firestore.FieldValue.serverTimestamp(),
   };
   db.add(data);
   //    $('#answer1').val('');
   //    $('#answer2').val('');
   //    $('#answer3').val('');
});

// データをリアルタイムに取得する処理 必要なデータだけ取る！
// onSnapshot:データの変更がある度に、orderBy:並び替え。time:時間で並び替え、(desc:降順。昇順はasc?)
db.orderBy('time', 'desc').onSnapshot(function (querySnapshot) {
   console.log(querySnapshot.docs);
   var dataArray = []; //必要なデータだけが入った配列(リロードしても最初から入っている？)
   console.log(dataArray);
   querySnapshot.docs.forEach(function (doc) {
      //querySnapshot.docsの要素数だけループ
      const data = {
         id: doc.id, //自動で指定しているドキュメントのID
         data: doc.data(), //上記IDのドキュメントの中身
      };

      dataArray.push(data); //dataArrayの末尾にdata追加(dataが一つのドキュメント情報、dataArrayが全てを入れた配列)
      console.log(data);
      console.log(dataArray);
   });
   var tagArray = [];
   dataArray.forEach(function (data) {
      //上記で取得した情報をページ上に出力するためにデータを整えるところ
      //dataArrayの要素数だけループ
      const tag = `
                <li id=${data.id}>
                  <p>${data.data.name}</p>
                  <p>${data.data.text}</p>

                </li>
              `;
      //   tagArray.push(tag);
      tagArray = tag;
   });
   $('#output').html(tagArray);
});
//    <p>${convertFromFirestoreTimestampToDatetime(
//      data.data.time.seconds
//   )}</p>//時間情報を読める形に変換

////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
