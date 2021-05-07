# dev-top/

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
/dev-top/
│
├ gulpfile.babel.js/
│ ├ config.js [taskのパラメーター設定]
│ ├ index.js [gulp task設定]
│ └ tasks/ [taskファイル置き場]
│   └ task files...
│
├ src/ [開発コード]
│ ├ assets/       [素材フォルダー]
│ └ index.ejs  [ejsファイル]
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

#### コマンド追記例: コマンド名
コマンドの説明
```
npm run xxx
```
