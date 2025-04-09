# Google Gemini API 集成說明

本文件提供了關於如何在「好嗨!商」電商平台中使用 Google Gemini API 進行 AI 商品描述生成的詳細說明。

## 設置與配置

### 前置條件

1. 您需要有一個有效的 Google AI Studio 帳號
2. 獲取 Gemini API 金鑰 (API Key)

### 獲取 API 金鑰步驟

1. 前往 [Google AI Studio](https://aistudio.google.com/)
2. 登入您的 Google 帳號
3. 點擊右上角的「Get API key」或「獲取 API 金鑰」
4. 創建新的 API 金鑰或使用現有金鑰
5. 複製生成的 API 金鑰

### 配置步驟

1. 在專案中打開 `src/services/ai.js` 文件
2. 找到 `API_KEY` 變量並替換為您的 API 金鑰：
   ```javascript
   const API_KEY = "YOUR_GEMINI_API_KEY"; // 替換為您的 API 金鑰
   ```
3. 如果要強制使用 API (即使在開發環境)，設置：
   ```javascript
   const FORCE_USE_API = true;
   ```

## 使用模型與參數

### 模型選擇

目前配置使用的是 `gemini-2.0-flash` 模型，適合快速生成文本內容。如果您需要更高品質的輸出，可以考慮使用其他 Gemini 模型：

- `gemini-2.0-pro`: 提供更詳細、更高品質的文本生成，但速度較慢
- `gemini-2.0-flash`: 速度較快，適合一般文本生成需求

若要更改模型，修改 `MODEL_NAME` 變量：

```javascript
const MODEL_NAME = "gemini-2.0-pro"; // 更改為您想使用的模型
```

### 重要說明

注意，正確的導入方式是使用 `GoogleGenAI`，而非 `GoogleGenerativeAI`：

```javascript
// 正確的導入方式
import { GoogleGenAI } from "@google/genai";

// 這樣使用
const genAI = new GoogleGenAI(API_KEY);
```

### 提示詞調整

如果您想自訂生成的商品描述風格或結構，可以修改 `createPrompt` 函數中的提示模板。提示詞對生成結果有決定性影響，所以合理優化提示詞可以獲得更好的結果。

## 故障排除

### 常見問題

1. **API 金鑰錯誤**
   - 錯誤訊息: "API key not valid"
   - 解決方案: 檢查 API 金鑰是否正確，確保沒有多餘的空格

2. **額度限制**
   - 錯誤訊息: "Quota exceeded"
   - 解決方案: 檢查您的 Google AI Studio 帳戶額度使用情況

3. **模型不可用**
   - 錯誤訊息: "Model not found" 或 "Model unavailable"
   - 解決方案: 確認使用的模型名稱正確，或嘗試使用不同模型

4. **網絡問題**
   - 錯誤訊息: "Network error" 或請求超時
   - 解決方案: 檢查網絡連接，特別是在使用代理或防火牆環境時

5. **內容被過濾**
   - 錯誤訊息: "Content filtered"
   - 解決方案: 調整提示詞，避免敏感內容

6. **導入錯誤**
   - 錯誤訊息: "export 'GoogleGenerativeAI' was not found in '@google/genai'"
   - 解決方案: 使用正確的導入名稱 `import { GoogleGenAI } from "@google/genai";`

### 緊急備用方案

如果 API 不可用，系統會自動降級使用模擬數據。您也可以透過設置 `shouldUseMock` 函數的條件來控制是否使用模擬數據。

## 使用建議

1. **優化 API 調用頻率**
   - 對生成結果進行快取，避免重複生成相似商品的描述
   - 考慮在非繁忙時段批量生成商品描述

2. **提示詞優化**
   - 為不同商品類別創建專屬提示詞模板
   - 嘗試包含更多產品特點以獲得更準確的描述

3. **結果監控**
   - 定期檢查生成的描述質量
   - 收集用戶反饋，持續優化提示詞和參數
   
4. **額度管理**
   - 監控每日/每月 API 使用情況
   - 為高價值商品優先使用 AI 生成描述

## 進階功能

在未來的版本中，我們計劃擴展以下功能：

1. 結合用戶瀏覽數據自動優化商品描述
2. 多語言商品描述生成
3. 根據銷售表現自動調整描述內容和風格
4. A/B 測試不同描述風格的轉化效果

如有任何問題或建議，請聯繫技術支持團隊。