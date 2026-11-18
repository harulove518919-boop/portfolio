# 山口泰山 ポートフォリオ（第5ヶ月 総合課題）

フロントエンド＋AI活用コース第5ヶ月の総合課題として作った、ポートフォリオサイトです。HTML・CSS・JavaScript で作り、Nginx の Docker コンテナで動かします。

## ページの構成

| セクション | 内容 |
| :---- | :---- |
| ヘッダー | ナビゲーション（スマホではメニューボタンで開閉） |
| ヒーロー | 自己紹介 |
| スキル | 書く・伝える／作る／届ける・支える |
| 制作物 | 第23〜30章の課題（公開サイト・GitHub へのリンクつき） |
| お問い合わせ | 入力チェックつきのフォーム（課題用の見本のため、送信はされません） |
| フッター | 屋号・著作権表示 |

## 要件への対応

| 要件 | このサイトでの対応 |
| :---- | :---- |
| セマンティックHTML | `header`・`nav`・`main`・`section`・`article`・`figure`・`footer`・`time` を使用 |
| HTML5の新機能 | `picture` と `srcset`（画面に合った画像）、`loading="lazy"`、`type="email"`・`required`・`autocomplete`・`inputmode`、`output`（文字数の表示） |
| 代替テキスト | すべての画像に `alt` を付けた |
| フォームのラベル | すべての入力欄に `label for` を付け、エラーと説明は `aria-describedby` でつないだ |
| キーボード操作 | 「本文へ移動」リンク、フォーカスの枠、メニューは Esc で閉じてボタンに戻る、エラー時は最初に直す欄へ移動 |
| ARIA属性 | `aria-expanded`・`aria-controls`・`aria-label`（メニュー）、`aria-invalid`（エラーの欄）、`role="status"`・`aria-live`（送信結果の読み上げ） |
| レイアウト | Grid（スキル・制作物）と Flexbox（ヘッダー・ボタン・タグ） |
| レスポンシブ | メディアクエリで スマホ（〜767px）・タブレット（768px〜）・デスクトップ（1024px〜）を切り替え。文字の大きさは `clamp()` で画面幅に合わせて伸び縮み |
| 動きを減らす設定 | OS の「視差効果を減らす」設定の人には、スクロールのアニメーションを止める |

自動チェック（axe-core）で、アクセシビリティの違反が0件であることを確かめています。

## ファイル構成

```
portfolio/
├── site/                 … サイト本体（Nginx が配るのはこの中だけ）
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js        … メニューの開閉・フォームの入力チェック
│   └── images/           … イラスト（SVG）と、制作物の画面（WebP・2サイズ）
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── README.md
```

## 実行手順

必要なもの：Docker Desktop（起動しておく）

### Docker Compose で動かす（おすすめ）

このフォルダ（`portfolio`）に移動してから実行します。

```
docker compose up -d --build
```

ブラウザで http://localhost:8080 を開きます。止めるときは次のコマンドです。

```
docker compose down
```

### Dockerfile だけで動かす

```
docker build -t portfolio:1.0 .
```

```
docker run -d -p 8080:80 --name portfolio portfolio:1.0
```

止めて片付けるときは次の2つです。

```
docker stop portfolio
```

```
docker rm portfolio
```

### うまく動かないとき

| 症状 | 確かめること |
| :---- | :---- |
| `docker` が見つからない・つながらない | Docker Desktop が起動し、左下が「Engine running」になっているか |
| ポート 8080 が使用中と出る | 第30章のコンテナなどが残っていないか（`docker ps` で確認し、`docker stop` で止める） |
| 画面が出ない | `docker ps -a` で状態を、`docker logs portfolio` でログを見る |

## 使用技術

HTML5 / CSS3（Grid・Flexbox・メディアクエリ・clamp） / JavaScript / Docker（Nginx） / Docker Compose / Git・GitHub

AI（Claude）と協働して制作しました。
