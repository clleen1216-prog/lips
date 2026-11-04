// 繁體中文提示 — Traditional Chinese hints, keyed by phrase id.
// Shown on tap in the phrase sheet and the review cards.
const zh: Record<string, string> = {
  // Out
  "running-late": "快要遲到了",
  "on-my-way": "我在路上了",
  "stuck-in-traffic": "塞車了",
  "hang-on": "等一下",
  "ill-be-right-there": "我馬上到",
  // Friends
  "long-time-no-see": "好久不見",
  "hows-it-going": "最近怎麼樣？",
  "catch-up": "敘敘舊、聊聊近況",
  "grab-a-coffee": "去喝杯咖啡",
  "so-far-so-good": "到目前為止都還不錯",
  // Plans
  "im-in": "我參加",
  "count-me-in": "算我一份",
  "up-to-you": "你決定",
  "works-for-me": "我可以、沒問題",
  "rain-check": "改天吧（下次再約）",
  // Home
  "do-you-mind": "你介意嗎？",
  "no-worries": "沒關係、別擔心",
  "whenever-youre-ready": "你準備好再說，不急",
  "appreciate-it": "很感謝",
  "i-owe-you-one": "我欠你一次人情",
  // Work (life)
  "something-came-up": "臨時有事",
  "i-cant-make-it": "我沒辦法去",
  "my-bad": "是我的錯",
  "keep-me-posted": "有消息再告訴我",
  "another-time": "改天",
  "heads-up": "先提醒你一下",
  "running-behind": "進度落後了",
  "on-the-same-page": "我們想法一致",
  "circle-back": "之後再回頭討論",
  "call-it-a-day": "今天就到這裡（收工）",
  // Food
  "im-starving": "我餓扁了",
  "grab-a-bite": "隨便吃點東西",
  "on-me": "我請客",
  "lets-split-it": "我們各付各的（平分）",
  "im-good": "我不用了，謝謝",
  // Travel / street
  "excuse-me": "不好意思（打擾一下）",
  "a-bit-lost": "有點迷路了",
  "which-way": "要往哪邊走？",
  "no-problem": "沒問題、不客氣",
  "take-care": "保重",
  // Friends 2
  "i-didnt-mean-it-like-that": "我不是那個意思",
  "the-thing-is": "問題是……",
  "you-know-what-i-mean": "你懂我的意思吧？",
  "no-big-deal": "沒什麼大不了",
  "were-good": "我們沒事了",
  // New job
  "nice-to-meet-you": "很高興認識你",
  "getting-the-hang-of-it": "漸漸上手了",
  "bear-with-me": "請多包涵、請稍等我",
  "let-me-know": "再告訴我一聲",
  "sounds-good": "聽起來不錯",
  // Rain / tired
  "im-beat": "我累壞了",
  "hang-in-there": "撐住、加油",
  "could-be-worse": "還好，可能更糟",
  "take-it-easy": "放輕鬆、好好休息",
  "call-it-a-night": "今晚就到這裡",
  // Boxes
  "give-me-a-hand": "幫我一下",
  "i-got-you": "交給我，我來幫你",
  "no-rush": "不急，慢慢來",
  "weighs-a-ton": "超重的",
  "almost-there": "快到了、快好了",
  // Soft no
  "i-dont-think-i-can": "我恐怕沒辦法",
  "maybe-next-time": "也許下次吧",
  "no-pressure": "沒有壓力",
  "all-good": "沒事、沒問題",
  "your-call": "由你決定",
  // Gate
  "looks-like": "看起來……",
  "up-in-the-air": "還沒決定、懸而未決",
  "hang-tight": "先稍等、別著急",
  "keep-you-posted": "有進展我會告訴你",
  "fingers-crossed": "祈禱一切順利",
  // Sick
  "under-the-weather": "身體不太舒服",
  "call-in": "打電話請假",
  "take-the-day-off": "今天休息一天",
  "dont-push-it": "別硬撐",
  "feel-better": "早日康復",
  // Bye
  "gotta-run": "我得走了",
  "catch-you-later": "待會見",
  "talk-soon": "改天再聊",
  "see-you-then": "到時候見",
  "hit-the-road": "出發、上路",
  // Win
  "not-gonna-lie": "老實說",
  "it-went-well": "進行得很順利",
  "for-real": "真的假的？",
  "told-you": "我就說吧",
  "drinks-on-me": "飲料我請",
  // Ear
  "it-depends": "看情況",
  "well-see": "到時候再看",
  "either-way": "怎樣都可以",
  "ill-let-you-know": "我決定了再告訴你",
  "play-it-by-ear": "隨機應變、到時再說",

  // Fab — new badge
  "fab-just-joined": "我剛加入公司",
  "fab-work-in-quality": "我在品質部門工作",
  "fab-not-ready-to-ship": "還不能出貨",
  "fab-still-new-here": "我還是新人",
  "fab-stop-me": "（我講錯時）請打斷我",
  // Fab — gowning room
  "fab-have-we-met": "我們見過嗎？",
  "fab-what-do-you-work-on": "你主要做什麼工作？",
  "fab-im-with-quality": "我是品質部門的",
  "fab-lets-sync": "我們找時間對一下",
  "fab-ill-find-you": "我會去找你",
  // Fab — handover
  "fab-quick-update": "簡短更新一下狀況",
  "fab-on-hold": "暫停（Hold）中",
  "fab-not-clear-yet": "原因還不明確",
  "fab-dont-move-it": "先不要動它",
  "fab-keep-you-posted": "有消息會通知你",
  // Fab — yield meeting
  "fab-can-i-jump-in": "我可以插個話嗎？",
  "fab-from-the-quality-side": "從品質這邊來看",
  "fab-the-data-says": "數據顯示……",
  "fab-wouldnt-ship": "我不會出這批貨",
  "fab-take-that-offline": "這個會後私下再談",
  // Fab — slides
  "fab-keep-this-short": "我會長話短說",
  "fab-walk-you-through": "我帶你們一步步看",
  "fab-the-bottom-line": "結論是……",
  "fab-what-this-means": "這代表的意思是",
  "fab-happy-to-take-questions": "歡迎提問",
  // Fab — Q&A
  "fab-fair-question": "問得好（合理的問題）",
  "fab-dont-have-that": "我手上沒有這個數字",
  "fab-follow-up": "我之後再回覆你",
  "fab-put-it-simply": "簡單來說",
  "fab-does-that-answer": "這樣有回答到你的問題嗎？",
  // Fab — lobby / customer visit
  "fab-thanks-for-coming-in": "謝謝您蒞臨",
  "fab-point-of-contact": "窗口、聯絡人",
  "fab-were-on-it": "我們正在處理",
  "fab-customer-impact": "對客戶的影響",
  "fab-written-update": "書面更新（正式通知）",
  // Fab — interview
  "fab-thanks-for-having-me": "謝謝您給我這個機會",
  "fab-a-bit-about-me": "我簡單自我介紹一下",
  "fab-in-my-last-role": "在我上一份工作中",
  "fab-i-care-about": "我在意的是……",
  "fab-great-question": "這個問題很好（讓我想一下）",
  // Fab — tech
  "fab-what-did-you-see": "你看到了什麼？",
  "fab-walk-me-through": "請按順序跟我說一遍",
  "fab-when-did-it-start": "是什麼時候開始的？",
  "fab-leave-the-lot": "那批貨先不要動",
  "fab-appreciate-you-flagging": "謝謝你主動回報",
  // Fab — push back
  "fab-see-it-differently": "我的看法有點不同",
  "fab-not-convinced": "我還沒被說服",
  "fab-look-at-the-data": "我們來看一下數據",
  "fab-not-jump-to": "先不要急著下結論",
  "fab-agree-on-the-next-step": "先說好下一步",
  // Fab — trade show
  "fab-what-brings-you": "你怎麼會來參加？",
  "fab-semiconductor-quality": "半導體品質",
  "fab-lets-connect": "我們互相留個聯絡方式",
  "fab-love-to-hear": "很想聽聽你的經驗",
  "fab-enjoy-the-show": "祝你逛展愉快",
  // Fab — supplier
  "fab-calling-about": "我來電是為了……",
  "fab-were-seeing": "我們這邊看到……",
  "fab-can-you-confirm": "可以幫我確認嗎？",
  "fab-a-containment": "圍堵（防止不良品擴散）",
  "fab-by-end-of-day": "今天下班前",
  // Fab — standup
  "fab-one-thing-to-flag": "有一件事要提醒大家",
  "fab-blocked-on": "卡在……（無法繼續）",
  "fab-i-can-take-that": "這個我來處理",
  "fab-nothing-else": "沒有其他的了",
  "fab-thats-all-from-me": "我報告完了",
  // Fab — manager
  "fab-got-a-minute": "有空聊一下嗎？",
  "fab-wanted-to-run-this-by-you": "想先跟你討論一下",
  "fab-im-concerned": "我有點擔心",
  "fab-what-do-you-think": "你怎麼看？",
  "fab-ill-own-it": "我來負責",

  // New — excursion
  "fab-we-have-an-excursion": "我們有一個異常（Excursion）",
  "fab-out-of-spec": "超出規格",
  "fab-how-many-lots": "有幾批貨受影響？",
  "fab-lets-stop-the-line": "我們先停線",
  // New — audit
  "fab-let-me-show-you": "我給您看",
  "fab-as-per-procedure": "依照程序書",
  "fab-i-dont-have-it-to-hand": "我手邊沒有這份文件",
  "fab-good-catch": "抓得好（謝謝提醒）",
  "fab-corrective-action": "矯正措施",
  // New — root cause
  "fab-root-cause": "根本原因",
  "fab-five-whys": "五個為什麼",
  "fab-rule-out": "排除（這個原因）",
  "fab-preventive-action": "預防措施",
  // New — tool down
  "fab-the-tool-is-down": "機台故障了（停機）",
  "fab-went-down-around": "大約在……時停機",
  "fab-its-showing": "畫面上顯示……",
  "fab-whats-the-eta": "預計什麼時候好？",
  "fab-ill-reroute-the-lots": "我把貨改走別的機台",
  // New — safety
  "fab-please-gown-up": "請先穿好無塵衣",
  "fab-not-allowed": "不被允許",
  "fab-for-your-safety": "為了您的安全",
  "fab-stop-work": "停止作業",
  // New — email
  "fab-following-up-on": "關於……的後續",
  "fab-please-find-attached": "附件請查收",
  "fab-could-you-please": "能否麻煩您……",
  "fab-let-me-know-if": "如果……請告訴我",
  "fab-thanks-in-advance": "先行謝過",
  // New — phone
  "fab-the-line-is-bad": "訊號不好（聽不清楚）",
  "fab-could-you-say-that-again": "可以請您再說一次嗎？",
  "fab-a-bit-slower": "請說慢一點",
  "fab-let-me-repeat-that-back": "我複述一次跟您確認",
  "fab-ill-send-it-in-writing": "我會用書面寄給您",
  // New — evidence
  "fab-my-read-is": "我的判斷是……",
  "fab-what-makes-you-say-that": "你為什麼這麼說？",
  "fab-thats-based-on": "這是根據……",
  "fab-small-sample": "樣本數太少",
  "fab-id-want-more-data": "我希望有更多數據",
  // New — yield review
  "fab-yield-is-down": "良率下降了",
  "fab-driven-by": "主要是由……造成",
  "fab-on-track": "進度正常",
  "fab-at-risk": "有風險（可能趕不上）",
  "fab-i-need-support-from": "我需要……的支援",
  // New — maintenance
  "fab-whens-a-good-time": "什麼時候方便？",
  "fab-pm-is-due": "預防保養到期了",
  "fab-push-it-back": "往後延",
  "fab-how-long-will-it-take": "要花多久？",
  "fab-lock-it-in": "就這樣定案",
};

export function zhFor(phraseId: string): string | undefined {
  return zh[phraseId];
}
