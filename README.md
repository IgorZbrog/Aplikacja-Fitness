# System Organizacji Treningów Fitness

Aplikacja internetowa do zarządzania treningami fitness, zbudowana w oparciu o wzorzec MVC z Server-Side Rendering.

## Funkcjonalności
- Dodawanie, edycja i usuwanie treningów.
- Statystyki treningów (tygodniowe, miesięczne, według typu).
- Planowanie treningów w kalendarzu.
- Walidacja danych (np. czas trwania 1–300 minut).
- Prosty, wyśrodkowany design.

## Struktura projektu
- `server.js`: Serwer Express z trasami.
- `js/model.js`: Model danych (WorkoutModel, dane w pamięci).
- `js/controller.js`: Kontroler renderujący widoki.
- `js/app.js`: Logika klienta (formularz edycyjny).
- `views/*.ejs`: Szablony EJS (home, workouts, stats, planner).
- `css/styles.css`: Stylizacja.
- `tests/model.test.js`: Testy jednostkowe.

## Biblioteki
- express: Serwer HTTP
- ejs: Silnik szablonów SSR
- jest: Testy jednostkowe

## Uruchomienie
1. Sklonuj repozytorium.
2. Zainstaluj zależności: `npm install`.
3. Uruchom serwer: `npm start`.
4. Otwórz `http://localhost:3000`.

## Testy (dodane opcjonalnie w ramach sprawdzenia działanosci różnych opcji w aplikacji)
- Uruchom testy: `npm test`.