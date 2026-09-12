/* ============================================================
 * 站点配置文件  config.js
 * ------------------------------------------------------------
 * ✏️ 后期更新网页，你只需要改这个文件 + changelog.js，不用动 HTML。
 *    改完保存 → 提交到 GitHub → 网页自动生效。
 * ============================================================ */

const SITE = {

  /* ---------- 1. 站点基本信息 ---------- */
  name:     '哔咔漫画',
  nameEn:   'PicACG',
  slogan:   '随时随地，畅享漫画世界',

  /* ---------- 2. 当前版本信息（改这里，全站版本号自动同步） ---------- */
  version:  'v3.0.0',        // 显示用的版本号
  build:    '20260913',      // 构建号 / 日期，显示在页脚
  date:     '2026-09-13',    // 发布日期

  /* ---------- 3. 下载地址 ---------- */
  /* 把 href 换成你的真实下载链接即可（网盘 / GitHub Releases / 直链） */
  downloads: {
    android: {
      label: 'Android 版',
      href:  '#',                       // ← 换成 APK 下载地址
      size:  '28.6 MB',
      req:   'Android 6.0 及以上'
    },
    ios: {
      label: 'iOS 版',
      href:  '#',                       // ← 换成 TestFlight / 安装地址
      size:  '42.1 MB',
      req:   'iOS 13.0 及以上'
    },
    windows: {
      label: 'Windows 版',
      href:  '#',                       // ← 换成 exe / zip 下载地址
      size:  '76.3 MB',
      req:   'Windows 10 及以上'
    }
  },

  /* ---------- 4. 外部链接 ---------- */
  links: {
    repo:   'https://github.com/',      // ← 你的 GitHub 仓库地址
    issues: 'https://github.com/'       // ← 问题反馈地址
  },

  /* ---------- 5. 首页统计数字 ---------- */
  stats: {
    platforms: 3
  },

  /* ---------- 6. 更新日志每页显示条数 ---------- */
  changelogPageSize: 4

};

/* 挂到 window，供 main.js 读取 */
window.SITE = SITE;
