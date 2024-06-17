document.addEventListener("DOMContentLoaded", function () {
  const moodForm = document.getElementById("moodForm");
  const moodSelect = document.getElementById("mood");
  const ctx = document.getElementById("moodChart").getContext("2d");
  const moodData = JSON.parse(localStorage.getItem("moodData")) || [];
  const moodMap = {
    Sad: 0,
    Anxious: 1,
    Neutral: 2,
    Happy: 3,
    Angry: 4,
  };
  const reverseMoodMap = ["Sad", "Anxious", "Neutral", "Happy", "Angry"];

  function updateChart() {
    const labels = moodData.map((entry) => entry.date);
    const data = moodData.map((entry) => moodMap[entry.mood]);
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Mood Trends",
            data: data,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 4,
            ticks: {
              callback: function (value) {
                return reverseMoodMap[value];
              },
            },
          },
        },
      },
    });
  }

  updateChart();

  moodForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const mood = moodSelect.value;
    if (!mood) return;
    const date = new Date().toLocaleDateString();
    moodData.push({ date: date, mood: mood });
    localStorage.setItem("moodData", JSON.stringify(moodData));
    updateChart();
    moodForm.reset();
  });
});
