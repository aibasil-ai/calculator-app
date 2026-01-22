# Vercel 部署指南

本專案已配置好可以直接部署到 Vercel。

## 🚀 部署步驟

### 方法 1：透過 Vercel Dashboard（推薦）

1. **前往 Vercel**
   - 訪問 https://vercel.com
   - 使用 GitHub 帳號登入

2. **匯入專案**
   - 點擊 "Add New..." → "Project"
   - 選擇 "Import Git Repository"
   - 選擇 `aibasil-ai/calculator-app`

3. **配置專案**
   - **Framework Preset:** 選擇 "Other"
   - **Root Directory:** 保持為 `./`
   - **Build Command:** `cd frontend && npm run vercel-build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `cd frontend && npm install`

4. **環境變數（可選）**
   - 目前不需要額外的環境變數

5. **部署**
   - 點擊 "Deploy"
   - 等待部署完成（約 2-3 分鐘）

### 方法 2：使用 Vercel CLI

```bash
# 安裝 Vercel CLI（如果還沒安裝）
npm install -g vercel

# 登入 Vercel
vercel login

# 在專案目錄中執行部署
cd /home/joshlin/AI/calculator-app
vercel

# 或直接部署到生產環境
vercel --prod
```

## 📁 專案結構

```
calculator-app/
├── api/
│   └── index.py          # Vercel serverless function (Python)
├── backend/
│   ├── calculator.py     # 計算機核心模組
│   ├── app.py           # 本地開發用的 Flask 伺服器
│   └── test_calculator.py
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # React 主元件（支援動態 API URL）
│   │   └── App.css
│   ├── package.json     # 包含 vercel-build script
│   └── dist/            # 建置輸出目錄
├── vercel.json          # Vercel 配置文件
└── requirements.txt     # Python 依賴
```

## ⚙️ 配置說明

### vercel.json
- 配置了前端靜態建置
- 設定 API 路由到 Python serverless function
- 配置 SPA 路由重寫

### API URL 自動切換
前端會根據環境自動切換 API URL：
- **開發環境：** `http://localhost:5000/api`
- **生產環境（Vercel）：** `/api`（相對路徑）

### Python Serverless Function
- 位於 `api/index.py`
- 自動處理 CORS
- 支援所有計算機 API 端點

## 🔧 本地開發

### 後端
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python app.py
```

### 前端
```bash
cd frontend
npm install
npm run dev
```

## 🌐 部署後

部署完成後，你會獲得一個 Vercel URL，例如：
- `https://calculator-app-xxx.vercel.app`

### 測試部署
1. 訪問 Vercel URL
2. 測試計算機功能
3. 檢查鍵盤支援是否正常
4. 測試 API 端點：`https://your-app.vercel.app/api/health`

## 🔄 自動部署

每次推送到 GitHub 的 `main` 分支時，Vercel 會自動：
1. 檢測到新的 commit
2. 觸發建置流程
3. 部署新版本
4. 提供預覽 URL

## 📝 注意事項

1. **Python 版本：** Vercel 使用 Python 3.9+
2. **建置時間：** 首次部署約需 2-3 分鐘
3. **Serverless 限制：**
   - 執行時間限制：10 秒（Hobby plan）
   - 記憶體限制：1024 MB
4. **CORS：** 已在 API 中配置 CORS，支援跨域請求

## 🐛 常見問題

### 問題：API 請求失敗
**解決方案：** 檢查瀏覽器控制台，確認 API URL 是否正確

### 問題：建置失敗
**解決方案：**
- 檢查 `frontend/package.json` 中的 dependencies
- 確認 `vercel-build` script 存在
- 查看 Vercel 建置日誌

### 問題：Python 依賴安裝失敗
**解決方案：**
- 確認 `requirements.txt` 在根目錄
- 檢查依賴版本是否相容

## 📚 相關資源

- [Vercel 文件](https://vercel.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/functions/serverless-functions/runtimes/python)
- [GitHub Repository](https://github.com/aibasil-ai/calculator-app)

## 🎉 完成！

部署完成後，你的計算機應用程式就可以在全球範圍內訪問了！
