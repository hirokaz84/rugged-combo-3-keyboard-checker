import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let keyboard = new Keyboard({
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
  theme: "hg-theme-default hg-layout-default myTheme",
  layout: {
    default: [
      "¥ 1 2 3 4 5 6 7 8 9 0 - ^ {bksp}",
      "{tab} q w e r t y u i o p @ [ {enter}",
      "{ctrl} a s d f g h j k l ; : ] {enter}",
      "{shiftleft} z x c v b n m , . / _ {shiftright}",
      "{lock} {alt} {metaleft} {alphanumeric} [{space}] {hiragana} {metaright} {globe} {arrowleft} [{arrowup} {arrowdown}] {arrowright}"
    ]
  },
  display: {
    "{tab}": "⇥",
    "{bksp}": "⌫",
    "{enter}": "↵",
    "{ctrl}": "ctrl",
    "{lock}": "⇪",
    "{shiftleft}": "⇧",
    "{shiftright}": "⇧",
    "{alt}": "⌥ opt",
    "{space}": " ",
    "{metaleft}": "⌘ cmd",
    "{metaright}": "⌘ cmd",
    "{globe}": "<br />🌐",
    "{arrowleft}": "←",
    "{arrowup}": "↑",
    "{arrowdown}": "↓",
    "{arrowright}": "→",
    "{alphanumeric}": "<br />英数",
    "{hiragana}": "<br />かな"
  },
  buttonTheme: [
    {
      class: "myArrowBtns",
      buttons: "{arrowleft} [{arrowup} {arrowdown}] {arrowright}"
    }, //myModifierBtns
    {
      class: "myModifierBtns",
      buttons: "{lock} {alt} {metaleft} {alphanumeric}"
    },
    {
      class: "myModifierBtns",
      buttons: "{hiragana} {metaright} {globe}"
    },
    {
      class: "hg-lightgray",
      buttons: "{alphanumeric} {hiragana} {globe}"
    }
  ]
});

let buttons = "";
// キーが押されたらここに入れる
let cur = {
  key: "",
  keycd: "",
  code: ""
};

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", (event) => {
  keyboard.setInput(event.target.value);
});

function onChange(input) {
  //  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);
  /* debug
  buttons = buttons + ' ' + button;
  document.querySelector(".input").value = buttons;
  keyboard.setOptions({
    buttonTheme: [
      {
        class: "hg-red",
        buttons: buttons
      }
    ]
  });
*/
  document.querySelector(".input").classList.toggle("hidden");
  document.querySelector(".button").classList.toggle("hidden");
  document.querySelector("footer").classList.toggle("hidden");
}

/*
 * [イベント] キーが押し込まれた瞬間
 */
window.addEventListener("keydown", (e) => {
  cur.keycd = e.keyCode; // 押されたキー (Integer)
  cur.code = e.code; // 押されたキー (String)
  //  cur.key     = e.key;      // 入力されたキー (String)
  console.log("keydown changed", e.key + " " + e.keyCode);
  if (e.key === "Tab") {
    e.preventDefault();
  }
  cur.key =
    e.code === "MetaLeft"
      ? "{metaleft}"
      : e.code === "MetaRight"
      ? "{metaright}"
      : e.code === "ShiftLeft"
      ? "{shiftleft}"
      : e.code === "ShiftRight"
      ? "{shiftright}"
      : e.code === "Space" && e.ctrlKey === true
      ? "{globe}"
      : e.code === "Space" && e.ctrlKey === false
      ? "{space}"
      : e.key === "Backspace"
      ? "{bksp}"
      : e.key === "Tab"
      ? "{tab}"
      : e.key === "CapsLock"
      ? "{lock}"
      : e.key === "Enter"
      ? "{enter}"
      : e.key === "Control"
      ? "{ctrl}"
      : e.key === "Alt"
      ? "{alt}"
      : e.key === "Alphanumeric"
      ? "{alphanumeric}"
      : e.key === "Hiragana"
      ? "{hiragana}"
      : e.key === "ArrowLeft"
      ? "{arrowleft}"
      : e.key === "ArrowUp"
      ? "{arrowup}"
      : e.key === "ArrowDown"
      ? "{arrowdown}"
      : e.key === "ArrowRight"
      ? "{arrowright}"
      : e.key;

  buttons = buttons + " " + cur.key;
  buttons = buttons.replace("{ctrl} {globe}", "{globe}");
  document.querySelector(".input").value = buttons;
  keyboard.setOptions({
    buttonTheme: [
      {
        class: "hg-red",
        buttons: buttons
      },
      {
        class: "myArrowBtns",
        buttons: "{arrowleft} [{arrowup} {arrowdown}] {arrowright}"
      }, //myModifierBtns
      {
        class: "myModifierBtns",
        buttons: "{lock} {alt} {metaleft} {alphanumeric}"
      },
      {
        class: "myModifierBtns",
        buttons: "{hiragana} {metaright} {globe}"
      },
      {
        class: "hg-lightgray",
        buttons: "{alphanumeric} {hiragana} {globe}"
      }
    ]
  });

  // フォームに値をセット
  //document.querySelector("#keycd").value    = cur.keycd;
  //document.querySelector("#code").value     = cur.code;
});
