# Calculator App

一個功能完整的計算機應用程式，包含 Python 後端和 React 前端。

## 專案結構

```
calculator-app/
├── backend/              # Python Flask 後端
│   ├── calculator.py     # 計算機核心模組（加減乘除）
│   ├── test_calculator.py # 完整的單元測試
│   ├── app.py           # Flask API 伺服器
│   └── requirements.txt # Python 依賴套件
└── frontend/            # React + Vite 前端
    ├── src/
    │   ├── App.jsx      # 計算機 UI 元件
    │   └── App.css      # 樣式
    ├── package.json
    └── ...
```

## 功能特色

### 後端 (Python)
- ✅ 加法 (add)
- ✅ 減法 (subtract)
- ✅ 乘法 (multiply)
- ✅ 除法 (divide) - 包含除以零的錯誤處理
- ✅ 完整的單元測試（unittest 和 pytest）
- ✅ RESTful API 端點

### 前端 (React + Vite)
- ✅ 現代化的計算機介面
- ✅ 支援數字輸入、小數點
- ✅ 四則運算按鈕
- ✅ 清除 (C) 和退格 (←) 功能
- ✅ 即時顯示計算結果
- ✅ 顯示最後一次計算的詳細資訊
- ✅ 與後端 API 整合

## 安裝與執行

### 1. 後端設定

```bash
cd calculator-app/backend

# 建立虛擬環境（建議）
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate     # Windows

# 安裝依賴套件
pip install -r requirements.txt

# 執行測試
python test_calculator.py
# 或使用 pytest
pytest test_calculator.py -v

# 啟動 Flask 伺服器
python app.py
```

後端伺服器將在 `http://localhost:5000` 運行

### 2. 前端設定

```bash
cd calculator-app/frontend

# 安裝依賴套件（如果還沒安裝）
npm install

# 啟動開發伺服器
npm run dev
```

前端應用程式將在 `http://localhost:5173` 運行

## API 端點

### POST /api/calculate
執行計算操作

**請求格式：**
```json
{
  "operation": "add|subtract|multiply|divide",
  "a": 10,
  "b": 5
}
```

**回應格式：**
```json
{
  "result": 15,
  "operation": "add",
  "a": 10,
  "b": 5
}
```

**錯誤回應：**
```json
{
  "error": "Cannot divide by zero"
}
```

### GET /api/health
健康檢查端點

**回應：**
```json
{
  "status": "ok"
}
```

## 測試

### 執行 Python 測試

```bash
cd backend

# 使用 unittest
python test_calculator.py

# 使用 pytest（更詳細的輸出）
pytest test_calculator.py -v

# 查看測試覆蓋率
pytest test_calculator.py --cov=calculator
```

測試涵蓋：
- 正數、負數、零的運算
- 浮點數運算
- 除以零的錯誤處理
- 邊界條件測試

## 使用方式

1. 確保後端和前端都在運行
2. 在瀏覽器開啟 `http://localhost:5173`
3. 使用計算機介面：
   - 點擊數字按鈕輸入數字
   - 點擊運算符號（+、−、×、÷）
   - 點擊 = 查看結果
   - 點擊 C 清除
   - 點擊 ← 刪除最後一個字元

## 技術棧

- **後端：** Python 3, Flask, Flask-CORS
- **前端：** React 18, Vite, JavaScript
- **測試：** unittest, pytest
- **API：** RESTful API

## 開發注意事項

- 後端使用 CORS 允許前端跨域請求
- 前端 API URL 設定在 `App.jsx` 的 `API_URL` 常數
- 所有計算都通過後端 API 執行，確保邏輯一致性
- 包含完整的錯誤處理和使用者提示

## 授權

MIT License
