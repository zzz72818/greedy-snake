# Greedy Snake

可長期擴充的網頁版貪食蛇，支援鍵盤、WASD 與手機觸控操作。

## 專案結構

```text
app/
├─ components/       # 畫面元件
├─ game/             # 純遊戲邏輯、設定與型別
├─ globals.css       # 視覺樣式
├─ layout.tsx        # 網站資訊與共用版面
└─ page.tsx          # 首頁組裝
public/
└─ assets/
   ├─ sprites/       # 角色、食物、道具
   ├─ audio/         # 音效、音樂
   ├─ backgrounds/   # 背景
   └─ icons/         # 介面圖示
```

## 常見調整

- 棋盤大小、速度、單次得分：`app/game/config.ts`
- 移動、碰撞、食物生成：`app/game/engine.ts`
- 畫面互動：`app/components/SnakeGame.tsx`
- 顏色與版面：`app/globals.css`

未來若要加關卡、障礙物或特殊食物，請先在 `game/types.ts` 增加資料型別，再把規則放進 `game/engine.ts`，畫面元件只負責顯示。
