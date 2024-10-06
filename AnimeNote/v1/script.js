const initialFacts = [
  {
    id: 1,
    text: "Uchiha Itachi (Naruto): People live their lives bound by what they accept as correct and true, that is how they define reality. But what does it mean to be correct or true? Merely vague concepts, their reality may all be an illusion. ",
    source: "https://naruto.fandom.com/wiki/Itachi_Uchiha#cite",
    category: "Adventure",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2015,
  },
  {
    id: 2,
    text: "Eren Jaeger (Attack on Titan): We're born free. All of us. Free. Some don't believe it, some try to take it away. To hell with them! ",
    source: "https://www.techanimate.com/eren-jaeger-quotes/",
    category: "Action",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2022,
  },
  {
    id: 3,
    text: "Gintoki Sakata (Gintama): If you have time to think of a beautiful end, then live beautiful until the end.",
    source:
      "https://www.epicquotes.com/15-hilarious-gintoki-sakata-quotes-from-gintama/",
    category: "Comedy",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2020,
  },
];

const CATEGORIES = [
  { name: "Adventure", color: "#3b82f6" },
  { name: "Action", color: "#16a34a" },
  { name: "Comedy", color: "#ef4444" },
  { name: "Slice of Life", color: "#eab308" },
  { name: "Drama", color: "#db2777" },
  { name: "Music", color: "#14b8a6" },
  { name: "Supernatural", color: "#f97316" },
  { name: "Sports", color: "#8b5cf6" },
];

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(" .fact-form");
const factsList = document.querySelector(".fact-list");

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

//Load data from Supabase
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://prybqmkvtexbzomjucir.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeWJxbWt2dGV4YnpvbWp1Y2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1Mjc0NjYsImV4cCI6MTk5NDEwMzQ2Nn0.VdErDUPOvmeXXYGLzHR4ufIRSDSXfJBo_AJoRzuhV_w",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeWJxbWt2dGV4YnpvbWp1Y2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1Mjc0NjYsImV4cCI6MTk5NDEwMzQ2Nn0.VdErDUPOvmeXXYGLzHR4ufIRSDSXfJBo_AJoRzuhV_w",
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  // const filteredData = data.filter((fact) => fact.category === "technology");
  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class = "fact">
        <p>
        ${fact.text}
            <a
                class="source"
                href=${fact.source}
                target="_blank"
            >(Source)</a>
        </p>
        <span class="tag" style="background-color:${
          CATEGORIES.find((el) => el.name === fact.category).color
        }">${fact.name}</span>
    <li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a quote";
  }
});
