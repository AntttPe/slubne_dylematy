#!/usr/bin/env python3
"""
Przygotowanie zdjęć do Profilu Firmy w Google.

Robi trzy rzeczy naraz:
  1. skaluje do rozsądnego rozmiaru (domyślnie 2048 px na dłuższym boku),
  2. USUWA wszystkie metadane, w tym współrzędne GPS,
  3. zapisuje JPEG mieszczący się w limicie 5 MB.

Punkt 2 jest tu najważniejszy. Zdjęcia z telefonu niosą lokalizację
miejsca wykonania - wgranie ich na publiczny profil ujawniłoby adresy
sal, kościołów, a przy zdjęciach z warsztatu także adres domowy.

Użycie:
    python3 scripts/przygotuj-zdjecia.py <katalog-zrodlowy> [katalog-wyjsciowy]

Pliki HEIC z iPhone'a są najpierw konwertowane przez wbudowany w macOS
`sips`, więc nie trzeba nic doinstalowywać.
"""

import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps

DLUZSZY_BOK = 2048
LIMIT_BAJTOW = 5 * 1024 * 1024
JAKOSC_START = 88
JAKOSC_MIN = 60
ROZSZERZENIA = {".jpg", ".jpeg", ".png", ".heic", ".heif", ".tif", ".tiff", ".webp"}


def czysta_nazwa(stem: str) -> str:
    """Małe litery, myślniki, bez znaków, które psują URL-e.

    Nazwy plików od fotografów bywają w stylu "Maria&Radek_126" albo
    "karolina_dawid_ (23)" - zawierają imiona klientów i znaki, które
    w adresie strony wymagają kodowania.
    """
    stem = unicodedata.normalize("NFKD", stem)
    stem = stem.encode("ascii", "ignore").decode()
    stem = re.sub(r"[^a-zA-Z0-9]+", "-", stem).strip("-").lower()
    return stem or "zdjecie"


def heic_na_jpeg(zrodlo: Path, katalog_tmp: Path) -> Path:
    """iPhone zapisuje HEIC-i; sips jest w macOS, więc nie ma co instalować."""
    cel = katalog_tmp / (zrodlo.stem + ".jpg")
    subprocess.run(
        ["sips", "-s", "format", "jpeg", str(zrodlo), "--out", str(cel)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    return cel


def przetworz(zrodlo: Path, cel: Path, katalog_tmp: Path) -> tuple[str, str]:
    wejscie = zrodlo
    if zrodlo.suffix.lower() in {".heic", ".heif"}:
        wejscie = heic_na_jpeg(zrodlo, katalog_tmp)

    with Image.open(wejscie) as im:
        # Obrót zgodnie z EXIF-em ZANIM go wyrzucimy - inaczej zdjęcia
        # z telefonu trzymanego pionowo wyszłyby położone na boku.
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")
        im.thumbnail((DLUZSZY_BOK, DLUZSZY_BOK), Image.LANCZOS)

        # Nowy obraz z samych pikseli = zero odziedziczonych metadanych.
        czysty = Image.new("RGB", im.size)
        czysty.putdata(list(im.getdata()))

        jakosc = JAKOSC_START
        while True:
            czysty.save(cel, "JPEG", quality=jakosc, optimize=True, progressive=True)
            if cel.stat().st_size <= LIMIT_BAJTOW or jakosc <= JAKOSC_MIN:
                break
            jakosc -= 6

        return f"{im.size[0]}x{im.size[1]}", f"jakość {jakosc}"


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1

    src = Path(sys.argv[1]).expanduser()
    out = Path(sys.argv[2]).expanduser() if len(sys.argv) > 2 else src / "google-gotowe"

    if not src.is_dir():
        print(f"Nie ma takiego katalogu: {src}")
        return 1

    pliki = sorted(
        p for p in src.iterdir()
        if p.is_file() and p.suffix.lower() in ROZSZERZENIA
    )
    if not pliki:
        print(f"Brak zdjęć w {src}")
        return 1

    out.mkdir(parents=True, exist_ok=True)
    katalog_tmp = Path(tempfile.mkdtemp())

    print(f"Zdjęć do przerobienia: {len(pliki)}\n")
    suma_przed = suma_po = 0

    try:
        for i, plik in enumerate(pliki, 1):
            cel = out / f"{czysta_nazwa(plik.stem)}.jpg"
            try:
                wymiary, jakosc = przetworz(plik, cel, katalog_tmp)
            except Exception as e:  # noqa: BLE001
                print(f"  [{i}/{len(pliki)}] POMINIĘTE {plik.name}: {e}")
                continue

            przed, po = plik.stat().st_size, cel.stat().st_size
            suma_przed += przed
            suma_po += po
            print(
                f"  [{i}/{len(pliki)}] {plik.name}\n"
                f"        {przed/1024/1024:.1f} MB -> {po/1024/1024:.2f} MB  "
                f"({wymiary}, {jakosc}, EXIF usunięty)"
            )
    finally:
        shutil.rmtree(katalog_tmp, ignore_errors=True)

    print(
        f"\nGotowe: {out}\n"
        f"Razem {suma_przed/1024/1024:.1f} MB -> {suma_po/1024/1024:.1f} MB"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
