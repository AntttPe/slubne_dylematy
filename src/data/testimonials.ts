/**
 * Quotes are genuine. Most couples are credited anonymously because we do not
 * have their consent to publish names; where a first name is used, the surname
 * is deliberately omitted.
 *
 * TODO(client): with the couples' consent, swap the anonymous captions for
 * first names - a named recommendation is worth considerably more.
 */
export type Testimonial = {
  author: string;
  event: string;
  quote: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    author: "Sandra",
    event: "Dekoracja kościoła i sali",
    quote:
      "Z całego serca polecamy wspaniałe i profesjonalne Ślubne Dylematy. Subtelny wystrój kościoła zrobił świetne wrażenie, a bajeczna sala przeszła nasze najśmielsze oczekiwania i zachwyciła każdego z gości. Dziękujemy za cierpliwość, ogromną pasję i zaangażowanie w najmniejszy detal - dzięki Tobie nasz ślub był jeszcze piękniejszy.",
  },
  {
    author: "Para młoda",
    event: "Dekoracje ślubne i papeteria",
    quote:
      "Najlepsza dekoratorka, jaką mogliśmy sobie wymarzyć. Dekoracje w nowoczesnym stylu, do tego cała papeteria. Otwarta na nasze propozycje, ale z mnóstwem własnych pomysłów.",
  },
  {
    author: "Para młoda",
    event: "Ślub i wesele",
    quote:
      "Chcieliśmy podziękować za przepiękne dekoracje naszego ślubu. Jesteśmy wdzięczni za dopilnowanie każdego szczegółu - z pewnością jeszcze skorzystamy i będziemy polecać dalej.",
  },
  {
    author: "Para młoda",
    event: "Wesele i dekoracja kościoła",
    quote:
      "Wszyscy goście byli oczarowani wystrojem. Ścianka na zewnątrz spełniła swoje zadanie - cały Facebook zapłonął od zdjęć. Kościół też wyglądał przepięknie.",
  },
  {
    author: "Para młoda",
    event: "Wesele zimowo-świąteczne",
    quote:
      "Współpraca na najwyższym poziomie. Wymarzone dekoracje w zimowo-świątecznym stylu - wyszło piękniej niż na inspiracjach. Nigdy nie usłyszeliśmy, że czegoś się nie da zrobić.",
  },
  {
    author: "Para młoda",
    event: "Dekoracje weselne",
    quote:
      "Każdy detal był dopracowany, a goście zachwyceni. Nie zastanawiajcie się - po prostu rezerwujcie termin.",
  },
];
