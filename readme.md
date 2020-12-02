# カップル・夫婦にまつわるクイズマッチアプリ

## デプロイ先

https://tanasho-kuroi.github.io/04_22_quiz/.

## プロダクトの紹介

-  カップル・夫婦にまつわるクイズが出され、２人それぞれ別で回答する。回答が出揃ったところで答え合わせ。
-  回答し、提出ボタンを押した後、答え合わせボタンを押すと、該当の答えが表示される。
-  答え合わせは自分たちで判定する。
-  ※たとえこのアプリで関係がギクシャクしてしまったとしても、当社は責任を一切持ちません。「全て自己責任」でお願いします。

## 工夫した点，こだわった点

-  提出した任意の答えのみを出力ために、keyword を入れる形式にし、where で照合して合うものを引き出すようにした。
-

## 苦戦した点，共有したいハマりポイントなど

-  (未解決)同じボタンから、違うページに飛ぶ様にしたい(最初にクリックした人は１のページ、次にクリックした人は２のページ)
   →LocalStrage に変数保存して、変数で条件分岐しようとしたが、うまくいっていいない。
-  where で指定してのデータ取得。なぜか get との連携がうまくいかなかった。いまだによくわかっておらず。
-  “.html”について、「Web ページに出力する」ことと思っていましたが、正しくは「HTML のコードのに埋め込む」こと。配列をそのまま出力しようとして盛大にハマった。一要素ごとに<p>タグで囲んで解決。
-

## やり残したこと

-  答え合わせ機能
-  回答スキップ機能(これは一方が申請した場合、他方にスキップ承認依頼が来る。ここで承認/拒否ができる。拒否された場合はスキップできず、回答する必要がある。)
-
-
-

### 詳細記録(雑多)

●●● 　 ◎：完了、○：おおよそ完了、△：いまいち、×：まだ　 ●●●
○HTML ページを３ページ。トップ＆答え合わせ画面と、男女回答画面。
△ どうやって２人が同じゲームに入るか？→ 普通に待機が一番簡単かもだけど、、、できれば合言葉的なもので入室したい。
　・まずは一人目と二人目で入室場所の切り替えができるか？(同じ HTML ページでも OK か？)→ 答え合わせの際の画面が異なるので、別の方が良さそう。
　　 → 引数初期化。初期状態では一人目の回答に飛ぶリンク
　　 → 一回クリックしたらリンク変わる。２人目のリンクに
　　 → ２人目も入ったら、リンクが無効化される
　　※※１人目 → ２人目の判定に LocalStrage 使う！→ うまくいかない。。。後回し！
例えば１回ボタン押したら、ボタン自体がすり替わるというのはどうか？

△ 回答を farebase に保存！そしてそれを表示
　 → とりあえず問題を並べて、それの回答を保存するところまで！
　 → データ取得・表示は where 使っていまくいった。
　 → ページ上に表示するのを考えたときに、.html でめちゃハマった。
　 → ただし自分と相手の回答をいかに切り分けるかは未定。
　 → 表示を分けられていない！

○ 合言葉的なやつを設定する。合言葉が合うやつを where で探して、その値を抽出する。
　 → クエリと where を使って引出した。(下記参考)
https://firebase.google.com/docs/firestore/query-data/queries?hl=ja
https://www.wakuwakubank.com/posts/723-firebase-firestore-query/

× 終わるたびにドキュメント消す → ということは Send した際にドキュメント ID が必要

× 回答が出揃った時に、答え合わせ画面に移行する(HTML 画面を移動することになるか？それはまた回答画面にいくのが面倒なので、それぞれの答え合わせ画面に表示する様にするか？)。
× 答え合わせの際の判定機能。ボタン押した後に判定を集計するか。
× スキップ＆承認/拒否機能。スキップボタンを押した時に、相手側に Popup が出る様にする。
× 問題や回答表示。カードを一斉にオープン的な感じにしたい。
○ 背景等、あえてポップな感じにしたい。

× 問題を固定ではなく、お互いに出し合う様にする。その際、選択肢から選んでも、カスタムで作っても良いことにする。
