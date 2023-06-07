const db = new LocalDB();

const data = db.storage().sort(function (x, y) {
  return parseInt(x.id) - parseInt(y.id);
});

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

const formattedToday = dd + "/" + mm + "/" + yyyy;

let dailyLog = data.filter((item) => item.date === formattedToday);

if (dailyLog.length === 0) {
  document.querySelector(
    ".alert"
  ).innerHTML = `Daily entry not added! <a href="/">Add now</a>`;
  document.querySelector(".alert").style.display = "block";
}

if (data.length === 0) {
  document.querySelector(
    ".alert"
  ).innerHTML = `No entries found! <a href="/">Create one</a>`;
  document.querySelector(".alert").style.display = "block";
}

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
}

function filter(date) {
  document.querySelector(".filtered-log").innerHTML = "";
  document.querySelector(".alert").style.display = "none";

  if (date === "") {
    alert("Please select a date first!");
  } else {
    const formattedDate = `${date.split("-")[2]}/${date.split("-")[1]}/${
      date.split("-")[0]
    }`;

    dailyLog = data.filter((item) => item.date === formattedDate);

    if (dailyLog.length === 0) {
      document.querySelector(".alert").innerHTML = `No entry found!`;
      document.querySelector(".alert").style.display = "block";
    } else {
      const container = document.querySelector(".filtered-log");

      const logDiv = document.createElement("div");
      logDiv.className = "log";

      const logDate = document.createElement("div");
      logDate.className = "date";

      const logMood = document.createElement("div");
      logMood.className = "mood";

      const logText = document.createElement("div");
      logText.className = "log-text";

      logDate.innerHTML = dailyLog[0].date;
      logMood.innerHTML = `Mood: <span>${dailyLog[0].mood}</span>`;
      logText.innerHTML = dailyLog[0].log;

      logDiv.appendChild(logDate);
      logDiv.appendChild(logMood);
      logDiv.appendChild(logText);

      container.appendChild(logDiv);
    }
  }
}
