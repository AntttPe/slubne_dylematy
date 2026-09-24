/**
 * Cities the owner works in, ordered by how often.
 *
 * This list is the backbone of the local SEO plan: the business serves all of
 * Poland, but "dekoracje ślubne Katowice" is winnable while "dekoracje ślubne"
 * is not. Couples almost always add a city or a venue, because they need
 * someone who will travel to them.
 *
 * TODO(client): confirm and extend - these are the cities implied by the
 * venues on file, not a list the owner has reviewed.
 */
export const cities = [
  "Bytom",
  "Katowice",
  "Gliwice",
  "Zabrze",
  "Tarnowskie Góry",
  "Chorzów",
  "Sosnowiec",
  "Ruda Śląska",
  "Świerklaniec",
  "Nakło Śląskie",
  "Radlin",
] as const;
