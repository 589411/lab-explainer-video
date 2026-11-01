---
name: explainer-video
description: 用 Remotion 把一段主題或文字做成 15 秒、1920×1080 的中文解說影片（MP4）和一張封面圖。使用者說「做一支解說影片」「把這段做成影片」「做 15 秒片頭」時使用。
---

# 一句話做解說影片

把使用者給的主題（或一段文字）做成 15 秒的中文解說影片。

## 先問清楚（缺的才問，最多一題）
- 主題或要講的內容。只給主題就自己寫成 3–4 句重點。
- 沒說的就用預設：1920×1080、30fps、15 秒、深藍底 #0B1E3F、白字、重點色 #FFC93C。

## 步驟
1. 還沒有 Remotion 專案就建一個（已有就跳過）：
   ```bash
   npx create-video@latest --yes --blank --no-tailwind explainer
   cd explainer && npm install
   npx skills add remotion-dev/skills --yes
   npx remotion add @remotion/google-fonts
   ```
2. 讀 remotion-best-practices 技能，照它的規則寫程式。
3. 把內容拆成 4 個場景，每段 3–5 秒，加起來 450 格：
   - 開場：大標題彈出，一行副標淡入。
   - 重點一：對比或定義（例如兩張卡片左右滑入）。
   - 重點二：流程或步驟（例如圓圈依序亮起，中間有箭頭）。
   - 結尾：一句收尾的話，最後半秒淡出。
4. 寫法規定：
   - 字型只用 `@remotion/google-fonts/NotoSansTC`（OFL 授權），只載用到的粗細。
   - 動畫只能用 `useCurrentFrame()` 配 `interpolate()` / `spring()`，不要用 CSS 動畫。
   - 用 `<Sequence>` 排時間，composition id 叫 `Explainer`。
   - 每行字不超過 16 個中文字，字級至少 52px，不能超出畫面。
5. 檢查並輸出：
   ```bash
   npx tsc --noEmit
   npx remotion render Explainer out/explainer.mp4 --crf 28
   npx remotion still Explainer out/poster.png --frame 340
   ```
6. 自己看一下封面圖，確認字沒有被切掉、沒有缺字（出現方框代表字型沒載到）。

## 回報
告訴使用者 `out/explainer.mp4`、`out/poster.png` 的路徑和大小，並說明可以用 `npx remotion studio` 打開預覽、直接改字。

## 授權提醒
Remotion 對個人、3 人以下的公司、非營利組織免費（可商用）；超過 3 人的營利公司要買 Company License（https://www.remotion.pro/license）。
