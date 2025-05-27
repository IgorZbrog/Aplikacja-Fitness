# System Organizacji Treningów Fitness

Aplikacja w JavaScript oparta na wzorcu MVC do zarządzania treningami fitness.

## Funkcjonalności
- Dodawanie, edytowanie, usuwanie treningów (typ, intensywność, czas trwania, data).
- Statystyki: tygodniowe, miesięczne, według typu.
- Podstrony: Strona główna, Treningi, Statystyki, Planowanie (kalendarz).
- Trwałość danych w localStorage.
- Walidacja danych i obsługa błędów.

## Struktura
- `index.html`: Główny plik HTML.
- `css/styles.css`: Stylizacja.
- `js/`:
  - `app.js`: Inicjalizacja.
  - `model.js`: Zarządzanie danymi.
  - `view.js`: Renderowanie podstron.
  - `controller.js`: Logika aplikacji.
  - `router.js`: Nawigacja.
- `tests/model.test.js`: Testy jednostkowe.

## Uruchomienie
1. Sklonuj repozytorium: `git clone https://github.com/TwojaNazwa/Aplikacja-Fitness.git`
2. Otwórz `index.html` w przeglądarce lub użyj Live Server.
3. (Opcjonalnie) Zainstaluj zależności: `npm install`
4. Uruchom testy: `npm test`

## Synchronizacja z GitHubem
- `git add .`
- `git commit -m "Opis zmian"`
- `git push origin main`

## Autor
Igor Zbróg 50009