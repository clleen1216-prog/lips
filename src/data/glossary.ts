export type Term = {
  term: string;
  zh: string;
  plain: string;
  say: string;
};

export const glossary: Term[] = [
  { term: "yield", zh: "良率", plain: "the share of chips that work", say: "Yield is down two points this week." },
  { term: "excursion", zh: "異常（超出管制）", plain: "a measurement that left its allowed range", say: "We have an excursion on etch two." },
  { term: "lot", zh: "批（貨）", plain: "a group of wafers that travel together", say: "Lot 4471 is on hold." },
  { term: "wafer", zh: "晶圓", plain: "the thin disc that chips are built on", say: "We lost three wafers in that step." },
  { term: "recipe", zh: "製程配方", plain: "the saved settings a tool uses for one step", say: "Don't change the recipe without approval." },
  { term: "PM", zh: "預防保養", plain: "planned maintenance, done before something breaks", say: "The PM is due Thursday." },
  { term: "hold", zh: "暫停（Hold）", plain: "material stopped on purpose until someone decides", say: "Put the lot on hold." },
  { term: "scrap", zh: "報廢", plain: "material thrown away because it cannot be fixed", say: "Two wafers were scrapped." },
  { term: "rework", zh: "重工", plain: "doing a step again to fix a problem", say: "Can this lot be reworked?" },
  { term: "out of spec", zh: "超出規格", plain: "outside the allowed limits", say: "Thickness is out of spec." },
  { term: "out of control", zh: "管制異常", plain: "a chart point outside its control limits", say: "The trend went out of control at noon." },
  { term: "trend", zh: "趨勢", plain: "the direction a number is moving over time", say: "The trend is moving the wrong way." },
  { term: "drift", zh: "漂移", plain: "a number slowly moving away from normal", say: "We see drift on the thickness." },
  { term: "root cause", zh: "根本原因", plain: "the deepest reason a problem happened", say: "Let's find the root cause first." },
  { term: "containment", zh: "圍堵措施", plain: "action to stop bad material from spreading", say: "We need containment today." },
  { term: "corrective action", zh: "矯正措施", plain: "a fix for a problem that was found", say: "The corrective action is retraining." },
  { term: "preventive action", zh: "預防措施", plain: "a change so it cannot happen again", say: "The preventive action is a software fix." },
  { term: "SPC", zh: "統計製程管制", plain: "charts that show if a process is stable", say: "Check the SPC chart for that tool." },
  { term: "calibration", zh: "校正", plain: "checking a measuring tool against a standard", say: "Calibration was done last month." },
  { term: "audit", zh: "稽核", plain: "a formal check that you follow the rules", say: "The customer audit is on Monday." },
  { term: "traceability", zh: "可追溯性", plain: "being able to follow a lot back through every step", say: "We have full traceability for this lot." },
  { term: "tool", zh: "機台", plain: "a machine that does one process step", say: "The tool is down." },
  { term: "cleanroom", zh: "無塵室", plain: "a room with very few particles in the air", say: "Phones aren't allowed in the cleanroom." },
  { term: "gowning", zh: "穿無塵衣", plain: "putting on the cleanroom suit", say: "Please gown up before you go in." },
  { term: "particle", zh: "微粒", plain: "a tiny piece of dust or material that can ruin a chip", say: "Particle count is high on bay four." },
  { term: "defect", zh: "缺陷", plain: "a flaw on a wafer or chip", say: "We found a new defect type." },
  { term: "inspection", zh: "檢驗", plain: "looking at material to find defects", say: "The lot is waiting for inspection." },
  { term: "ship", zh: "出貨", plain: "send finished product to the customer", say: "We can't ship this lot yet." },
  { term: "ETA", zh: "預計完成時間", plain: "the time something should be ready", say: "What's the ETA on the repair?" },
  { term: "handover", zh: "交班", plain: "telling the next shift what they need to know", say: "I'll write the handover note now." },
  { term: "8D report", zh: "8D 報告", plain: "a standard report with eight steps to solve a problem", say: "The customer wants an 8D report in ten days." },
  { term: "escalate", zh: "往上呈報", plain: "tell someone more senior because it is serious", say: "I need to escalate this to the manager." },
];
