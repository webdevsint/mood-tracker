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

if (dailyLog.length === 1) {
  location.replace("/logs.html");
}

function submitCheckBox(mood) {
  const value = mood;

  document.querySelector(".checkbox-container").innerHTML = `${mood}`;
  document.querySelector(".log-container").style.display = "block";
}

function submit() {
  const mood = document.querySelector(".checkbox-container").innerText;
  const payload = {
    mood: mood,
    log: document.getElementById("text").value,
    date: formattedToday,
  };

  db.write(Date.now(), payload);

  document.getElementById("text").value = "";

  location.replace("/logs.html");
}
