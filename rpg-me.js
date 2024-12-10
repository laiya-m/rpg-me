/**
 * Copyright 2024 laiya-m
 * @license Apache-2.0, see LICENSE for full text.
 */

import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";
import { SimpleColors } from "@haxtheweb/simple-colors/simple-colors.js"; 

class RpgCharacter extends SimpleColors {
  static get tag() {
    return "rpg-character";
  }

  constructor() {
    super();
    this.seed = "default";
    this.base = 0;
    this.accessories = 0;
    this.hat = "none";
    this.fire = false;
    this.walking = false;
    this.circle = false;
    this.height = 300;
    this.width = 300;
  }

  static get properties() {
    return {
      seed: { type: String },
      base: { type: Number },
      accessories: { type: Number },
      hat: { type: String },
      fire: { type: Boolean },
      walking: { type: Boolean },
      circle: { type: Boolean },
      height: { type: Number },
      width: { type: Number },
    };
  }

  render() {
    return html`
      <div
        style="width: ${this.width}px; height: ${this.height}px; background: #f4f4f4; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;"
      >
        <div>Character (Seed: ${this.seed})</div>
      </div>
    `;
  }
}

customElements.define(RpgCharacter.tag, RpgCharacter);

// JavaScript logic for managing rpg-me
document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  const accessoriesInput = document.getElementById("accessories");
  const baseInput = document.getElementById("base");
  const hatInput = document.getElementById("hat");
  const fireInput = document.getElementById("fire");
  const walkingInput = document.getElementById("walking");
  const circleInput = document.getElementById("circle");
  const updateButton = document.getElementById("update-button");

  // Function to update character properties
  const updateCharacter = () => {
    character.accessories = parseInt(accessoriesInput.value) || 0;
    character.base = parseInt(baseInput.value) || 0;
    character.hat = hatInput.value || "none";
    character.fire = fireInput.checked;
    character.walking = walkingInput.checked;
    character.circle = circleInput.checked;
  };

  // Attach event listeners for live updates
  [accessoriesInput, baseInput, hatInput, fireInput, walkingInput, circleInput].forEach((input) => {
    input.addEventListener("input", updateCharacter);
  });

  // Generate a shareable link
  updateButton.addEventListener("click", () => {
    const params = new URLSearchParams({
      seed: character.seed,
      accessories: character.accessories,
      base: character.base,
      hat: character.hat,
      fire: character.fire,
      walking: character.walking,
      circle: character.circle,
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(shareUrl);
    alert(`Shareable link copied: ${shareUrl}`);
  });
});