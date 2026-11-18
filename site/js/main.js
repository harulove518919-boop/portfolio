// ===== スマホのメニュー（開け閉め・Esc・リンクを押したら閉じる） =====
const menuButton = document.querySelector(".menu-button");
const nav = document.getElementById("global-nav");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  nav.classList.toggle("is-open", open);
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus(); // 閉じたら、メニューのボタンに戻す
  }
});

// ===== お問い合わせフォーム（入力チェック。送信は見本） =====
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const message = document.getElementById("message");
const count = document.getElementById("message-count");

const rules = {
  name: (v) => (v.trim() ? "" : "お名前を入力してください"),
  email: (v) => {
    if (!v.trim()) return "メールアドレスを入力してください";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "メールアドレスの形が正しくありません（例：name@example.com）";
  },
  message: (v) => (v.trim() ? "" : "メッセージを入力してください"),
};

// 1つの欄を確かめて、エラーを出す（読み上げにも伝わるよう aria-invalid を付ける）
function check(field) {
  const error = document.getElementById(`${field.id}-error`);
  const text = rules[field.id](field.value);
  field.setAttribute("aria-invalid", text ? "true" : "false");
  error.textContent = text;
  error.hidden = !text;
  return !text;
}

for (const id of Object.keys(rules)) {
  const field = document.getElementById(id);
  // 一度さわった欄から、入力しながら確かめる
  field.addEventListener("blur", () => check(field));
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") check(field);
  });
}

message.addEventListener("input", () => {
  count.textContent = String(message.value.length);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "";
  const fields = Object.keys(rules).map((id) => document.getElementById(id));
  const results = fields.map(check);
  const firstError = fields.find((_, i) => !results[i]);
  if (firstError) {
    firstError.focus(); // 最初に直す欄へ移動する
    return;
  }
  // 見本なので、どこにも送らずにお礼を出す
  status.textContent = "お問い合わせありがとうございます（見本のため、実際には送信されていません）";
  form.reset();
  count.textContent = "0";
  fields.forEach((f) => f.removeAttribute("aria-invalid"));
});
