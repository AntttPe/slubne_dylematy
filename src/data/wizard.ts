/**
 * Pytania pomagające parze opisać wizję.
 *
 * Cztery, nie osiem - przy dłuższej liście ludzie odpadają w połowie.
 * Kolejność jest celowa: najpierw pytanie, na które odpowiada się
 * odruchowo (styl), na końcu to wymagające chwili zastanowienia.
 *
 * Wszędzie jest wyjście "jeszcze nie wiemy". Brak takiej opcji zmusza
 * do zmyślania, a Magda dostaje wtedy odpowiedź gorszą niż żadną.
 */
export type Question = {
  id: string;
  /** Etykieta, pod którą odpowiedź trafia do wiadomości. */
  label: string;
  question: string;
  hint?: string;
  multi?: boolean;
  options: readonly string[];
};

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

/** Składa odpowiedzi w czytelny akapit, a nie listę pól bazy danych. */
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
