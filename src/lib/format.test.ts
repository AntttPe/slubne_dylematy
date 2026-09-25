import { test } from "node:test";
import assert from "node:assert/strict";
import { firstName, formatName, formatPhone } from "./format.ts";

test("capitalises a lowercase name", () => {
  assert.equal(formatName("antek pietraszewski"), "Antek Pietraszewski");
});

test("fixes a shouted name", () => {
  assert.equal(formatName("ANNA KOWALSKA"), "Anna Kowalska");
});

test("keeps Polish diacritics in the right case", () => {
  assert.equal(formatName("łukasz ćwik"), "Łukasz Ćwik");
  assert.equal(formatName("ŚWIĘTOSŁAWA ŻÓŁW"), "Świętosława Żółw");
});

test("handles hyphenated and apostrophed names", () => {
  assert.equal(formatName("anna-maria nowak-kowalska"), "Anna-Maria Nowak-Kowalska");
  assert.equal(formatName("sean o'brien"), "Sean O'Brien");
});

test("leaves intentional inner capitals alone", () => {
  assert.equal(formatName("Ronald McDonald"), "Ronald McDonald");
});

test("collapses stray whitespace", () => {
  assert.equal(formatName("  jan   paweł  "), "Jan Paweł");
});

test("firstName drops the surname", () => {
  assert.equal(firstName("antek pietraszewski"), "Antek");
  assert.equal(firstName("ANNA-MARIA NOWAK"), "Anna-Maria");
  assert.equal(firstName("magda"), "Magda");
});

test("formatPhone groups digits in threes and strips letters", () => {
  assert.equal(formatPhone("725824732"), "725 824 732");
  assert.equal(formatPhone("abc725def824"), "725 824");
  assert.equal(formatPhone("725 824 732", 9), "725 824 732");
});

test("formatPhone respects the digit cap", () => {
  assert.equal(formatPhone("1234567890123456789", 9), "123 456 789");
});
