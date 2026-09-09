export type Testimonial = {
  /** TODO(klient): podmienić na prawdziwe imiona za zgodą par. */
  author: string;
  event: string;
  quote: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    author: "Ania i Marek",
    event: "Dekoracje ślubne i papeteria",
    quote:
      "Najlepsza dekoratorka, jaką mogliśmy sobie wymarzyć. Dekoracje w nowoczesnym stylu, do tego cała papeteria. Otwarta na nasze propozycje, ale z mnóstwem własnych pomysłów.",
  },
  {
    author: "Karolina i Paweł",
    event: "Ślub i wesele",
    quote:
      "Chcieliśmy podziękować za przepiękne dekoracje naszego ślubu. Jesteśmy wdzięczni za dopilnowanie każdego szczegółu - z pewnością jeszcze skorzystamy i będziemy polecać dalej.",
  },
  {
    author: "Magda i Tomek",
    event: "Wesele i dekoracja kościoła",
    quote:
      "Wszyscy goście byli oczarowani wystrojem. Ścianka na zewnątrz spełniła swoje zadanie - cały Facebook zapłonął od zdjęć. Kościół też wyglądał przepięknie.",
  },
  {
    author: "Ewa i Krzysztof",
    event: "Wesele zimowo-świąteczne",
    quote:
      "Współpraca na najwyższym poziomie. Wymarzone dekoracje w zimowo-świątecznym stylu - wyszło piękniej niż na inspiracjach. Nigdy nie usłyszeliśmy, że czegoś się nie da zrobić.",
  },
  {
    author: "Julia i Bartek",
    event: "Dekoracje weselne",
    quote:
      "Każdy detal był dopracowany, a goście zachwyceni. Nie zastanawiajcie się - po prostu rezerwujcie termin.",
  },
];
