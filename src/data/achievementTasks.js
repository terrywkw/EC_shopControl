// 賣家成就與任務系統的任務資料

export const taskData = [
  // 開店基礎任務
  {
    id: 'basic-1',
    title: '店舖註冊',
    description: '完成店舖基本註冊流程，成為好嗨!商平台賣家',
    category: '開店基礎任務',
    difficulty: '入門',
    timeCommitment: '低',
    frequency: '一次性',
    expReward: 20,
    condition: '完成註冊'
  },
  {
    id: 'basic-2',
    title: '基本資料設定',
    description: '完成店舖名稱、簡介、LOGO等基本資訊設定',
    category: '開店基礎任務',
    difficulty: '入門',
    timeCommitment: '低',
    frequency: '一次性',
    expReward: 50,
    condition: '完成所有必填資料'
  },
  {
    id: 'basic-3',
    title: '金流設定',
    description: '完成店舖金流綁定，啟用收款功能',
    category: '開店基礎任務',
    difficulty: '入門',
    timeCommitment: '中',
    frequency: '一次性',
    expReward: 100,
    condition: '至少完成一種金流綁定'
  },
  {
    id: 'basic-4',
    title: '初始商品上架',
    description: '完成首批10件商品上架，開始營運',
    category: '開店基礎任務',
    difficulty: '入門',
    timeCommitment: '中',
    frequency: '一次性',
    expReward: 100,
    condition: '上架10件商品'
  },
  {
    id: 'basic-5',
    title: '社群媒體連結',
    description: '綁定至少一個社群平台帳號，擴展行銷管道',
    category: '開店基礎任務',
    difficulty: '入門',
    timeCommitment: '低',
    frequency: '一次性',
    expReward: 50,
    condition: '連結至少一個社群帳號'
  },
  {
    id: 'basic-6',
    title: '首筆訂單',
    description: '成功完成首筆訂單交易，體驗完整流程',
    category: '開店基礎任務',
    difficulty: '入門',
    timeCommitment: '低',
    frequency: '一次性',
    expReward: 200,
    condition: '完成首筆訂單出貨'
  },
  {
    id: 'basic-7',
    title: '營運計畫',
    description: '設定店舖季度銷售目標',
    category: '開店基礎任務',
    difficulty: '入門',
    timeCommitment: '中',
    frequency: '一次性',
    expReward: 80,
    condition: '設定合理的季度目標'
  },
  
  // 日常營運任務
  {
    id: 'daily-1',
    title: '顧客評價回覆',
    description: '回覆10則顧客評價，維護良好顧客關係',
    category: '日常營運任務',
    difficulty: '基礎',
    timeCommitment: '低',
    frequency: '每週一次',
    expReward: 20,
    condition: '回覆10則評價'
  },
  {
    id: 'daily-2',
    title: '商品資訊更新',
    description: '更新10件商品資訊（描述、規格等），保持資訊新鮮度',
    category: '日常營運任務',
    difficulty: '基礎',
    timeCommitment: '中',
    frequency: '每兩週一次',
    expReward: 30,
    condition: '更新10件商品資訊'
  },
  {
    id: 'daily-3',
    title: '庫存管理',
    description: '更新並確認所有商品庫存，避免存貨問題',
    category: '日常營運任務',
    difficulty: '基礎',
    timeCommitment: '低',
    frequency: '每週一次',
    expReward: 25,
    condition: '確認全部庫存'
  },
  {
    id: 'daily-4',
    title: '每週銷售報告',
    description: '檢視並分析每週銷售數據，掌握營運狀況',
    category: '日常營運任務',
    difficulty: '基礎',
    timeCommitment: '中',
    frequency: '每週一次',
    expReward: 40,
    condition: '查看並分析報表'
  },
  {
    id: 'daily-5',
    title: '社群互動',
    description: '在賣家論壇參與討論或回覆問題，增進社群參與',
    category: '日常營運任務',
    difficulty: '基礎',
    timeCommitment: '低',
    frequency: '每3天一次',
    expReward: 15,
    condition: '發表回覆或討論'
  },
  {
    id: 'daily-6',
    title: '商品促銷',
    description: '設定特價或折扣活動，刺激銷售',
    category: '日常營運任務',
    difficulty: '基礎',
    timeCommitment: '中',
    frequency: '每兩週一次',
    expReward: 35,
    condition: '設置促銷活動'
  },
  {
    id: 'daily-7',
    title: '訂單處理效率',
    description: '24小時內處理10筆訂單，提升客戶滿意度',
    category: '日常營運任務',
    difficulty: '基礎',
    timeCommitment: '中',
    frequency: '每週一次',
    expReward: 30,
    condition: '快速處理10筆訂單'
  },
  
  // 成長里程碑任務
  {
    id: 'milestone-1',
    title: '首月營運達標',
    description: '完成首月銷售目標',
    category: '成長里程碑任務',
    difficulty: '基礎',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 200,
    condition: '達成銷售目標'
  },
  {
    id: 'milestone-2',
    title: '季度業績達標',
    description: '完成季度銷售目標，持續穩定成長',
    category: '成長里程碑任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '每季一次',
    expReward: 300,
    condition: '達成季度目標'
  },
  {
    id: 'milestone-3',
    title: '年度業績達標',
    description: '完成年度銷售目標，證明長期經營能力',
    category: '成長里程碑任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '每年一次',
    expReward: 500,
    condition: '達成年度目標'
  },
  {
    id: 'milestone-4',
    title: '商品線擴展',
    description: '上架至少50件商品，擴充店舖規模',
    category: '成長里程碑任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 250,
    condition: '達成50件商品'
  },
  {
    id: 'milestone-5',
    title: '高評分達標',
    description: '店舖平均評分達4.5星以上，展現優質服務',
    category: '成長里程碑任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 300,
    condition: '達成4.5星評分'
  },
  {
    id: 'milestone-6',
    title: '顧客忠誠度',
    description: '回購率達到20%以上，建立忠實客群',
    category: '成長里程碑任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 350,
    condition: '達成20%回購率'
  },
  {
    id: 'milestone-7',
    title: '連續營運3個月',
    description: '持續營運滿三個月，展現穩定性',
    category: '成長里程碑任務',
    difficulty: '基礎',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 300,
    condition: '連續三個月活躍營運'
  },
  {
    id: 'milestone-8',
    title: '連續營運6個月',
    description: '持續營運滿六個月，成為成熟賣家',
    category: '成長里程碑任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 500,
    condition: '連續六個月活躍營運'
  },
  {
    id: 'milestone-9',
    title: '連續營運12個月',
    description: '持續營運滿一年，踏入長期經營階段',
    category: '成長里程碑任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 1000,
    condition: '連續一年活躍營運'
  },
  
  // 技能養成任務
  {
    id: 'skill-1',
    title: 'SEO優化實踐',
    description: '完成10件商品的SEO優化，提升搜尋曝光度',
    category: '技能養成任務',
    difficulty: '進階',
    timeCommitment: '中',
    frequency: '不限',
    expReward: 150,
    condition: '優化10件商品SEO'
  },
  {
    id: 'skill-2',
    title: '數據追蹤設定',
    description: '設定Google Analytics或FB像素追蹤，掌握數據',
    category: '技能養成任務',
    difficulty: '進階',
    timeCommitment: '中',
    frequency: '一次性',
    expReward: 250,
    condition: '完成數據追蹤設定'
  },
  {
    id: 'skill-3',
    title: '促銷活動策劃',
    description: '完成一次完整促銷活動，包含規劃、執行、效果分析',
    category: '技能養成任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 200,
    condition: '完成全流程活動'
  },
  {
    id: 'skill-4',
    title: '內容行銷實踐',
    description: '撰寫5篇原創商品介紹或使用教學，提升內容價值',
    category: '技能養成任務',
    difficulty: '進階',
    timeCommitment: '中',
    frequency: '不限',
    expReward: 180,
    condition: '發布5篇原創內容'
  },
  {
    id: 'skill-5',
    title: '精準客群行銷',
    description: '完成客群分析並執行針對性行銷活動',
    category: '技能養成任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 300,
    condition: '完成針對性行銷'
  },
  {
    id: 'skill-6',
    title: '自動化流程',
    description: '設置自動化庫存管理或訂單處理流程',
    category: '技能養成任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 350,
    condition: '建立自動化流程'
  },
  {
    id: 'skill-7',
    title: '會員計畫設計',
    description: '設計並實施會員忠誠度計畫',
    category: '技能養成任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 400,
    condition: '推出會員計畫'
  },
  {
    id: 'skill-8',
    title: '直播銷售',
    description: '完成首場直播銷售活動',
    category: '技能養成任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 350,
    condition: '完成直播銷售'
  },
  
  // 精英挑戰任務
  {
    id: 'elite-1',
    title: '類別排名達標',
    description: '在所屬類別中排名進入前20%',
    category: '精英挑戰任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 500,
    condition: '達成前20%排名'
  },
  {
    id: 'elite-2',
    title: '銷售額成長',
    description: '單月銷售額較前三個月平均值成長30%',
    category: '精英挑戰任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 600,
    condition: '達成30%成長'
  },
  {
    id: 'elite-3',
    title: '轉換率優化',
    description: '店鋪轉換率達到行業標準的1.5倍以上',
    category: '精英挑戰任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 700,
    condition: '達成1.5倍轉換率'
  },
  {
    id: 'elite-4',
    title: '年度銷售王',
    description: '年度銷售額突破百萬',
    category: '精英挑戰任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '每年一次',
    expReward: 1000,
    condition: '達成百萬銷售額'
  },
  {
    id: 'elite-5',
    title: '新商機開發',
    description: '成功拓展新產品線且帶來20%以上增長',
    category: '精英挑戰任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 800,
    condition: '新產品線帶來增長'
  },
  {
    id: 'elite-6',
    title: '創新營銷',
    description: '開發創新營銷模式並取得顯著成效',
    category: '精英挑戰任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 900,
    condition: '創新模式顯著成效'
  },
  {
    id: 'elite-7',
    title: '全渠道整合',
    description: '成功整合線上與實體渠道',
    category: '精英挑戰任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 800,
    condition: '完成渠道整合'
  },
  {
    id: 'elite-8',
    title: '品牌影響力',
    description: '建立行業內具影響力的品牌形象',
    category: '精英挑戰任務',
    difficulty: '精英',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 1000,
    condition: '成為行業標竿'
  },
  
  // 雜貨/快消品類任務
  {
    id: 'grocery-1',
    title: '訂單數量達標',
    description: '單月完成100筆以上訂單，適合客單價低的雜貨類賣家',
    category: '雜貨/快消品類任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '每月一次',
    expReward: 300,
    condition: '達成100筆訂單'
  },
  {
    id: 'grocery-2',
    title: '複購率提升',
    description: '達成30%以上的複購率，建立日常消費習慣',
    category: '雜貨/快消品類任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 350,
    condition: '達成30%複購率'
  },
  {
    id: 'grocery-3',
    title: '組合銷售優化',
    description: '成功提高購物車平均商品數，增加客單價',
    category: '雜貨/快消品類任務',
    difficulty: '進階',
    timeCommitment: '中',
    frequency: '不限',
    expReward: 250,
    condition: '提高平均商品數'
  },
  {
    id: 'grocery-4',
    title: '季節性商品規劃',
    description: '根據季節調整商品策略並增加銷售',
    category: '雜貨/快消品類任務',
    difficulty: '進階',
    timeCommitment: '中',
    frequency: '每季一次',
    expReward: 400,
    condition: '季節性增長20%'
  },
  
  // 家電/耐用品類任務
  {
    id: 'durable-1',
    title: '高單價成交',
    description: '完成10筆高單價訂單（單筆5,000元以上）',
    category: '家電/耐用品類任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '不限',
    expReward: 300,
    condition: '10筆高單價訂單'
  },
  {
    id: 'durable-2',
    title: '完整配件銷售',
    description: '成功提高配件搭售率，增加利潤',
    category: '家電/耐用品類任務',
    difficulty: '進階',
    timeCommitment: '中',
    frequency: '不限',
    expReward: 250,
    condition: '提高30%搭售率'
  },
  {
    id: 'durable-3',
    title: '延長保固服務',
    description: '推出並成功銷售延長保固服務',
    category: '家電/耐用品類任務',
    difficulty: '進階',
    timeCommitment: '中',
    frequency: '一次性',
    expReward: 300,
    condition: '5%訂單加購保固'
  },
  {
    id: 'durable-4',
    title: '專業安裝服務',
    description: '開發並提供專業安裝/設定服務',
    category: '家電/耐用品類任務',
    difficulty: '進階',
    timeCommitment: '高',
    frequency: '一次性',
    expReward: 350,
    condition: '推出安裝服務'
  }
];

// 等級維持機制（針對第二年賣家）的資料
export const levelMaintenanceData = {
  requirements: [
    { level: '1-5級', quarterlyExpNeeded: 100, penaltyLevels: '0-1級' },
    { level: '6-10級', quarterlyExpNeeded: 250, penaltyLevels: '1-2級' },
    { level: '11-15級', quarterlyExpNeeded: 400, penaltyLevels: '2-3級' },
    { level: '16-18級', quarterlyExpNeeded: 600, penaltyLevels: '3級' }
  ],
  specialization: [
    { path: '營銷大師', description: '專注行銷策略創新', expReward: '800-1,000' },
    { path: '產品專家', description: '專注產品開發與優化', expReward: '800-1,000' },
    { path: '服務典範', description: '專注顧客體驗提升', expReward: '800-1,000' },
    { path: '社群領袖', description: '專注社群建設與互動', expReward: '800-1,000' }
  ],
  eliteRanks: [
    { rank: '青銅18級', condition: '首次達到18級', maintenance: '每季600經驗值', benefits: '基本18級權益' },
    { rank: '白銀18級', condition: '連續兩季維持18級', maintenance: '每季700經驗值', benefits: 'Hi幣購買9折優惠' },
    { rank: '黃金18級', condition: '連續一年維持18級', maintenance: '每季800經驗值', benefits: 'Hi幣購買8.5折優惠' },
    { rank: '白金18級', condition: '連續兩年維持18級', maintenance: '每季900經驗值', benefits: 'Hi幣購買8折+專屬活動' },
    { rank: '鑽石18級', condition: '連續三年維持18級', maintenance: '每季1,000經驗值', benefits: 'Hi幣購買7.5折+專屬顧問' }
  ]
};

// 經驗值累積與等級升級需求
export const levelUpRequirements = [
  { level: '1→2級', expNeeded: 100, totalExp: 100, stage: '入門' },
  { level: '2→3級', expNeeded: 150, totalExp: 250, stage: '入門' },
  { level: '3→4級', expNeeded: 200, totalExp: 450, stage: '入門' },
  { level: '4→5級', expNeeded: 250, totalExp: 700, stage: '入門' },
  { level: '5→6級', expNeeded: 300, totalExp: 1000, stage: '基礎' },
  { level: '6→7級', expNeeded: 350, totalExp: 1350, stage: '基礎' },
  { level: '7→8級', expNeeded: 400, totalExp: 1750, stage: '基礎' },
  { level: '8→9級', expNeeded: 450, totalExp: 2200, stage: '基礎' },
  { level: '9→10級', expNeeded: 500, totalExp: 2700, stage: '基礎' },
  { level: '10→11級', expNeeded: 600, totalExp: 3300, stage: '進階' },
  { level: '11→12級', expNeeded: 700, totalExp: 4000, stage: '進階' },
  { level: '12→13級', expNeeded: 800, totalExp: 4800, stage: '進階' },
  { level: '13→14級', expNeeded: 900, totalExp: 5700, stage: '進階' },
  { level: '14→15級', expNeeded: 1000, totalExp: 6700, stage: '進階' },
  { level: '15→16級', expNeeded: 1100, totalExp: 7800, stage: '精英' },
  { level: '16→17級', expNeeded: 1200, totalExp: 9000, stage: '精英' },
  { level: '17→18級', expNeeded: 1300, totalExp: 10300, stage: '精英' }
];