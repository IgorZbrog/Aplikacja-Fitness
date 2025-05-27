class WorkoutView {
    constructor() {
        this.app = document.getElementById("app");
        this.currentPage = null;
    }

    renderPage(page, data, handlers) {
        this.currentPage = page;
        this.app.innerHTML = "";
        if (page === "home") {
            this.renderHome(data);
        } else if (page === "workouts") {
            this.renderWorkouts(data, handlers);
        } else if (page === "stats") {
            this.renderStats(data);
        } else if (page === "planner") {
            this.renderPlanner(data);
        }
    }

    renderHome({ weekStats, monthStats }) {
        this.app.innerHTML = `
            <h1>Witaj w Systemie Treningów Fitness!</h1>
            <p>Planuj swoje treningi i monitoruj postępy.</p>
            <div class="stats">
                <p>Treningi w tym tygodniu: ${weekStats}</p>
                <p>Treningi w tym miesiącu: ${monthStats}</p>
            </div>
        `;
    }

    renderWorkouts({ workouts, error }, { handleAddOrEdit, handleGetWorkout, handleRemove }) {
        this.app.innerHTML = `
            <h2>Twoje treningi</h2>
            ${error ? `<div class="error">${error}</div>` : ''}
            <form id="workout-form">
                <label for="type">Typ:</label>
                <select id="type" required>
                    <option value="cardio">Cardio</option>
                    <option value="siłowy">Siłowy</option>
                    <option value="joga">Joga</option>
                </select>
                <label for="intensity">Intensywność:</label>
                <select id="intensity" required>
                    <option value="niska">Niska</option>
                    <option value="średnia">Średnia</option>
                    <option value="wysoka">Wysoka</option>
                </select>
                <label for="duration">Czas (min):</label>
                <input type="number" id="duration" min="1" max="300" required />
                <label for="date">Data:</label>
                <input type="date" id="date" required />
                <button type="submit" id="submit-btn">Dodaj</button>
            </form>
            <ul id="workout-list"></ul>
        `;

        const form = document.getElementById("workout-form");
        const typeInput = document.getElementById("type");
        const intensityInput = document.getElementById("intensity");
        const durationInput = document.getElementById("duration");
        const dateInput = document.getElementById("date");
        const submitBtn = document.getElementById("submit-btn");
        const workoutList = document.getElementById("workout-list");
        let editId = null;

        form.addEventListener("submit", event => {
            event.preventDefault();
            handleAddOrEdit(
                editId,
                typeInput.value,
                intensityInput.value,
                durationInput.value,
                dateInput.value
            );
            if (!editId) form.reset();
            submitBtn.textContent = "Dodaj";
            editId = null;
        });

        workoutList.addEventListener("click", event => {
            if (event.target.classList.contains("edit-btn")) {
                const id = parseInt(event.target.parentElement.id);
                const workout = handleGetWorkout(id);
                if (workout) {
                    typeInput.value = workout.type;
                    intensityInput.value = workout.intensity;
                    durationInput.value = workout.duration;
                    dateInput.value = new Date(workout.date).toISOString().split("T")[0];
                    editId = id;
                    submitBtn.textContent = "Zapisz";
                }
            } else if (event.target.classList.contains("delete-btn")) {
                const id = parseInt(event.target.parentElement.id);
                handleRemove(id);
            }
        });

        workouts.forEach(workout => {
            const li = document.createElement("li");
            li.id = workout.id;
            li.innerHTML = `
                ${workout.type} | ${workout.intensity} | ${workout.duration} min | ${new Date(workout.date).toLocaleDateString()}
                <button class="edit-btn">Edytuj</button>
                <button class="delete-btn">Usuń</button>
            `;
            workoutList.appendChild(li);
        });
    }

    renderStats({ weekStats, monthStats, typeStats }) {
        this.app.innerHTML = `
            <h2>Statystyki</h2>
            <div class="stats">
                <p>Treningi w tym tygodniu: ${weekStats}</p>
                <p>Treningi w tym miesiącu: ${monthStats}</p>
                <h3>Treningi według typu:</h3>
                <ul>
                    ${Object.entries(typeStats)
                        .map(([type, count]) => `<li>${type}: ${count}</li>`)
                        .join("")}
                </ul>
            </div>
        `;
    }

    renderPlanner({ workouts }) {
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const calendar = Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
            const dailyWorkouts = workouts.filter(w => new Date(w.date).toDateString() === date.toDateString());
            return { date, workouts: dailyWorkouts };
        });

        this.app.innerHTML = `
            <h2>Planowanie treningów</h2>
            <div class="planner">
                <h3>Kalendarz: ${today.toLocaleString("pl-PL", { month: "long", year: "numeric" })}</h3>
                <div class="calendar">
                    ${calendar
                        .map(
                            day => `
                                <div>
                                    <strong>${day.date.getDate()}</strong>
                                    ${day.workouts
                                        .map(w => `<p>${w.type} (${w.duration} min)</p>`)
                                        .join("")}
                                </div>
                            `
                        )
                        .join("")}
                </div>
            </div>
        `;
    }
}