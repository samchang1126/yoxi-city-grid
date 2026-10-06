require('dotenv').config(); 
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// 初始化 Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 設定 PostGIS 資料庫連線
const pool = new Pool({
    user: 'yoxi_admin',
    host: 'localhost',
    database: 'yoxi_citygrid',
    password: 'yoxi_password',
    port: 5432,
});

// API 1: 生成 AI 探險任務 (使用模擬資料以推進前端開發)
app.get('/api/tasks/generate', async (req, res) => {
    try {
        res.json({
            status: 'success',
            data: [
                {
                    task_id: 1,
                    description: "【AI推薦】探索這家隱藏版手作抹茶甜點店",
                    tags: ["#抹茶控", "#安靜", "#深夜營業"],
                    reward: 50,
                    is_unlocked: false
                }
            ]
        });
    } catch (error) {
        console.error("生成任務失敗:", error);
        res.status(500).json({ error: error.message });
    }
});

// API 2: 驗證 GPS 座標並解鎖版圖
app.post('/api/grid/unlock', async (req, res) => {
    res.json({ 
        status: 'success', 
        message: '網格已解鎖！50 元乘車金已發放。' 
    });
});

// API 3: 將地點加入願望清單 (新增的收藏功能)
app.post('/api/places/favorite', async (req, res) => {
    res.json({ 
        status: 'success', 
        message: '地點已成功加入您的願望清單！' 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`yoxi City-Grid API 伺服器已啟動於 http://localhost:${PORT}`);
});