/* ============================================================
 * 更新日志数据  changelog.js
 * ------------------------------------------------------------
 * ✏️ 发新版本时，在最上面复制一份模板粘进去，改一下就行：
 *
 *   {
 *     version: 'v3.1.0',            // 版本号
 *     date:    '2026-10-01',        // 发布日期
 *     build:   '20261001',          // 构建号
 *     tag:     'latest',            // latest=最新 / stable=稳定 / beta=测试 / hotfix=紧急
 *     highlight: '一句话总结这次更新',
 *     changes: [
 *       { type: 'feature', text: '新增 xxx 功能' },
 *       { type: 'improve', text: '优化 xxx 体验' },
 *       { type: 'fix',     text: '修复 xxx 问题' }
 *     ]
 *   },
 *
 *   type 只能填三种：feature(新增) / improve(优化) / fix(修复)
 *   按时间倒序排列，最新的放最前面。
 * ============================================================ */

const CHANGELOG = [

  {
    version: 'v3.0.0',
    date:    '2026-09-13',
    build:   '20260913',
    tag:     'latest',
    highlight: '全新 3.0 架构，加载速度与稳定性大幅提升。',
    changes: [
      { type: 'feature', text: '全新首页推荐算法，根据阅读历史智能排序' },
      { type: 'feature', text: '支持自定义图源，可导入 / 导出图源配置' },
      { type: 'feature', text: '新增深色模式，支持跟随系统自动切换' },
      { type: 'feature', text: '阅读器支持双页对开与竖向滚动模式' },
      { type: 'improve', text: '图片加载速度提升约 40%，翻页更跟手' },
      { type: 'improve', text: '下载任务支持断点续传与后台队列' },
      { type: 'improve', text: '书架排版优化，支持网格 / 列表切换' },
      { type: 'fix',     text: '修复部分机型启动闪退的问题' },
      { type: 'fix',     text: '修复长章节阅读时内存占用过高的问题' },
      { type: 'fix',     text: '修复弱网环境下图片重复请求的问题' }
    ]
  },

  {
    version: 'v2.4.2',
    date:    '2026-07-28',
    build:   '20260728',
    tag:     'stable',
    highlight: '稳定性维护版本，修复若干已知问题。',
    changes: [
      { type: 'improve', text: '优化登录态保持逻辑，减少重复登录' },
      { type: 'improve', text: '降低后台运行时的电量消耗' },
      { type: 'fix',     text: '修复评论区偶尔加载失败的问题' },
      { type: 'fix',     text: '修复历史记录排序错乱的问题' }
    ]
  },

  {
    version: 'v2.4.0',
    date:    '2026-06-15',
    build:   '20260615',
    tag:     'stable',
    highlight: '新增云同步与阅读统计。',
    changes: [
      { type: 'feature', text: '新增云端同步，收藏与进度多设备互通' },
      { type: 'feature', text: '新增阅读统计面板，记录阅读时长与偏好' },
      { type: 'feature', text: '支持应用锁（指纹 / 密码）' },
      { type: 'improve', text: '优化搜索结果排序准确度' },
      { type: 'fix',     text: '修复下载完成后偶现文件损坏的问题' }
    ]
  },

  {
    version: 'v2.3.1',
    date:    '2026-05-02',
    build:   '20260502',
    tag:     'hotfix',
    highlight: '紧急修复图源连接异常。',
    changes: [
      { type: 'fix', text: '紧急修复部分线路无法连接的问题' },
      { type: 'fix', text: '修复图源切换后需要重启生效的问题' }
    ]
  },

  {
    version: 'v2.3.0',
    date:    '2026-04-18',
    build:   '20260418',
    tag:     'stable',
    highlight: '阅读器全面重写。',
    changes: [
      { type: 'feature', text: '阅读器内核重写，支持更精细的翻页动画' },
      { type: 'feature', text: '新增亮度 / 对比度 / 页间距手动调节' },
      { type: 'improve', text: '大幅降低大图渲染时的内存占用' },
      { type: 'fix',     text: '修复夜间模式下部分图片偏色的问题' }
    ]
  },

  {
    version: 'v2.2.0',
    date:    '2026-03-06',
    build:   '20260306',
    tag:     'beta',
    highlight: '首个支持离线批量下载的版本。',
    changes: [
      { type: 'feature', text: '新增整本批量下载与下载管理页' },
      { type: 'feature', text: '支持仅 Wi-Fi 下载，节省流量' },
      { type: 'improve', text: '优化首次启动的引导流程' },
      { type: 'fix',     text: '修复书架封面加载缓慢的问题' }
    ]
  },

  {
    version: 'v2.0.0',
    date:    '2026-01-20',
    build:   '20260120',
    tag:     'stable',
    highlight: '2.0 全新界面改版。',
    changes: [
      { type: 'feature', text: '全新 UI 设计，整体交互重构' },
      { type: 'feature', text: '新增搜索历史与热门关键词推荐' },
      { type: 'feature', text: '新增分类筛选与标签系统' },
      { type: 'improve', text: '冷启动速度提升约 50%' }
    ]
  }

];

window.CHANGELOG = CHANGELOG;
