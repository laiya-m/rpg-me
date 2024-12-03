/**
 * Copyright 2024 laiya-m
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

document.addEventListener('DOMContentLoaded', () => {
  const character = document.getElementById('character');
  const accessoriesInput = document.getElementById('accessories');
  const baseInput = document.getElementById('base');
  const hatInput = document.getElementById('hat');
  const updateButton = document.getElementById('update-button');

  // Update character properties when the button is clicked
  updateButton.addEventListener('click', () => {
    const accessories = parseInt(accessoriesInput.value) || 0;
    const base = parseInt(baseInput.value) || 0;
    const hat = hatInput.value || 'none';

    character.accessories = accessories;
    character.base = base;
    character.hat = hat;
  });
});
