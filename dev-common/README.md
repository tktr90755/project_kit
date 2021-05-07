# dev-common/
コンテンツ共通ファイル開発用フォルダー


## 開発環境

### バージョン
```
node: 10.16.0
npm: 6.9.0
gulp: 4.0.2
webpack: 4.32.2
```

### ファイル構成
```
1908_HONDA__web/dev-common/
│
├ gulpfile.babel.js/
│ ├ config.js [taskのパラメーター設定]
│ ├ index.js [gulp task設定]
│ └ tasks/ [taskファイル置き場]
│   └ task files...
│
├ src/ [開発コード]
│ ├ assets/       [素材フォルダー]
│ ├ include/      [共通ファイル]
│ │ ├ _body_bottom.ejs    [共通ボディ閉じタグ直前用]
│ │ ├ _body_top.ejs       [共通ボディ開始タグ直後用]
│ │ ├ _bottom_banner.ejs  [共通下部バナー]
│ │ ├ _head.ejs           [共通css/js]
│ │ ├ _head_bottom.ejs    [共通ヘッド閉じタグ直前用]
│ │ ├ _head_top.ejs       [共通ヘッド開始タグ直後用]
│ │ └ _header.ejs         [共通ヘッダー]
│ │
│ ├ include-dev/  [開発環境用ファイル]
│ │ ├ _freed_footer.ejs  [FREED共通フッター]
│ │ ├ _freed_head.ejs    [FREED共通css/js]
│ │ ├ _honda_footer.ejs  [HONDA共通フッター]
│ │ └ _honda_header.ejs  [HONDA共通ヘッダー]
│ │
│ └ template.ejs  [共通部分確認用ファイル]
│
├ .gitignore
├ package-look.json
├ package.json
└ README.md
```

### コマンドリスト
#### インストール
開発環境インストールコマンド。package-lock.jsonのモジュールのバージョンを揃えるため`npm ci`を使用。
```
npm ci
```

#### 開発版
ローカルサーバー起動、ファイル監視(Watch), ソース非圧縮、JS SourceMap生成<br>
起動時、ソースのコンパイルは行いません。（※案件別に必要に応じて設定変更してください）
```
npm run dev
```

#### プロダクト版
ソース圧縮、SourceMap削除、console削除
```
npm run prd
```

#### サーバー起動
サーバー起動のみ
```
npm run srv
```

#### ejs書き出し
コマンドの説明
```
npm run _ejs
```
