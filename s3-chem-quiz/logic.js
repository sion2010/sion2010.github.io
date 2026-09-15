const TEACHER_WHATSAPP = "85296542637";
const sel = document.getElementById("nameSel");
STUDENTS.forEach(s => {
  const o = document.createElement("option");
  o.value = s.id;
  o.textContent = s.id + "  " + s.name;
  sel.appendChild(o);
});
let currentUser = null, qi = 0, mode = "first", currentQueue = [], queuePtr = 0;
let answers = [], locked = [], judgedWrong = [], optionOrder = [], wrongPicks = [];
let totalWrongTries = 0, redoRound = 0, advancing = false, lastRec = null;
function normId(s) {
  const d = String(s || "").replace(/\D/g, "");
  if (!d) return "";
  return d.padStart(2, "0").slice(-2);
}
function useIconFallback(el, key) {
  if (typeof ICONS !== "undefined" && ICONS[key]) el.outerHTML = ICONS[key];
  else el.style.display = "none";
}
function picHTML(item) {
  if (!item) return "";
  const key = item.img;
  const tall = key === "burette_diagram" ? " tall" : "";
  if (key && window.IMAGES && IMAGES[key]) {
    return '<img class="qimg' + tall + '" src="' + IMAGES[key] + '" alt="" onerror="useIconFallback(this,\'' + key + '\')">';
  }
  if (key && typeof ICONS !== "undefined" && ICONS[key]) return ICONS[key];
  if (item.pic && typeof ICONS !== "undefined" && ICONS[item.pic]) return ICONS[item.pic];
  return "";
}
function shuffledOrder() {
  const a = [0,1,2,3];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function showFeedback(type, text) {
  const el = document.getElementById("feedback");
  el.className = type;
  el.innerHTML = text;
}
function hideFeedback() {
  const el = document.getElementById("feedback");
  el.className = "hidden";
  el.textContent = "";
}
function startFirst() {
  mode = "first"; redoRound = 0;
  currentQueue = QUESTIONS.map((_, i) => i);
  queuePtr = 0; qi = 0;
  answers = Array(QUESTIONS.length).fill(null);
  locked = Array(QUESTIONS.length).fill(false);
  judgedWrong = Array(QUESTIONS.length).fill(false);
  wrongPicks = QUESTIONS.map(() => []);
  optionOrder = QUESTIONS.map(() => [0,1,2,3]);
  totalWrongTries = 0; advancing = false;
  renderQ();
}
function startRedo() {
  mode = "redo"; redoRound += 1;
  currentQueue = QUESTIONS.map((_, i) => i).filter(i => !locked[i]);
  currentQueue.forEach(i => {
    optionOrder[i] = shuffledOrder();
    answers[i] = null;
    judgedWrong[i] = false;
    wrongPicks[i] = [];
  });
  queuePtr = 0; qi = currentQueue[0]; advancing = false;
  renderQ();
}
function goNextInQueue() {
  advancing = false;
  queuePtr += 1;
  if (queuePtr < currentQueue.length) { qi = currentQueue[queuePtr]; renderQ(); return; }
  if (locked.every(Boolean)) { submitQuiz(); return; }
  startRedo();
}
document.getElementById("loginBtn").onclick = () => {
  const id = sel.value;
  const pw = normId(document.getElementById("pw").value);
  const err = document.getElementById("loginErr");
  err.textContent = "";
  if (!id) { err.textContent = "請先選擇姓名。"; return; }
  if (pw !== id) { err.textContent = "密碼不正確。請輸入自己的學號兩位數字。"; return; }
  currentUser = STUDENTS.find(s => s.id === id);
  document.getElementById("who").textContent = currentUser.id + " " + currentUser.name;
  document.getElementById("loginCard").classList.add("hidden");
  document.getElementById("resultCard").classList.add("hidden");
  document.getElementById("quizCard").classList.remove("hidden");
  startFirst();
};
function renderQ() {
  const item = QUESTIONS[qi];
  const doneCount = locked.filter(Boolean).length;
  const remain = QUESTIONS.length - doneCount;
  if (mode === "redo") {
    document.getElementById("progText").textContent = "錯題重做　第 " + (queuePtr + 1) + " / " + currentQueue.length + " 題　尚餘 " + remain + " 題";
    document.getElementById("secTag").textContent = "錯題重做 · 第 " + redoRound + " 輪 · " + item.section;
  } else {
    document.getElementById("progText").textContent = "第 " + (qi + 1) + " / " + QUESTIONS.length + " 題　已答對 " + doneCount + " 題";
    document.getElementById("secTag").textContent = item.section;
  }
  document.getElementById("barFill").style.width = (doneCount / QUESTIONS.length * 100) + "%";
  document.getElementById("qText").textContent = (qi + 1) + ". " + item.q;
  document.getElementById("picto").innerHTML = picHTML(item);
  const order = optionOrder[qi];
  const box = document.getElementById("opts");
  box.innerHTML = "";
  const pickedWrong = wrongPicks[qi] || [];
  order.forEach((orig, display) => {
    const b = document.createElement("button");
    const isPicked = answers[qi] === orig;
    let cls = "opt";
    if (locked[qi] && orig === item.ans) cls += " correct locked";
    else if (pickedWrong.indexOf(orig) !== -1) cls += " wrong";
    else if (isPicked) cls += " picked";
    b.className = cls;
    b.textContent = ["A","B","C","D"][display] + ".  " + item.options[orig];
    b.disabled = locked[qi] || advancing || pickedWrong.indexOf(orig) !== -1;
    b.onclick = () => onPick(orig);
    box.appendChild(b);
  });
  const nextBtn = document.getElementById("nextBtn");
  if (judgedWrong[qi] && !locked[qi]) {
    const lastWrong = pickedWrong[pickedWrong.length - 1];
    const specific = (item.wrongHints && lastWrong != null) ? item.wrongHints[lastWrong] : "";
    const general = item.hint || "再睇一次題目同選項，諗下點解剛才喺個選擇未夠準。";
    const hintText = specific || general;
    showFeedback("bad",
      "<div class=\"hint-title\">未答對，先一齊想一想</div>" +
      "<div>" + hintText + "</div>" +
      "<div class=\"hint-next\">可以再選其他選項；或者按「下一題」，稍後重做。</div>"
    );
    nextBtn.classList.remove("hidden");
    nextBtn.textContent = queuePtr === currentQueue.length - 1 ? (remain > 0 ? "開始重做錯題" : "完成") : "下一題";
  } else if (locked[qi]) {
    showFeedback("ok", "正確！");
    nextBtn.classList.add("hidden");
  } else {
    hideFeedback();
    nextBtn.classList.add("hidden");
  }
}
function onPick(orig) {
  if (locked[qi] || advancing) return;
  if ((wrongPicks[qi] || []).indexOf(orig) !== -1) return;
  answers[qi] = orig;
  if (orig === QUESTIONS[qi].ans) {
    locked[qi] = true; judgedWrong[qi] = false; advancing = true;
    renderQ();
    setTimeout(goNextInQueue, 450);
  } else {
    wrongPicks[qi] = (wrongPicks[qi] || []).concat([orig]);
    judgedWrong[qi] = true;
    totalWrongTries += 1;
    renderQ();
  }
}
document.getElementById("nextBtn").onclick = () => {
  if (!judgedWrong[qi] || locked[qi] || advancing) return;
  goNextInQueue();
};
function buildWaText(rec) {
  const when = new Date(rec.time).toLocaleString("zh-HK");
  return [
    "化學小測結果",
    "學號：" + rec.id,
    "姓名：" + rec.name,
    "成績：" + rec.score + "/" + QUESTIONS.length + "（已完成）",
    "選錯次數：" + rec.wrongTries,
    "重做輪數：" + rec.redoRounds,
    "完成時間：" + when
  ].join("\n");
}
function submitQuiz() {
  if (!locked.every(Boolean)) return;
  const N = QUESTIONS.length;
  const rec = { id: currentUser.id, name: currentUser.name, score: N, completed: true, wrongTries: totalWrongTries, redoRounds: redoRound, answers: answers.slice(), time: new Date().toISOString() };
  lastRec = rec;
  const all = JSON.parse(localStorage.getItem("chem30_results") || "{}");
  all[currentUser.id] = rec;
  localStorage.setItem("chem30_results", JSON.stringify(all));
  localStorage.setItem("chem30_last", JSON.stringify(rec));
  document.getElementById("quizCard").classList.add("hidden");
  document.getElementById("resultCard").classList.remove("hidden");
  document.getElementById("scoreNum").innerHTML = N + "<span> / " + N + "</span>";
  const name = currentUser.name;
  let cheer;
  if (totalWrongTries === 0) cheer = name + "，太棒了！一次過 " + N + " 題全對，基礎好穩陣，繼續保持這份細心同努力！";
  else if (redoRound <= 1) cheer = name + "，做得好！錯題都已經更正，全數完成。肯改、肯再試，就係學化學最重要嘅態度。";
  else cheer = name + "，恭喜完成！經過 " + redoRound + " 輪重做，而家 " + N + " 題全部正確。堅持到最後，非常了不起！";
  document.getElementById("scoreMsg").textContent = cheer;
  document.getElementById("tryInfo").textContent = totalWrongTries === 0 ? "一次過全對，沒有選錯過。" : "過程中共選錯 " + totalWrongTries + " 次，最後已全部更正。";
  document.getElementById("savedNote").textContent = "成績已自動儲存。請按下面綠色按鈕用 WhatsApp 傳給老師。";
  const sections = {};
  QUESTIONS.forEach((q, i) => {
    if (!sections[q.section]) sections[q.section] = { t: 0, c: 0 };
    sections[q.section].t++;
    if (answers[i] === q.ans) sections[q.section].c++;
  });
  document.getElementById("sectionScores").innerHTML = Object.entries(sections).map(([k, v]) => "<div style=\"display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--line);\"><span>"+k+"</span><strong>"+v.c+" / "+v.t+"</strong></div>").join("");
  document.getElementById("chipGrid").innerHTML = QUESTIONS.map((q, i) => "<div class=\"chip "+(answers[i]===q.ans?"ok":"no")+"\">"+(i+1)+"</div>").join("");
  document.getElementById("reviewBox").classList.add("hidden");
}
document.getElementById("waBtn").onclick = () => {
  const rec = lastRec || JSON.parse(localStorage.getItem("chem30_last") || "null");
  if (!rec) { alert("未有可傳送的成績。"); return; }
  const url = "https://wa.me/" + TEACHER_WHATSAPP + "?text=" + encodeURIComponent(buildWaText(rec));
  window.open(url, "_blank");
};
document.getElementById("reviewBtn").onclick = () => {
  const box = document.getElementById("reviewBox");
  box.classList.remove("hidden");
  box.innerHTML = QUESTIONS.map((q, i) => {
    const ok = answers[i] === q.ans;
    const pick = answers[i] == null ? "—" : ["A","B","C","D"][answers[i]] + ". " + q.options[answers[i]];
    return "<div style=\"padding:12px 0;border-bottom:1px solid var(--line);\"><div class=\"section-tag\">"+q.section+"</div><div style=\"font-weight:700;\">"+(i+1)+". "+q.q+"</div>"+(picHTML(q)?"<div class=\"pictowrap\">"+picHTML(q)+"</div>":"")+"<div style=\"margin-top:8px;\">你的答案：<strong style=\"color:"+(ok?"var(--ok)":"var(--bad)")+"\">"+pick+"</strong></div><div>正確答案：<strong>"+["A","B","C","D"][q.ans]+". "+q.options[q.ans]+"</strong></div><div class=\"explain\">"+q.exp+"</div></div>";
  }).join("");
};
document.getElementById("againBtn").onclick = () => {
  document.getElementById("resultCard").classList.add("hidden");
  document.getElementById("loginCard").classList.remove("hidden");
  document.getElementById("pw").value = "";
};
function teacherGate() { return document.getElementById("teacherPw").value.trim() === TEACHER_PASSWORD; }
document.getElementById("showRecBtn").onclick = () => {
  if (!teacherGate()) { alert("老師密碼不正確。"); return; }
  const all = JSON.parse(localStorage.getItem("chem30_results") || "{}");
  const rows = STUDENTS.map(s => {
    const r = all[s.id];
    return "<tr><td>"+s.id+"</td><td>"+s.name+"</td><td>"+(r && r.completed ? "已完成 "+(r.score||QUESTIONS.length)+"/"+QUESTIONS.length : "未完成")+"</td><td>"+(r && r.wrongTries != null ? r.wrongTries : "—")+"</td><td>"+(r ? new Date(r.time).toLocaleString("zh-HK") : "—")+"</td></tr>";
  }).join("");
  document.getElementById("recBox").innerHTML = "<table><thead><tr><th>學號</th><th>姓名</th><th>狀態</th><th>選錯次數</th><th>完成時間</th></tr></thead><tbody>"+rows+"</tbody></table>";
};
document.getElementById("exportBtn").onclick = () => {
  if (!teacherGate()) { alert("老師密碼不正確。"); return; }
  const all = JSON.parse(localStorage.getItem("chem30_results") || "{}");
  let csv = "學號,姓名,狀態,選錯次數,完成時間\n";
  STUDENTS.forEach(s => {
    const r = all[s.id];
    csv += [s.id, s.name, r && r.completed ? "已完成" : "未完成", r && r.wrongTries != null ? r.wrongTries : "", r ? r.time : ""].join(",") + "\n";
  });
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "chem30_results.csv";
  a.click();
};
document.getElementById("clearBtn").onclick = () => {
  if (!teacherGate()) { alert("老師密碼不正確。"); return; }
  if (confirm("確定清除這部裝置上的全部提交紀錄？")) {
    localStorage.removeItem("chem30_results");
    document.getElementById("recBox").innerHTML = "<p class='hint'>已清除。</p>";
  }
};
