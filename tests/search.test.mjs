import test from "node:test";
import assert from "node:assert/strict";

import { normalizeForSearch } from "../public/app.js";

test("normalizeForSearch matches language names regardless of case and accents", () => {
  assert.equal(normalizeForSearch(" Tahitián "), "tahitian");
  assert.equal(normalizeForSearch("Zerqet   Senhaja Berber"), "zerqet senhaja berber");
});

test("normalizeForSearch folds unicode small caps into plain latin text", () => {
  assert.equal(normalizeForSearch("ᴛᴀʜɪᴛɪᴀɴ"), "tahitian");
  assert.equal(normalizeForSearch("ᴍᴡᴏᴛʟᴀᴘ"), "mwotlap");
  assert.equal(normalizeForSearch("ꜱᴇɴʜᴀᴊᴀ"), "senhaja");
});
