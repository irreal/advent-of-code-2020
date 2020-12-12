import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { executeNavigationInstruction } from "./executeNavigationInstruction.ts";
await Deno.test("executeNavigationInstruction", () => {
  //basic navigation
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "F", amount: 10 },
      0,
      0,
      0
    ),
    {
      x: 10,
      y: 0,
      rotation: 0,
    }
  );

  //considers starting position
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "F", amount: 10 },
      20,
      0,
      0
    ),
    {
      x: 30,
      y: 0,
      rotation: 0,
    }
  );

  //considers rotation
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "F", amount: 10 },
      20,
      0,
      90
    ),
    {
      x: 20,
      y: 10,
      rotation: 90,
    }
  );

  //moves in cardinal directions
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "N", amount: 10 },
      20,
      50,
      90
    ),
    {
      x: 20,
      y: 40,
      rotation: 90,
    }
  );
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "W", amount: 10 },
      20,
      50,
      90
    ),
    {
      x: 10,
      y: 50,
      rotation: 90,
    }
  );

  //rotates
  assertEquals(
    executeNavigationInstruction(
      { type: "rotate", direction: "L", amount: 90 },
      20,
      50,
      90
    ),
    {
      x: 20,
      y: 50,
      rotation: 0,
    }
  );
  assertEquals(
    executeNavigationInstruction(
      { type: "rotate", direction: "R", amount: 90 },
      20,
      50,
      90
    ),
    {
      x: 20,
      y: 50,
      rotation: 180,
    }
  );

  //rotation wraps around 360 both ways
  assertEquals(
    executeNavigationInstruction(
      { type: "rotate", direction: "L", amount: 180 },
      20,
      50,
      90
    ),
    {
      x: 20,
      y: 50,
      rotation: 270,
    }
  );

  assertEquals(
    executeNavigationInstruction(
      { type: "rotate", direction: "R", amount: 180 },
      20,
      50,
      90
    ),
    {
      x: 20,
      y: 50,
      rotation: 270,
    }
  );
});
