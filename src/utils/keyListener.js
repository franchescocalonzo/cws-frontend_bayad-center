export const keyListener = (e) => {
  const key = e.key;
  const name = e.target.name;
  if (
    !(
      key === "Backspace" ||
      key === "Delete" ||
      /[0-9]/.test(e.key) ||
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "ArrowLeft" ||
      key === "ArrowRight"
    )
  ) {
    e.preventDefault();
  }

  if (key === "Backspace") {
    const element = name.replace("pin_", "");
    const integer = Number(element);
    console.log("integer:", integer.toString());

    if (integer > 1) {
      if (integer == 6) {
        document.getElementById("pin_6").value = "";
        document.querySelector(`input[id="pin_5"]`).focus();
      } else {
        const decrement = integer - 1;
        const string = decrement.toString();
        const nextElement = string;
        document.querySelector(`input[id="pin_${nextElement}"]`).focus();
      }
    }
  }
};

export default {
  keyListener,
};
