# George Kujo — GitHub Pages 公開用一式

このフォルダーの中身を、GitHub Pagesで公開するリポジトリのルートへ配置してください。`index.html`がリポジトリ直下に見える状態が正しい配置です。

## GitHub側の設定

1. リポジトリの「Settings」から「Pages」を開きます。
2. 「Build and deployment」のSourceで「Deploy from a branch」を選びます。
3. Branchを `main`、フォルダーを `/ (root)` にして保存します。
4. 「Custom domain」に `georgekujo.com` を入力して保存します。
5. 証明書の準備後、「Enforce HTTPS」を有効にします。

## DNS設定

ルートドメイン `georgekujo.com` のAレコードを、次のGitHub Pages用アドレスへ設定します。

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

`www.georgekujo.com` も使う場合は、`www` のCNAMEを `<GitHubユーザー名>.github.io` に設定します。

## 更新方法

新しい公開一式を作成したときは、既存ファイルを新しい内容で置き換えます。`CNAME` と `.nojekyll` は削除しないでください。
