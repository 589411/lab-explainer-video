# 🎞️ 一句話做解說影片

複製一段提示詞貼給 AI agent（Claude Code、Codex 或 Antigravity），它會自己建 Remotion 專案、寫程式，輸出一支 15 秒的中文解說影片。

👉 成品、提示詞、技能檔都在這裡：**https://explainer.launchdock.app**

這是[藍鴨 AI 實例庫](https://lab.launchdock.app)的一張卡片。

## 三個層次
1. **看成品**：`docs/explainer.mp4`，1920×1080、15 秒，主題「什麼是 AI agent」。
2. **複製提示詞**：[`prompt.md`](prompt.md)。貼進 agent 就能做出同樣結構的影片。電腦要先裝 Node.js 20 以上。
3. **存成技能**：把 [`skill/explainer-video/SKILL.md`](skill/explainer-video/SKILL.md) 放進技能資料夾，之後只要說「做一支解說影片，主題是〇〇」。
   - Claude Code：`~/.claude/skills/explainer-video/SKILL.md`
   - Codex：`~/.agents/skills/explainer-video/SKILL.md`
   - Antigravity：`~/.gemini/antigravity/skills/explainer-video/SKILL.md`

## 自己重做範例影片
```bash
cd remotion
npm install
npx remotion studio                                  # 打開預覽，可以直接改字
npx remotion render Explainer out/explainer.mp4 --crf 28
```

## 小提醒
- 用 Codex 時，它的沙盒會擋住 Remotion 要開的瀏覽器。輸出影片那一步請允許它在沙盒外執行，或自己在終端機貼那兩行。
- 每個 AI 做出來的畫面細節會不太一樣，但段落、時間和配色會照提示詞走。

## 資料夾
| 路徑 | 內容 |
|---|---|
| `docs/` | 展示頁（GitHub Pages 從這裡發布） |
| `prompt.md` | 可複製的提示詞 |
| `skill/explainer-video/SKILL.md` | Agent 技能範本 |
| `remotion/` | 範例影片的 Remotion 原始碼 |

## 授權
見 [LICENSE.md](LICENSE.md)。重點：Remotion 對個人、3 人以下公司、非營利組織免費（可商用），更大的營利公司要買 Company License；字型 Noto Sans TC 是 OFL 授權。
