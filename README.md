# 🎞️ 一句話做解說影片

**你不用會寫程式。** 複製一段文字，貼給 AI 助手，它就會幫你做出一支 15 秒的中文解說影片。

👉 看成品、一步步教學、複製文字，都在這裡：**https://explainer.launchdock.app**

這是[藍鴨 AI 實例庫](https://lab.launchdock.app)的一張卡片。

## 1. 先看成品
`docs/explainer.mp4`：15 秒，主題「什麼是 AI agent」。

## 2. 照著做
1. **先準備。** 到 [nodejs.org](https://nodejs.org) 下載 Node.js（讓電腦能跑影片程式的免費工具），選 LTS 版裝好。
2. **打開 AI 助手。** 選一個「會自己動手操作電腦的 AI」，英文叫 AI agent（AI 代理人）：Claude Code（Anthropic）、Codex（OpenAI）或 Antigravity（Google，指令叫 `agy`）。
   打開終端機，輸入 `mkdir my-video`、`cd my-video`，再輸入 `claude`、`codex` 或 `agy`。
3. **貼上文字。** 把 [`prompt.md`](prompt.md) 的內容整段複製，貼進 AI 助手，按 Enter。
4. **等它做。** 畫面會一直跑字，這是正常的。大約 5 到 15 分鐘。
5. **它問你問題時。** 問「可以執行這個指令嗎？」，指令是 `npx` 開頭就選「允許」。其他看不懂的問題，回它「照提示詞做就好」。
6. **用 Codex 的人。** Codex 有一層保護叫「沙盒」（sandbox，限制 AI 能碰的範圍），會擋住做影片要用的瀏覽器。這時 Codex 應該停下來，問你能不能在沙盒外執行 `npx remotion render …` 和 `npx remotion still …` 這兩行。只核准這兩行。
7. **找到影片。** 在 `my-video/my-explainer/out/` 裡：`explainer.mp4` 是影片，`poster.png` 是封面圖。

## 3. 進階：存成技能
技能（skill）是一份給 AI 看的說明書，存起來以後 AI 會記得怎麼做。
把 [`skill/explainer-video/SKILL.md`](skill/explainer-video/SKILL.md) 連同資料夾放到：
- Claude Code：`~/.claude/skills/explainer-video/SKILL.md`
- Codex：`~/.agents/skills/explainer-video/SKILL.md`
- Antigravity：`~/.gemini/antigravity/skills/explainer-video/SKILL.md`

之後只要說：「做一支解說影片，主題是〇〇」。用 Codex 的話，一樣只核准那兩行輸出影片的指令。

## 自己重做範例影片（會一點指令的人）
```bash
cd remotion
npm install
npx remotion studio                                  # 打開預覽，可以直接改字
npx remotion render Explainer out/explainer.mp4 --crf 28
```

## 資料夾
| 路徑 | 內容 |
|---|---|
| `docs/` | 展示頁（GitHub Pages 從這裡發布） |
| `prompt.md` | 要複製的那段文字 |
| `skill/explainer-video/SKILL.md` | 技能說明書範本 |
| `remotion/` | 範例影片的原始碼 |

## 授權
見 [LICENSE.md](LICENSE.md)。重點：Remotion（用程式做影片的工具）對個人、3 人以下公司、非營利組織免費，商用也可以；更大的營利公司要買 Company License。字型 Noto Sans TC 是 OFL 授權，可免費商用。
