/**
 * Google Gemini API 服務
 * 
 * 這個文件包含與 Google Gemini API 通信的函數
 * 使用 @google/genai 包實現 Gemini API 調用
 */

// 導入 Google Gemini API SDK - 注意正確的導入名稱是 GoogleGenAI
import { GoogleGenAI } from "@google/genai";

// Gemini API 配置
const API_KEY = "YOUR_API_KEY";
const MODEL_NAME = "gemini-2.0-flash"; // 更新為最新的 Gemini 2.0 模型

// 強制使用 API 的標誌 - 設置為 true 則忽略環境檢測始終使用 API
const FORCE_USE_API = false;

/**
 * 判斷是否使用模擬數據
 * 
 * @returns {boolean} - 是否使用模擬數據
 */
const shouldUseMock = () => {
  // 如果強制使用 API，直接返回 false
  if (FORCE_USE_API) return false;
  
  // 如果未設置 API 金鑰，使用模擬數據
  if (!API_KEY || API_KEY === "YOUR_API_KEY") return true;
  
  // 在開發環境中使用模擬數據
  return process.env.NODE_ENV === 'development';
};

/**
 * 生成商品描述
 * 
 * @param {Object} productInfo - 包含商品信息的對象
 * @returns {Promise<string>} - 生成的商品描述
 */
export const generateProductDescription = async (productInfo) => {
  // 檢查是否使用模擬數據
  const useMock = shouldUseMock();
  
  console.log(`使用模式: ${useMock ? '模擬數據' : 'Gemini API'}`);
  
  // 使用模擬數據
  if (useMock) {
    console.log('使用模擬數據生成商品描述');
    return mockGenerateDescription(productInfo);
  }
  
  // 使用 Gemini API
  try {
    console.log('初始化 Gemini API...');
    // 初始化 API - 注意這裡使用 GoogleGenAI 而不是 GoogleGenerativeAI
    const genAI = new GoogleGenAI(API_KEY);
    
    // 獲取生成模型
    console.log(`使用模型: ${MODEL_NAME}`);
    const model = genAI.models.getGenerativeModel({ model: MODEL_NAME });
    
    // 創建提示詞
    const prompt = createPrompt(productInfo);
    console.log('提示詞創建完成，發送請求...');
    
    // 調用 API 生成內容
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('API 請求成功，返回文本');
    return text;
    
  } catch (error) {
    console.error('生成商品描述時出錯:', error);
    alert(`API 錯誤: ${error.message}`);
    // 出錯時返回模擬數據作為備選
    return mockGenerateDescription(productInfo);
  }
};

/**
 * 創建提示詞
 * 
 * @param {Object} productInfo - 商品資訊
 * @returns {string} - 提示詞字串
 */
const createPrompt = (productInfo) => {
  const { name, category, keywords = '', tone = 'professional' } = productInfo;
  
  let toneDescription = '';
  switch (tone) {
    case 'professional':
      toneDescription = '專業正式，適合商業情境';
      break;
    case 'casual':
      toneDescription = '輕鬆友善，使用日常用語，親切自然';
      break;
    case 'enthusiastic':
      toneDescription = '熱情活潑，充滿活力，激發購買慾望';
      break;
    case 'elegant':
      toneDescription = '優雅精緻，適合高檔商品與服務';
      break;
    default:
      toneDescription = '專業正式，適合商業情境';
  }
  
  return `
請為我生成一個具有吸引力且商業價值高的商品描述，內容按照以下格式:

商品名稱：${name}
商品類別：${category}
關鍵詞：${keywords}
文案風格：${toneDescription}

請生成的文案需符合以下要求：
1. 文案應有清晰的標題、產品特色描述、規格說明和賣點強調
2. 使用吸引人的語言和表情符號增加親切感
3. 精簡有力，避免冗長，每個段落重點突出
4. 採用商品類別常見的專業術語，提升專業感
5. 結構清晰，段落分明，便於閱讀
6. 強調商品對客戶的實際價值和問題解決能力
7. 整體文案長度適中，約300-500字

請生成適合電商平台展示的完整商品描述文案，無需包含圖片說明和連結。
`;
};

/**
 * 模擬生成商品描述 (用於開發環境或 API 不可用時)
 * 
 * @param {Object} productInfo - 商品資訊
 * @returns {Promise<string>} - 生成的商品描述
 */
const mockGenerateDescription = async (productInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { name, category } = productInfo;
      let description;
      
      if (category === '咖啡豆') {
        description = `【頂級咖啡豆體驗】${name}

來自精選產區的頂級咖啡豆，每一顆都經過專業烘焙師精心烘焙。

🌟 產品特色：
• 獨特風味：帶有柑橘和巧克力的複雜風味，尾韻有輕微的花香
• 精心烘焙：精確控制烘焙溫度和時間，確保風味完美釋放
• 新鮮保證：烘焙後24小時內包裝，鎖住最佳風味

☕ 品嚐建議：
• 手沖萃取：水溫88-92°C，粉水比1:15
• 濃縮咖啡：適合中度研磨，展現濃郁口感
• 冷萃咖啡：冷水浸泡12小時，帶出獨特清爽感

✨ 為什麼選擇我們的咖啡豆？
每一批咖啡豆都遵循公平貿易原則採購，支持可持續發展的咖啡農場。我們的烘焙過程完全遵循精品咖啡標準，為您帶來頂級咖啡體驗。

📦 包裝規格：250g/包`;
      } else if (category === '咖啡器具') {
        description = `【專業咖啡愛好者必備】${name}

為追求完美咖啡體驗而設計，結合功能性與美學的絕佳咖啡器具。

🔍 產品特色：
• 精工打造：採用高品質材料製作，確保耐用性與安全性
• 人體工學設計：操作簡便，讓沖煮過程更加輕鬆愉悅
• 精準控制：提供最佳萃取條件，釋放咖啡豆完整風味

🛠️ 使用方法：
1. 準備您喜愛的咖啡豆並研磨至適當粗細度
2. 按照說明書指引設置器具參數
3. 遵循建議的沖煮方法享受完美咖啡

✅ 適用場景：
• 家庭日常使用
• 辦公室小型咖啡站
• 露營或旅行便攜沖煮

🔧 產品規格：
• 材質：高品質材料
• 尺寸：請參考產品圖片
• 容量：適合1-2人份

💡 小提示：定期清潔和保養您的咖啡器具，將延長使用壽命並確保每一杯咖啡的純淨風味。`;
      } else if (category === '課程') {
        description = `【提升咖啡技藝】${name}

由專業咖啡師精心設計的實用課程，無論您是初學者還是咖啡愛好者，都能獲得寶貴的專業知識與技巧。

📚 課程內容：
• 理論知識：深入了解咖啡豆種類、產區特色及烘焙程度
• 實作技巧：掌握專業沖煮方法、萃取原理與參數控制
• 感官訓練：培養品鑑能力，識別不同風味特徵

⏱️ 課程安排：
• 課時：總計6小時
• 形式：小班制實體課程
• 地點：請參考課程詳情

🎓 學習成果：
• 獲得系統性咖啡知識
• 掌握實用沖煮技巧
• 提升咖啡品鑑能力
• 結業證書授予

👨‍🏫 講師介紹：
資深咖啡師親自授課，擁有豐富的教學經驗和專業知識。曾獲多項咖啡比賽獎項，對咖啡充滿熱情。

🔖 報名須知：
• 適合對象：咖啡愛好者、欲提升咖啡技能者
• 課程設備：所有實作器材由課程提供
• 報名方式：線上預約，名額有限`;
      } else {
        description = `【${name}】產品介紹

高品質${category || '商品'}，為您帶來卓越體驗。

✨ 產品特色：
• 精選材料：嚴選優質原料，確保產品品質
• 精心設計：注重細節，提供最佳使用體驗
• 多功能性：滿足您不同場景的需求

🔍 產品規格：
• 規格：請參考產品詳情
• 尺寸：標準尺寸
• 重量：輕便設計

💯 品質保證：
我們對產品品質充滿信心，提供完善的售後服務，讓您安心購買、放心使用。

📦 包裝內容：
• 主產品 x1
• 使用說明書 x1
• 品質保證卡 x1`;
      }
      
      resolve(description);
    }, 2000);
  });
};

export default {
  generateProductDescription
};