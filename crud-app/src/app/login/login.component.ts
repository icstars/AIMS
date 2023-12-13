import { Component } from '@angular/core';
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginCode: string = '1234';

  setLoginCode(code: string): void {
    this.loginCode = code;
  }

  getLoginCode(): string {
    return this.loginCode;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {

}

class PinLogin {
  private el: {
    main: HTMLElement;
    numPad: HTMLElement | null;
    textDisplay: HTMLInputElement | null;
  };
  private loginEndpoint: string;
  private redirectTo: string;
  private maxNumbers: number;
  private value: string;

  constructor({ el, loginEndpoint, redirectTo, maxNumbers = 4 }: {
    el: HTMLElement,
    loginEndpoint: string,
    redirectTo: string,
    maxNumbers?: number
  }) {
    this.el = {
      main: el,
      numPad: el.querySelector(".pin-login__numpad"),
      textDisplay: el.querySelector(".pin-login__text")
    };
    if (!this.el.numPad || !this.el.textDisplay) {
      throw new Error("Could not find required elements.");
    }

    this.loginEndpoint = loginEndpoint;
    this.redirectTo = redirectTo;
    this.maxNumbers = maxNumbers;
    this.value = "";

    this._generatePad();
  }

  private _generatePad() {
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
      keyEl.classList.toggle("material-icons", isNaN(Number(key)));
      keyEl.textContent = key;
      keyEl.addEventListener("click", () => { this._handleKeyPress(key); });
      if (this.el.numPad) {
        this.el.numPad.appendChild(keyEl);

        if (insertBreak) {
          this.el.numPad.appendChild(document.createElement("br"));
        }
      }
    });
  }

  private _handleKeyPress(key: string) {
    switch (key) {
      case "x":
        this.value = this.value.substring(0, this.value.length - 1);
        break;
      case ">":
        this._attemptLogin();
        break;
      default:
        if (this.value.length < this.maxNumbers && !isNaN(Number(key))) {
          this.value += key;
        }
        break;
    }
    this._updateValueText();
  }

  private _updateValueText() {
    if (this.el.textDisplay) {
      this.el.textDisplay.value = "*".repeat(this.value.length);
      this.el.textDisplay.classList.remove("pin-login__text--error");
    }
  }

  private _attemptLogin() {
    if (this.value === "1234") { // Check if entered PIN is correct
      window.location.href = this.redirectTo; // Redirect to dashboard.html
    } else {
      if (this.el.textDisplay) {
        this.el.textDisplay.classList.add("pin-login__text--error");
      }
    }
  }
}

const mainPinLogin = document.getElementById("mainPinLogin");
if (mainPinLogin) {
  new PinLogin({
    el: mainPinLogin,
    loginEndpoint: "login.php",
    redirectTo: "app.component.html"
  });
}