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

function backupHandler() {
  const data =
    "text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(db.storage()));
  const a = document.querySelector(".backup-btn");
  a.href = "data:" + data;
  a.download = dd + mm + yyyy + "_moodtracker_backup.json";
}

function readJSON(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const contents = event.target.result;
    const jsonData = JSON.parse(contents);

    if (
      (jsonData[0].id &&
        jsonData[0].mood &&
        jsonData[0].log &&
        jsonData[0].date &&
        jsonData[jsonData.length - 1].id &&
        jsonData[jsonData.length - 1].mood &&
        jsonData[jsonData.length - 1].log &&
        jsonData[jsonData.length - 1].date) ||
      jsonData === []
    ) {
      db.clear();

      jsonData.forEach((item) => {
        db.write(item.id, {
          mood: item.mood,
          log: item.log,
          date: item.date,
        });
      });

      location.replace("/logs.html");
    } else {
      alert("No backup found!");
    }
  };

  reader.readAsText(file);
}

const getPreferredScheme = () =>
  window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches
    ? "dark"
    : "light";

if (getPreferredScheme() === "dark") {
  document.querySelector("body").className = "dark";
}
