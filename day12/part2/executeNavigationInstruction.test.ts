import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { executeNavigationInstruction } from "./executeNavigationInstruction.ts";
await Deno.test("executeNavigationInstruction", () => {
  //does not move if waypoint is zero
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "F", amount: 10 },
      0,
      0,
      0,
      0
    ),
    {
      x: 0,
      y: 0,
      waypointX: 0,
      waypointY: 0,
    }
  );
  //moves to waypoint
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "F", amount: 1 },
      0,
      0,
      1,
      1
    ),
    {
      x: 1,
      y: 1,
      waypointX: 1,
      waypointY: 1,
    }
  );

  //respects move amount
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "F", amount: 10 },
      0,
      0,
      1,
      1
    ),
    {
      x: 10,
      y: 10,
      waypointX: 1,
      waypointY: 1,
    }
  );

  //moves waypoint
  assertEquals(
    executeNavigationInstruction(
      { type: "move", direction: "N", amount: 3 },
      0,
      0,
      1,
      1
    ),
    {
      x: 0,
      y: 0,
      waypointX: 1,
      waypointY: -2,
    }
  );

  //rotates waypoint
  assertEquals(
    executeNavigationInstruction(
      { type: "rotate", direction: "L", amount: 90 },
      0,
      0,
      4,
      1
    ),
    {
      x: 0,
      y: 0,
      waypointX: 1,
      waypointY: -4,
    }
  );

  //rotates waypoint
  assertEquals(
    executeNavigationInstruction(
      { type: "rotate", direction: "R", amount: 90 },
      0,
      0,
      4,
      1
    ),
    {
      x: 0,
      y: 0,
      waypointX: -1,
      waypointY: 4,
    }
  );
});
