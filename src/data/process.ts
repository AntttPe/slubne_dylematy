export type Step = {
  number: string;
  title: string;
  lead: string;
  description: string;
};

export const steps: readonly Step[] = [
  {
    number: "01",
    title: "Spotkanie",
    lead: "Zapraszam Was na spotkanie przy kawie lub online.",
    description:
      "To czas, żeby się poznać, porozmawiać o Waszych pomysłach i dobrać najlepsze rozwiązania. Na tej podstawie przygotuję ofertę dopasowaną do Waszych potrzeb.",
  },
  {
    number: "02",
    title: "Personalizowana oferta",
    lead: "Po spotkaniu otrzymujecie ofertę stworzoną specjalnie dla Was.",
    description:
      "Nie korzystam z gotowych schematów. Każdą koncepcję tworzę od podstaw, dopasowując ją do Was, miejsca i charakteru uroczystości.",
  },
  {
    number: "03",
    title: "Konsultacja",
    lead: "Macie pytania lub chcecie coś zmienić?",
    description:
      "Omawiamy ofertę i dopracowujemy szczegóły, tak abyście mieli pewność, że wszystko odpowiada Waszym oczekiwaniom i budżetowi.",
  },
  {
    number: "04",
    title: "Finalizacja",
    lead: "Akceptujecie ofertę i podpisujemy umowę.",
    description:
      "To właśnie podpisana umowa gwarantuje rezerwację Waszego terminu.",
  },
];
