# 好嗨!商 電商平台示範專案

這是一個示範電商平台管理系統，包含賣家常用功能如商品管理、訂單處理等。

## 特色功能：AI 商品描述生成

本專案整合了 Google Gemini API，實現了智能商品描述生成功能，幫助賣家快速創建專業的商品介紹文案。

### 功能特點

- 根據商品類型提供專業化描述
- 支持多種文案風格選擇
- 互動式界面，易於使用
- 適應不同類型的商品（咖啡豆、咖啡器具、課程等）

## 安裝與運行

### 前置條件

- Node.js 14.0 或更高版本
- 有效的 Google Gemini API 金鑰

### 安裝步驟

1. 克隆專案到本地：

```bash
git clone https://github.com/yourusername/ec_demo.git
cd ec_demo
```

2. 安裝依賴：

```bash
npm install
```

3. 配置 Gemini API 金鑰：

打開 `src/services/ai.js` 文件，將 `YOUR_GEMINI_API_KEY` 替換為您的 Gemini API 金鑰：

```javascript
const API_KEY = "YOUR_GEMINI_API_KEY";
```

4. 啟動開發伺服器：

```bash
npm start
```

應用將在 http://localhost:3000 啟動。

## 使用說明

### 如何使用 AI 商品描述生成功能

1. 登入系統後，進入「商品管理」頁面
2. 點擊「新增商品」按鈕
3. 填寫商品基本信息（名稱、分類、價格等）
4. 在商品描述部分，點擊「AI 幫你產生文案」按鈕
5. 在彈出的視窗中可以：
   - 確認商品名稱和分類
   - 選擇文案風格
   - 點擊關鍵字標籤增加描述重點
   - 輸入更多產品特點以提升生成質量
6. 點擊「生成文案」按鈕開始 AI 生成
7. 預覽生成結果，滿意後點擊「使用此描述」

### 自訂提示詞

如果需要調整 AI 生成的風格或內容，可以修改 `src/services/ai.js` 中的 `createPrompt` 函數。

## 技術實現

- React.js 前端框架
- Google Gemini API 用於 AI 文案生成
- 模擬後端 API 用於開發環境測試

## 注意事項

- 開發環境使用模擬數據，無需 API 金鑰
- 生產環境需配置有效的 Google Gemini API 金鑰
- 請確保您的 Gemini API 訂閱有足夠的配額

## 授權

此專案為示範用途，僅供學習參考。