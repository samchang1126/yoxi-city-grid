# yoxi City-Grid 城市拓荒者 🚗📍

本專案為【2026 和泰 AI 黑客松】參賽作品，旨在透過遊戲化與空間 AI 推薦，將 yoxi 從「被動叫車工具」轉化為「主動的城市探索雷達」，創造不搭車也願意每天打開的高頻互動日常。

## 📜 開源技術聲明
本專案後端全面採用開源的 **PostGIS** 作為地理空間資料庫，完全免費且不需額外授權。系統依循地理空間最佳實踐，利用 PostGIS 進行高效率的網格碰撞運算 (`ST_Intersects`) 與路徑距離估算，確保未來落地至雲端架構時具備極高的成本效益與擴展性。

## 🏗️ 系統架構圖 (System Architecture)
- **前端 (Frontend)**: MapLibre GL JS (WebGL 高效渲染動態迷霧地圖)
- **後端 (Backend)**: Node.js / Express
- **空間資料庫 (Database)**: PostgreSQL + PostGIS (Docker 容器化部署)
- **AI 摘要引擎 (LLM)**: Google Gemini API (自動將龐雜地點評論轉化為精準 Hashtag)

## 🗄️ 資料庫 Schema 規劃
- `users_footprint`: 記錄用戶歷史 GPS 軌跡與常去地點，用於訓練個人化偏好。
- `city_grid`: 將城市劃分為 500x500 公尺網格，儲存 Geometry (Polygon) 與解鎖狀態。
- `tasks`: 存放由 LLM 生成的探索任務、解鎖獎勵 (乘車金) 與目標座標。

## 🔌 API 串接規格
1. `GET /api/tasks/generate`
   - **功能**: AI 空間探測器。結合用戶偏好呼叫 LLM，生成動態探索任務與 3 個關鍵字標籤。
2. `POST /api/grid/unlock`
   - **功能**: GPS 網格碰撞驗證。比對用戶當前座標是否進入 `city_grid` 的範圍，成功則發放乘車金。
3. `POST /api/places/favorite`
   - **功能**: 任務鎖定與願望清單。將地點加入收藏，作為未來 O2O 廣告導流基礎。

## 🚀 本地端快速部署指南
1. 複製本專案：`git clone https://github.com/samchang1126/yoxi-city-grid.git`
2. 環境變數：在根目錄新增 `.env` 檔案，填入 `GEMINI_API_KEY=你的金鑰`
3. 啟動容器：執行 `docker-compose up -d --build` 啟動 PostGIS 與 Node.js API
4. 檢視畫面：在瀏覽器開啟 `index.html` 即可操作地圖 Prototype