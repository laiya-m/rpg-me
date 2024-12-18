/**
 * Copyright 2024 laiya-m
 * @license Apache-2.0, see LICENSE for full text.
 */

/* The code was made up of a combination of the prof's provided rpg-character.js, chatGPT, and help from other classmates */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import { WiredCheckbox, WiredButton, WiredCombo, WiredItem } from 'wired-elements';
import { SimpleColors } from "@haxtheweb/simple-colors/simple-colors.js"; 

export class RpgMe extends LitElement {
  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    this.charProperties = {
      seed: urlParams.get("seed") || "1234567890",
      accessories: parseInt(urlParams.get("accessories") || "0", 10),
      base: parseInt(urlParams.get("base") || "0", 10),
      face: parseInt(urlParams.get("face") || "0", 10),
      faceItem: parseInt(urlParams.get("faceItem") || "0", 10),
      hair: parseInt(urlParams.get("hair") || "0", 10),
      pants: parseInt(urlParams.get("pants") || "0", 10),
      shirt: parseInt(urlParams.get("shirt") || "0", 10),
      skin: parseInt(urlParams.get("skin") || "0", 10),
      hat: urlParams.get("hat") || "none",
      hatColor: parseInt(urlParams.get("hatColor") || "0", 10),
      fire: urlParams.get("fire") === "true",
      walking: urlParams.get("walking") === "true",
      circle: urlParams.get("circle") === "true",
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 16px;
        font-family: Arial, sans-serif;
      }
      .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 16px;
      }
      .character-preview {
        flex: 1;
        text-align: center;
      }
      .controls {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .seed-display {
        margin-top: 10px;
        font-family: monospace;
      }
    `;
  }

  handlePropertyChange(prop, value) {
    this.charProperties = { ...this.charProperties, [prop]: value };
    this._updateUrlParams();
    this.requestUpdate();
  }

  _updateUrlParams() {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(this.charProperties)) {
      params.set(key, value);
    }
    history.replaceState(null, "", `?${params.toString()}`);
  }

  _generateShareLink() {
    const params = new URLSearchParams(this.charProperties);
    const shareLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareLink).then(() => {
      alert(`Shareable link copied: ${shareLink}`);
    });
  }

  renderInput(label, prop, type = "number", min = 0, max = 9) {
    return html`
      <label>
        ${label}:
        <wired-input
          type="${type}"
          min="${min}"
          max="${max}"
          .value="${this.charProperties[prop]}"
          @change="${(e) => this.handlePropertyChange(prop, e.target.value)}"
        ></wired-input>
      </label>
    `;
  }

  renderCheckbox(label, prop) {
    return html`
      <wired-checkbox
        ?checked="${this.charProperties[prop]}"
        @change="${(e) => this.handlePropertyChange(prop, e.target.checked)}"
      >
        ${label}
      </wired-checkbox>
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="character-preview">
          <rpg-character
            .seed="${this.charProperties.seed}"
            .accessories="${this.charProperties.accessories}"
            .base="${this.charProperties.base}"
            .face="${this.charProperties.face}"
            .faceItem="${this.charProperties.faceItem}"
            .hair="${this.charProperties.hair}"
            .pants="${this.charProperties.pants}"
            .shirt="${this.charProperties.shirt}"
            .skin="${this.charProperties.skin}"
            .hat="${this.charProperties.hat}"
            .hatColor="${this.charProperties.hatColor}"
            ?fire="${this.charProperties.fire}"
            ?walking="${this.charProperties.walking}"
            ?circle="${this.charProperties.circle}"
            height="400"
            width="300"
          ></rpg-character>
          <div class="seed-display">
            Seed: ${this.charProperties.seed}
          </div>
        </div>

        <div class="controls">
          ${this.renderInput("Accessories", "accessories")}
          ${this.renderInput("Base", "base", "number", 0, 1)}
          ${this.renderInput("Face", "face")}
          ${this.renderInput("Face Item", "faceItem")}
          ${this.renderInput("Hair", "hair")}
          ${this.renderInput("Pants", "pants")}
          ${this.renderInput("Shirt", "shirt")}
          ${this.renderInput("Skin", "skin")}
          ${this.renderInput("Hat Color", "hatColor")}
          <label>
            Hat:
            <wired-combo
              .selected="${this.charProperties.hat}"
              @selected="${(e) =>
                this.handlePropertyChange("hat", e.detail.selected)}"
            >     
            <!-- all hat options -->
              <wired-item value="none">None</wired-item>
              <wired-item value="bunny">Bunny</wired-item>
              <wired-item value="cowboy">Cowboy</wired-item>
              <wired-item value="ninja">Ninja</wired-item>
              <wired-item value="party">Party</wired-item>
              <wired-item value="pirate">Pirate</wired-item>
            </wired-combo>
          </label>
          ${this.renderCheckbox("Fire", "fire")}
          ${this.renderCheckbox("Walking", "walking")}
          ${this.renderCheckbox("Circle", "circle")}

          <wired-button @click="${this._generateShareLink}">
            Generate Share Link
          </wired-button>
        </div>
      </div>
    `;
  }
}

customElements.define(RpgMe.tag, RpgMe);