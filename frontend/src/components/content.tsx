import { useState, useEffect } from "react";
import Buttons from "./buttons";
import axios from "axios";

// Define TypeScript interfaces
interface Score {
  id: number;
  name: string;
  score: number;
}

interface Scores {
  srijan: Score | null;
  subash: Score | null;
}

const api = axios.create({
  baseURL: "https://challenge-jy5i.onrender.com",
});

function Content() {
  const button_content = [1, 2, 3];
  const [scores, setScores] = useState<Scores>({
    srijan: null,
    subash: null,
  });

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        const srijan = res.data.find((s: Score) => s.name === "Srijan") || null;
        const subash = res.data.find((s: Score) => s.name === "Subash") || null;

        setScores({ srijan, subash });
      })
      .catch((err) => {
        console.error("Error fetching scores:", err);
      });
  }, []);

  const addScore = (id: number, value: number) => {
    api
      .post(`/${id}/add/`, { value }) // make sure the trailing slash is here
      .then(() => {
        api.get("/").then((res) => {
          const srijan =
            res.data.find((s: Score) => s.name === "Srijan") || null;
          const subash =
            res.data.find((s: Score) => s.name === "Subash") || null;

          setScores({ srijan, subash });
        });
      })
      .catch((err) => {
        console.error("Error adding score:", err);
      });
  };

  if (!scores.srijan || !scores.subash) return <p>Loading...</p>;

  // Style object for table and cells
  const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    border: "2px solid black",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    fontSize: "24px",
  };

  const cellStyle: React.CSSProperties = {
    border: "1px solid black",
    padding: "10px",
    textAlign: "center",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px",
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>Srijan</th>
          <th style={cellStyle}>Subash</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* Srijan */}
          <td style={cellStyle}>
            {scores.srijan.score}
            <div style={buttonContainerStyle}>
              {button_content.map((v) => (
                <Buttons
                  key={v}
                  content={`Add ${v}`}
                  onClick={() => addScore(scores.srijan!.id, v)}
                />
              ))}
            </div>
          </td>

          {/* Subash */}
          <td style={cellStyle}>
            {scores.subash.score}
            <div style={buttonContainerStyle}>
              {button_content.map((v) => (
                <Buttons
                  key={v}
                  content={`Add ${v}`}
                  onClick={() => addScore(scores.subash!.id, v)}
                />
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Content;
