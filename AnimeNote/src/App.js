import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

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
    name: "Naruto",
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
    name: "Attack on Titan",
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
    name: "Gintama",
  },
];

function Counter() {
  const [count, setCount] = useState(8);
  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today's Anime Note !!!";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="86" width="86" alt="Daily Anime Note!" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((s) => !s)}
      >
        {showForm ? "Close" : "Share a quote"}
      </button>
    </header>
  );
}

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

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    //1.Prevent browser reload
    e.preventDefault();
    console.log(text, name, source, category);
    //2.Check data is valid. If so, create a new fact.
    if (
      text &&
      name &&
      isValidHttpUrl(source) &&
      category &&
      textLength <= 200
    ) {
      //3.Create a new fact object. Upload fact to Supabase and receive the own fact object.
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, name, source, category }])
        .select();
      setIsUploading(false);

      //4.Add the new fact to the UI:add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      //5.Reset input fields
      setText("");
      setName("");
      setSource("");
      setCategory("");
      ///6.Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share your quote..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Anime name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isUploading}
      />
      <input
        type="text"
        placeholder="Source link..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category</option>
        {CATEGORIES.map((el) => (
          <option key={el.name} value={el.name}>
            {el.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>

        {CATEGORIES.map((el) => (
          <li key={el.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: el.color }}
              onClick={() => setCurrentCategory(el.name)}
            >
              {el.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length == 0) {
    return (
      <p className="message">
        No facts for the category yet! Create the first one :D
      </p>
    );
  }
  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} quotes in the database. Add your own! </p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((el) => el.name === fact.category)
            .color,
        }}
      >
        {fact.name}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
