let selectedMood = "";

document.querySelectorAll(".moodBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove highlight from all mood buttons
    document.querySelectorAll(".moodBtn").forEach((buttons) => {
      buttons.classList.remove("highlighted");
    });

    // Highlight the clicked button
    btn.classList.add("highlighted");

    selectedMood = btn.innerText;
    // console.log("Mood selected:", selectedMood);
  });
});
document.querySelectorAll(".moodBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.forEach((buttons) => buttons.classList.remove("highlighted"));
    btn.classList.add("highlighted");
    selectedMood = btn.innerText;
    console.log("Mood selected:", selectedMood);
  });
});
document.getElementById("saveBtn").addEventListener("click", () => {
  const note = document.getElementById("noteInput").value;
  const today = new Date().toISOString().split("T")[0];

  const moodEntry = {
    date: today,
    mood: selectedMood,
    note: note,
  };

  let moodLog = JSON.parse(localStorage.getItem("moodLog")) || [];
  moodLog.push(moodEntry);
  localStorage.setItem("moodLog", JSON.stringify(moodLog));

  selectedMood = "";
  document.getElementById("noteInput").value = "";
  alert("Mood saved!");
});

document.getElementById("historyBtn").addEventListener("click", () => {
  let history = JSON.parse(localStorage.getItem("moodLog")) || [];

  document.getElementById("historyList").innerHTML = "";
  // console.log(history)
  history.forEach((entry) => {
    document.getElementById("historyList").innerHTML += `
      <p>📅 ${entry.date} – ${entry.mood} ${entry.note}</p>
    `;
  });
});

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  if (confirm("Are you sure?")) {
    localStorage.removeItem("moodLog");
    document.getElementById("historyList").innerHTML = "";
  } else {
    console.log("Cancel");
  }
});

document.getElementById("todayBtn").addEventListener("click", () => {
  const moodLog = JSON.parse(localStorage.getItem("moodLog")) || [];
  const today = new Date().toISOString().split("T")[0];
  const todaysMoods = moodLog.filter((entry) => entry.date === today);

  const historyDiv = document.getElementById("historyList");
  historyDiv.innerHTML = "";

  if (todaysMoods.length === 0) {
    historyDiv.innerHTML = `<p>วันนี้ยังไม่มีอารมณ์ที่ถูกบันทึก 😊</p>`;
  } else {
    todaysMoods.forEach((entry) => {
      historyDiv.innerHTML += `
        <p>📅 ${entry.date} – ${entry.mood} ${entry.note}</p>
      `;
    });
  }
});

document.getElementById("applyBtn").addEventListener("click", () => {
  const moodLog = JSON.parse(localStorage.getItem("moodLog")) || [];
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const filteredMoods = moodLog.filter(
    (entry) => entry.date >= startDate && entry.date <= endDate
  );
  const historyDiv = document.getElementById("historyList");
  historyDiv.innerHTML = "";

  if (filteredMoods.length === 0) {
    historyDiv.innerHTML = `<p>ไม่มีอารมณ์ที่ถูกบันทึก 😊</p>`;
  } else {
    filteredMoods.forEach((entry) => {
      historyDiv.innerHTML += `
        <p>📅 ${entry.date} – ${entry.mood} ${entry.note}</p>
      `;
    });
  }
});
