# Hinata Zoo WordPress移行プラン

## 📁 現在のディレクトリ構造分析

```
PORTFOLIO-ZOO/
├── .vscode/
├── dist/                    # ビルドファイル
├── news/                    # ニュース関連
├── node_modules/            # npm依存関係
├── src/
│   ├── css/                 # CSSファイル群
│   │   ├── input.css
│   │   ├── reset.css
│   │   ├── slide.css
│   │   ├── style.css       ← メインCSS
│   │   └── variables.css   ← CSS変数
│   ├── images/             # 画像ファイル
│   └── js/
│       └── main.js         # メインJavaScript
├── templates/
│   ├── components/         # コンポーネント
│   ├── layouts/           # レイアウト
│   └── pages/             # 個別ページ
│       ├── page-admission.html
│       ├── page-animals.html
│       └── page-event.html
├── .gitignore
├── archive-news.html       # ニュース一覧
├── course_backup.html
├── course-backup.css
├── course-result.md
├── gulpfile.js            # ビルドツール
├── index.html             # トップページ
├── package.json           # npm設定
├── postcss.config.cjs     # PostCSS設定
└── tailwind.config.js     # Tailwind設定
```

## 🎯 移行戦略

### Phase 1: 基本テーマ作成 & ファイル移行

#### 1. WordPress テーマフォルダ構成
```
hinata-zoo-theme/
├── style.css              # テーマ情報
├── index.php              # メインテンプレート
├── functions.php          # 関数ファイル
├── header.php             # ヘッダー
├── footer.php             # フッター
├── single.php             # 投稿詳細
├── page.php               # 固定ページ
├── archive.php            # アーカイブ
├── assets/                # 静的アセット
│   ├── css/               ← src/css/ から移行
│   │   ├── style.css
│   │   ├── variables.css
│   │   ├── slide.css
│   │   └── custom.css
│   ├── js/                ← src/js/ から移行
│   │   └── main.js
│   └── images/            ← src/images/ から移行
├── template-parts/        ← templates/components/ から移行
├── page-templates/        # 個別ページテンプレート
│   ├── page-admission.php ← page-admission.html
│   ├── page-animals.php   ← page-animals.html
│   └── page-event.php     ← page-event.html
└── inc/                   # 追加関数ファイル
    ├── enqueue-scripts.php
    ├── custom-post-types.php
    └── theme-setup.php
```

#### 2. Tailwind設定の移行
```php
// functions.php
function hinata_zoo_enqueue_styles() {
    // Tailwind CSS (既存の設定を活用)
    wp_enqueue_style('tailwind', 'https://cdn.tailwindcss.com');

    // カスタムCSS (src/css/style.css の内容)
    wp_enqueue_style('hinata-zoo-style', get_template_directory_uri() . '/assets/css/style.css', array('tailwind'));

    // CSS変数 (variables.css)
    wp_enqueue_style('hinata-zoo-variables', get_template_directory_uri() . '/assets/css/variables.css', array(), '1.0');

    // スライダー (slide.css)
    wp_enqueue_style('hinata-zoo-slide', get_template_directory_uri() . '/assets/css/slide.css', array(), '1.0');
}

// Tailwind設定をインライン化
function hinata_zoo_tailwind_config() {
    // tailwind.config.js の内容をここに適用
    ?>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    // tailwind.config.jsの設定をここに移行
                    colors: {
                        'zoo-green': 'var(--main-green)',
                        'zoo-orange': 'var(--main-orange)',
                        // CSS変数を活用
                    }
                }
            }
        }
    </script>
    <?php
}
add_action('wp_head', 'hinata_zoo_tailwind_config');
```

### Phase 2: ページテンプレート作成

#### 1. 固定ページテンプレート作成
```php
// page-templates/page-admission.php
<?php
/*
Template Name: 入園案内ページ
*/
get_header(); ?>

<div class="admission-page">
    <!-- page-admission.html の内容をここに移植 -->
    <!-- Tailwindクラスはそのまま使用可能 -->

    <?php while (have_posts()) : the_post(); ?>
        <div class="page-content">
            <?php the_content(); ?>
        </div>

        <!-- カスタムフィールドで動的コンテンツ化 -->
        <?php if (get_field('admission_price')) : ?>
            <div class="p-6 bg-green-100 rounded-lg price-section">
                <h3>入園料金</h3>
                <p><?php the_field('admission_price'); ?></p>
            </div>
        <?php endif; ?>
    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
```

#### 2. アーカイブページ (ニュース)
```php
// archive-news.php (archive-news.html から移行)
<?php get_header(); ?>

<div class="container px-4 py-8 mx-auto news-archive">
    <h1 class="mb-8 text-3xl font-bold">ニュース一覧</h1>

    <?php if (have_posts()) : ?>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <?php while (have_posts()) : the_post(); ?>
                <article class="overflow-hidden bg-white rounded-lg shadow-md news-item">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="news-thumbnail">
                            <?php the_post_thumbnail('medium', ['class' => 'w-full h-48 object-cover']); ?>
                        </div>
                    <?php endif; ?>

                    <div class="p-6">
                        <h2 class="mb-2 text-xl font-semibold">
                            <a href="<?php the_permalink(); ?>" class="text-blue-600 hover:text-blue-800">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        <div class="mb-4 text-sm text-gray-600">
                            <?php echo get_the_date(); ?>
                        </div>
                        <div class="text-gray-700">
                            <?php the_excerpt(); ?>
                        </div>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <!-- ページネーション -->
        <div class="mt-12 pagination">
            <?php the_posts_pagination(); ?>
        </div>
    <?php else : ?>
        <p class="text-center text-gray-600">ニュースが見つかりませんでした。</p>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
```

### Phase 3: カスタム投稿タイプ & フィールド

#### 1. 動物情報の投稿タイプ
```php
// inc/custom-post-types.php
function hinata_zoo_register_post_types() {
    // 動物投稿タイプ
    register_post_type('animals', array(
        'labels' => array(
            'name' => '動物',
            'singular_name' => '動物',
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'animals'),
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-pets',
    ));

    // イベント投稿タイプ
    register_post_type('events', array(
        'labels' => array(
            'name' => 'イベント',
            'singular_name' => 'イベント',
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'events'),
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-calendar-alt',
    ));
}
add_action('init', 'hinata_zoo_register_post_types');
```

#### 2. 必要なカスタムフィールド
```php
// Advanced Custom Fields で設定
// または functions.php で add_meta_box を使用

// 動物情報フィールド
// - 動物名
// - 種類
// - 生息地
// - 特徴
// - 画像ギャラリー

// イベント情報フィールド
// - 開催日時
// - 場所
// - 料金
// - 定員
```

## 🚀 実装手順

### Step 1: 基本テーマ設置
```bash
# 1. Local WPのテーマフォルダに移動
cd /path/to/localwp/hinata-zoo/app/public/wp-content/themes/

# 2. テーマフォルダ作成
mkdir hinata-zoo-theme
cd hinata-zoo-theme

# 3. 基本ファイル作成
touch style.css index.php functions.php
```

### Step 2: アセットファイル移行
```bash
# src/ フォルダの内容をテーマに移行
cp -r /path/to/PORTFOLIO-ZOO/src/css ./assets/css/
cp -r /path/to/PORTFOLIO-ZOO/src/js ./assets/js/
cp -r /path/to/PORTFOLIO-ZOO/src/images ./assets/images/
```

### Step 3: HTMLテンプレート移行
```bash
# 個別ページファイルをPHPテンプレートに変換
# templates/pages/ → page-templates/
# 手動でHTMLをPHP化
```

### Step 4: 動的コンテンツ化
```bash
# 管理画面で固定ページ作成
# カスタムフィールド追加
# メニュー設定
```

## 📋 チェックリスト

### 基本設定
- [ ] Local WPサイト作成完了
- [ ] テーマフォルダ作成
- [ ] 基本ファイル（style.css, index.php, functions.php）作成
- [ ] テーマ有効化確認

### アセット移行
- [ ] CSSファイル移行 (src/css/ → assets/css/)
- [ ] JavaScriptファイル移行 (src/js/ → assets/js/)
- [ ] 画像ファイル移行 (src/images/ → assets/images/)
- [ ] Tailwind設定移行

### テンプレート作成
- [ ] header.php作成
- [ ] footer.php作成
- [ ] index.php (トップページ) 作成
- [ ] page.php (固定ページ) 作成
- [ ] 個別ページテンプレート作成

### 動的機能
- [ ] カスタム投稿タイプ設定
- [ ] カスタムフィールド設定
- [ ] メニュー機能設定
- [ ] ナビゲーション動作確認

## 💡 移行のポイント

1. **段階的移行**: まず表示確認 → 徐々に動的化
2. **既存アセット活用**: CSS/JSはほぼそのまま使用可能
3. **Tailwind継続使用**: CDN経由で簡単導入
4. **レスポンシブ対応**: 既存のTailwindクラスで維持
5. **SEO対策**: WordPressの標準機能 + Yoast SEO

---

**次のステップ**: まずは基本テーマファイル作成から始めましょう！
