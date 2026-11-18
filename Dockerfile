# 土台：Nginx（Webサーバー）の軽量版
FROM nginx:alpine

# サイトのファイル（site フォルダの中身だけ）を、Nginx が配る場所へコピー
COPY site/ /usr/share/nginx/html/

# このコンテナは 80番の入口を使う
EXPOSE 80

# Nginx を前に出したまま動かす（コンテナがすぐ終わらないように）
CMD ["nginx", "-g", "daemon off;"]
