import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import {
  EncodingVerificationResult,
  verifyXMASEncoding,
} from "./verifyXmasEncoding.ts";

Deno.test("verifyXmasEncoding verifies the number array", () => {
  const testNumbers = [1, 2, 3];
  assertEquals(verifyXMASEncoding(testNumbers, 2), {
    isSuccess: true,
  } as EncodingVerificationResult);
});

Deno.test("verifyXmasEncoding verifies a longer number array", () => {
  const testNumbers = [1, 2, 3, 5, 8, 13];
  assertEquals(verifyXMASEncoding(testNumbers, 2), {
    isSuccess: true,
  } as EncodingVerificationResult);
});
