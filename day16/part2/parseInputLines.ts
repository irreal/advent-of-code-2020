import { Rule, Ticket } from "./models.ts";

export function parseInputLines(
  lines: string[]
): { rules: Rule[]; ourTicket: Ticket; nearbyTickets: Ticket[] } {
  let loading: "rules" | "ourTicket" | "nearbyTickets" = "rules";
  const rules: Rule[] = [];
  const nearbyTickets: Ticket[] = [];
  let ourTicket: Ticket | null = null;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "your ticket:") {
      i++;
      loading = "ourTicket";
    } else if (lines[i] === "nearby tickets:") {
      i++;
      loading = "nearbyTickets";
    }

    if (loading === "rules") {
      rules.push(loadRule(lines[i]));
    } else if (loading === "nearbyTickets") {
      nearbyTickets.push(loadTicket(lines[i]));
    } else {
      ourTicket = loadTicket(lines[i]);
    }
  }

  if (!ourTicket) {
    throw new Error("missing our ticket in input data!");
  }
  return {
    nearbyTickets,
    rules,
    ourTicket,
  };
}

const ruleRegex = /(.+(?=:))(\:\s)(\d.)-(\d+) or (\d+)-(\d+)/;
function loadRule(line: string): Rule {
  const values = ruleRegex.exec(line);
  if (!values || !values.length) {
    throw new Error("Invalid rule line " + line);
  }
  return {
    name: values[1],
    ranges: [
      { min: Number(values[3]), max: Number(values[4]) },
      { min: Number(values[5]), max: Number(values[6]) },
    ],
  };
}

function loadTicket(line: string): Ticket {
  return {
    values: line.split(",").map(Number),
  };
}
