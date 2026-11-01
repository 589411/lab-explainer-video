請幫我用 Remotion 做一支 15 秒的中文解說影片，主題是「什麼是 AI agent」。請一步一步照做，不要問我問題，做完再回報。

【1. 建專案】
在目前資料夾執行：
npx create-video@latest --yes --blank --no-tailwind my-explainer
cd my-explainer
npm install

【2. 裝 Remotion 官方技能】
在 my-explainer 裡執行：
npx skills add remotion-dev/skills --yes
裝好後先讀 remotion-best-practices 這個技能，照它的規則寫程式。

【3. 字型】
只用 Noto Sans TC（Google 開源字型，OFL 授權，可商用）：
npx remotion add @remotion/google-fonts
在程式裡從 "@remotion/google-fonts/NotoSansTC" 載入，只載 400 和 900 兩種粗細。

【4. 影片規格】
- 1920×1080、30fps、共 450 格（15 秒），composition id 叫 Explainer。
- 深藍底（#0B1E3F），文字白色，重點色用鴨黃（#FFC93C）。
- 動畫只能用 useCurrentFrame() 搭配 interpolate() 或 spring()，不要用 CSS 動畫或 transition。
- 分成四個場景（用 <Sequence> 排時間）：
  第 1 段（0–3 秒）：大標「什麼是 AI agent？」彈出，下方小字「15 秒看懂」淡入。
  第 2 段（3–7 秒）：左右兩張卡依序滑入。左卡「聊天機器人」＋「你問，它答」；右卡「AI agent」＋「你交代，它去做」，右卡用鴨黃邊框。
  第 3 段（7–12 秒）：三個圓圈從左到右依序亮起，中間有箭頭：「看：讀資料」→「想：排步驟」→「做：用工具」。最後一個亮起後，底下出現一行「做完再看結果，不對就再來一輪」。
  第 4 段（12–15 秒）：結尾大字「你給目標，它跑流程」，下方小字「藍鴨 Launchdock Lab」，最後半秒整個畫面淡出。
- 每段進場都要有動畫，字不能超出畫面。

【5. 輸出】
先執行 npx tsc --noEmit 確認沒有錯誤，再輸出影片：
npx remotion render Explainer out/explainer.mp4 --crf 28
再輸出一張封面圖：
npx remotion still Explainer out/poster.png --frame 340
如果輸出時瀏覽器打不開（例如 Codex 的沙盒擋住 Chrome），請停下來請我允許在沙盒外執行這兩行，不要改用其他方法做影片。

【6. 回報】
告訴我 out/explainer.mp4 和 out/poster.png 的位置與檔案大小。
