document.addEventListener("DOMContentLoaded", () => {
    const workoutList = document.getElementById("workout-list");
    if (workoutList) {
        workoutList.addEventListener("click", event => {
            if (event.target.classList.contains("edit-btn")) {
                event.preventDefault();
                const form = event.target.closest("form");
                const li = form.closest("li");
                const id = li.id;
                const type = form.querySelector("input[name='type']").value;
                const intensity = form.querySelector("input[name='intensity']").value;
                const duration = form.querySelector("input[name='duration']").value;
                const date = form.querySelector("input[name='date']").value;

                const workoutForm = document.getElementById("workout-form");
                workoutForm.querySelector("#type").value = type;
                workoutForm.querySelector("#intensity").value = intensity;
                workoutForm.querySelector("#duration").value = duration;
                workoutForm.querySelector("#date").value = date;
                workoutForm.action = `/workouts/edit/${id}`;
                workoutForm.querySelector("#submit-btn").textContent = "Zapisz";
            }
        });
    }
});