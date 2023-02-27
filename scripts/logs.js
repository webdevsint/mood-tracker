const db = new LocalDB();

const data = db.storage().sort(function (x, y) {
  return parseInt(x.id) - parseInt(y.id);
});

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

const formattedToday = dd + "/" + mm + "/" + yyyy;

const dailyLog = data.filter((item) => item.date === formattedToday);

if (dailyLog.length > 0) {
  if (data.length > 0) {
    data.reverse().forEach((item) => {
      const container = document.querySelector(".log-container");

      const logDiv = document.createElement("div");
      logDiv.className = "log";

      const logDate = document.createElement("div");
      logDate.className = "date";

      const logMood = document.createElement("div");
      logMood.className = "mood";

      const logText = document.createElement("div");
      logText.className = "log-text";

      logDate.innerHTML = item.date;
      logMood.innerHTML = `Mood: <span>${item.mood}</span>`;
      logText.innerHTML = item.log;

      logDiv.appendChild(logDate);
      logDiv.appendChild(logMood);
      logDiv.appendChild(logText);

      container.appendChild(logDiv);
    });
  } else {
    document.querySelector(".alert").style.display = 'block';
  }
} else {
  document.querySelector(".alert").style.display = 'block';
}
