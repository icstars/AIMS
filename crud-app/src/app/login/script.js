class PinLogin {
    constructor({ el, loginEndpoint, redirectTo, maxNumbers = 4 }) {
      this.el = {
        main: el,
        numPad: el.querySelector(".pin-login__numpad"),
        textDisplay: el.querySelector(".pin-login__text")
      };
      this.loginEndpoint = loginEndpoint;
      this.redirectTo = redirectTo;
      this.maxNumbers = maxNumbers;
      this.value = "";
  
      this._generatePad();
    }
  
    _generatePad() {
      const padLayout = [
        "1", "2", "3",
        "4", "5", "6",
        "7", "8", "9",
        "x", "0", ">"
      ];
  
      padLayout.forEach(key => {
        const insertBreak = key.search(/[369]/) !== -1;
        const keyEl = document.createElement("div");
  
        keyEl.classList.add("pin-login__key");
        keyEl.classList.toggle("material-icons", isNaN(key));
        keyEl.textContent = key;
        keyEl.addEventListener("click", () => { this._handleKeyPress(key) });
        this.el.numPad.appendChild(keyEl);
  
        if (insertBreak) {
          this.el.numPad.appendChild(document.createElement("br"));
        }
      });
    }
  
    _handleKeyPress(key) {
      switch (key) {
        case "x":
          this.value = this.value.substring(0, this.value.length - 1);
          break;
        case ">":
          this._attemptLogin();
          break;
        default:
          if (this.value.length < this.maxNumbers && !isNaN(key)) {
            this.value += key;
          }
          break;
      }
      this._updateValueText();
    }
  
    _updateValueText() {
      this.el.textDisplay.value = "*".repeat(this.value.length);
      this.el.textDisplay.classList.remove("pin-login__text--error");
    }
  
    _attemptLogin() {
      if (this.value === "1234") { // Check if entered PIN is correct
        window.location.href = this.redirectTo; // Redirect to dashboard.html
      } else {
        this.el.textDisplay.classList.add("pin-login__text--error");
      }
    }
  }
  
  new PinLogin({
    el: document.getElementById("mainPinLogin"),
    loginEndpoint: "login.php", //fix this 
    redirectTo: "dashboard.html"
  });