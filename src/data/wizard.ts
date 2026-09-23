export type Question = {
  id: string;
  label: string;
  question: string;
  hint?: string;
  multi?: boolean;
  options: readonly string[];
};

/**
 * Four would be too few and eight too many - people drop out halfway. Order
 * is deliberate: the instinctive question first, the one needing thought last.
 * Every question has a "we don't know yet" escape; without it people invent an
 * answer, which is worse than none.
 */
export const questions: readonly Question[] = [
  {
    id: "styl",
    label: "Styl",
    question: "Jaki klimat chodzi Wam po głowie?",
    options: [
      "Boho i naturalny",
      "Klasyczny i elegancki",
      "Rustykalny",
      "Nowoczesny, minimalistyczny",
      "Glamour",
      "Jeszcze nie wiemy",
    ],
  },
  {
    id: "kolory",
    label: "Kolory",
    question: "W jakich barwach to widzicie?",
    options: [
      "Biel i zieleń",
      "Beże i ziemiste",
      "Pastele",
      "Mocne, nasycone",
      "Jeszcze nie wiemy",
    ],
  },
  {
    id: "zakres",
    label: "Do udekorowania",
    question: "Co ma zostać udekorowane?",
    hint: "Można zaznaczyć kilka. Nic nie jest przesądzone - to tylko punkt wyjścia.",
    multi: true,
    options: [
      "Kościół",
      "Sala",
      "Plener",
      "Stół pary młodej",
      "Ścianka",
      "Papeteria",
    ],
  },
  {
    id: "etap",
    label: "Etap przygotowań",
    question: "Na jakim jesteście etapie?",
    hint: "Od tego zależy, czy rozmawiamy o konkretach, czy o koncepcji.",
    options: [
      "Mamy salę i datę",
      "Mamy datę, szukamy sali",
      "Dopiero zaczynamy",
    ],
  },
  {
    id: "priorytet",
    label: "Najważniejsze",
    question: "Co jest dla Was najważniejsze?",
    options: [
      "Żeby goście zapamiętali wystrój",
      "Żeby wszystko było spójne",
      "Żeby nie martwić się logistyką",
      "Żeby zmieścić się w budżecie",
    ],
  },
];

export function buildSummary(answers: Record<string, string[]>): string {
  return questions
    .map((q) => {
      const wybrane = answers[q.id];
      if (!wybrane?.length) return null;
      return `${q.label}: ${wybrane.join(", ")}`;
    })
    .filter(Boolean)
    .join("\n");
}
