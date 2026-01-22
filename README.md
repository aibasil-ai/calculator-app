# Calculator App

一個現代化的 React 計算機應用程式。

## 專案結構

```
calculator-app/
├── frontend/            # React + Vite 前端
│   ├── src/
│   │   ├── App.jsx      # 計算機 UI 與核心邏輯
│   │   └── App.css      # 樣式
│   ├── package.json
│   └── dist/            # 建置輸出
└── README.md
```

## 功能特色

- ✅ **純前端執行**：所有計算皆在瀏覽器中完成，反應快速且可離線使用。
- ✅ **現代化介面**：簡潔美觀的計算機 UI。
- ✅ **完整鍵盤支援**：
    - `0-9`：數字輸入
    - `.`：小數點
    - `+ - * /`：四則運算
    - `Enter` 或 `=`：計算結果
    - `Esc` 或 `C`：清除
    - `Backspace`：倒退刪除
- ✅ **計算歷程**：顯示上一次的計算算式。

## 🚀 快速開始

### 本地開發

1. 進入 frontend 資料夾：
   ```bash
   cd frontend
   ```

2. 安裝依賴套件：
   ```bash
   npm install
   ```

3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

   應用程式將在 `http://localhost:5173` 運行。

## 技術棧

- **前端框架：** React 18
- **建置工具：** Vite
- **語言：** JavaScript (ES6+)
- **樣式：** CSS3

## 授權

MIT License
