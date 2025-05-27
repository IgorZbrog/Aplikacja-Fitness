class WorkoutModel {
    constructor() {
        this.workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    }

    addWorkout(type, intensity, duration, date) {
        if (!type || !intensity || !duration || !date) {
            throw new Error("Wszystkie pola są wymagane!");
        }
        const parsedDuration = parseInt(duration);
        const parsedDate = new Date(date);
        if (isNaN(parsedDuration) || parsedDuration <= 0 || parsedDuration > 300) {
            throw new Error("Czas trwania musi być liczbą między 1 a 300 minut!");
        }
        if (isNaN(parsedDate.getTime())) {
            throw new Error("Nieprawidłowa data!");
        }
        const workout = {
            id: Date.now(),
            type,
            intensity,
            duration: parsedDuration,
            date: parsedDate.toISOString()
        };
        this.workouts.push(workout);
        this.save();
        return workout;
    }

    editWorkout(id, type, intensity, duration, date) {
        const workout = this.workouts.find(w => w.id === id);
        if (!workout) {
            throw new Error("Trening nie istnieje!");
        }
        const parsedDuration = parseInt(duration);
        const parsedDate = new Date(date);
        if (!type || !intensity || isNaN(parsedDuration) || parsedDuration <= 0 || parsedDuration > 300) {
            throw new Error("Nieprawidłowe dane treningu!");
        }
        if (isNaN(parsedDate.getTime())) {
            throw new Error("Nieprawidłowa data!");
        }
        workout.type = type;
        workout.intensity = intensity;
        workout.duration = parsedDuration;
        workout.date = parsedDate.toISOString();
        this.save();
        return workout;
    }

    removeWorkout(id) {
        this.workouts = this.workouts.filter(w => w.id !== id);
        this.save();
    }

    getWorkouts() {
        return this.workouts;
    }

    getWorkoutsByDate(date) {
        const targetDate = new Date(date).toDateString();
        return this.workouts.filter(w => new Date(w.date).toDateString() === targetDate);
    }

    getStats(period) {
        const now = new Date();
        let startDate;
        if (period === "week") {
            startDate = new Date(now.setDate(now.getDate() - 7));
        } else if (period === "month") {
            startDate = new Date(now.setMonth(now.getMonth() - 1));
        }
        return this.workouts.filter(w => new Date(w.date) >= startDate).length;
    }

    getStatsByType() {
        const stats = {};
        this.workouts.forEach(w => {
            stats[w.type] = (stats[w.type] || 0) + 1;
        });
        return stats;
    }

    save() {
        localStorage.setItem("workouts", JSON.stringify(this.workouts));
    }
}