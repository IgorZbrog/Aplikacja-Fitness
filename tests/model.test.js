const { WorkoutModel } = require("../js/model");

describe("WorkoutModel", () => {
    let model;

    beforeEach(() => {
        model = new WorkoutModel();
        model.workouts = [];
    });

    test("mozna dodac trening", () => {
        const workout = model.addWorkout("cardio", "niska", 30, "2025-05-26");
        expect(workout.type).toBe("cardio");
        expect(workout.duration).toBe(30);
        expect(model.getWorkouts().length).toBe(1);
    });

    test("mozliwosc tworzenia bledu, kiedy czas jest nieprawidlowy", () => {
        expect(() => model.addWorkout("cardio", "niska", "0", "2025-05-26")).toThrow("Czas trwania musi być liczbą między 1 a 300 minut!");
    });

    test("mozliwosc edycji treningu", () => {
        const workout = model.addWorkout("cardio", "niska", 30, "2025-05-26");
        model.editWorkout(workout.id, "joga", "wysoka", 60, "2025-05-27");
        const updated = model.getWorkouts()[0];
        expect(updated.type).toBe("joga");
        expect(updated.duration).toBe(60);
    });

    test("mozliwosc usuwania treningu", () => {
        const workout = model.addWorkout("cardio", "niska", 30, "2025-05-26");
        model.removeWorkout(workout.id);
        expect(model.getWorkouts().length).toBe(0);
    });
});