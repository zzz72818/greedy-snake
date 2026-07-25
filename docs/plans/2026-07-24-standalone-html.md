# Feature: Greedy Snake 單檔離線版

**Goal:** 產出可直接雙擊、完全離線運作的 `GreedySnake.html`。

**Architecture:** 單一 HTML 內嵌語意化頁面、CSS 與原生 JavaScript。遊戲狀態、規則、輸入與畫面更新在同一檔案中以區塊分隔，不依賴現有 Next.js 執行環境。

**Stack:** HTML5、CSS、原生 JavaScript、Node.js 內建測試。

## Global constraints

- 不得包含外部網址、模組匯入、CDN 或網路請求。
- 不改動既有線上版本。
- 成品須可由 `file://` 直接載入。
- 保留方向鍵、WASD、觸控、暫停、重玩與本機最高分。

## Tasks

### Task 1: 建立離線成品契約測試

**Files:** create `tests/standalone-html.test.mjs`

**Steps:**
1. 寫入測試，要求 `GreedySnake.html` 存在且包含完整遊戲介面與控制程式。
2. 測試不得存在 `http://`、`https://`、外部 `src`／`href`、`fetch` 或模組匯入。
3. 執行 `node --test tests/standalone-html.test.mjs`，確認因成品尚不存在而失敗。

### Task 2: 製作單檔遊戲

**Files:** create `GreedySnake.html`

**Steps:**
1. 內嵌目前遊戲的響應式視覺與無障礙標籤。
2. 實作蛇移動、方向限制、食物、碰撞、得分與最高分。
3. 實作鍵盤、WASD、觸控、暫停及重新開始。
4. 執行契約測試，預期全部通過。

### Task 3: 完整驗證

**Files:** no production changes

**Steps:**
1. 使用瀏覽器以 `file://` 載入成品。
2. 確認頁面標題、遊戲盤與開始按鈕顯示。
3. 執行完整 Node 測試，預期零失敗。
4. 保留功能分支供使用者檢查，不部署線上版本。
