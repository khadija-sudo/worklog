"use client";

import { useState } from "react";
import { Lobster_Two } from "next/font/google";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUsers, FaUserTie } from "react-icons/fa";

const lobsterTwo = Lobster_Two({ weight: "400", subsets: ["latin"] });

const memberTeamDetails: { [key: string]: any } = {
  "101": { name: "Marketing Team", leader: "alice@example.com" },
  "102": { name: "Design Team", leader: "bob@example.com" },
  "103": { name: "Product Team", leader: "leader@company.com" },
};

export default function ContributionFlashcardPage({ params }: { params: { teamId: string } }) {
  const router = useRouter();
  const team = memberTeamDetails[params.teamId] || { name: "Unknown Team", leader: "N/A" };
  
  const [contribution, setContribution] = useState("");
  const [submittedContributions, setSubmittedContributions] = useState<{ text: string; timestamp: string }[]>([]);

  const handleSubmit = () => {
    if (!contribution.trim()) {
      alert("Please enter your contribution!");
      return;
    }
    const timestamp = new Date().toLocaleString();
    setSubmittedContributions([...submittedContributions, { text: contribution, timestamp }]);
    setContribution("");
    alert("✅ Contribution submitted successfully!");
  };

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className={`logo ${lobsterTwo.className}`}>Worklog</div>
        <ul className="nav-links">
          <li><a className="home-link" onClick={() => router.push("/home")}>Home</a></li>
        </ul>

        <button
          style={styles.logoutButton}
          onClick={() => router.push("/login")}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 20px #ff6b6b")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 12px #ff6b6b")}
        >
          Logout
        </button>
      </nav>

      <div style={styles.mainArea}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <button className="sidebar-btn" onClick={() => router.push("/teams/member")}>
            <FaUsers /> Member Teams
          </button>
          <button className="sidebar-btn" onClick={() => router.push("/teams/lead")}>
            <FaUserTie /> Lead Teams
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.pageContent}>
          {/* Contribution Card */}
          <div style={styles.flashcard}>
            <h2 style={styles.cardTitle}>ADD YOUR WORK</h2>
            <p style={styles.cardSubtitle}>{team.name} • Led by: {team.leader}</p>

            <textarea
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              placeholder="Describe your work, achievements, and contributions..."
              style={styles.textarea}
            />

            <button 
              onClick={handleSubmit}
              style={styles.submitButton}
              onMouseEnter={e => (e.currentTarget.style.background = "#e6b800")}
              onMouseLeave={e => (e.currentTarget.style.background = "#FFD700")}
            >
              Submit Contribution
            </button>
          </div>

          {/* Previous Contributions */}
          {submittedContributions.length > 0 && (
            <div style={styles.historyCard}>
              <h3 style={styles.historyTitle}>Your Contributions</h3>
              {submittedContributions.map((c, idx) => (
                <div key={idx} style={styles.contributionItem}>
                  <p style={styles.contributionText}>{c.text}</p>
                  <p style={styles.contributionTime}>{c.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .navbar {
          background: #15173D;
          padding: 16px 30px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
          border-bottom: 2px solid #FFD700;
        }
        .logo {
          font-size: 2.4rem;
          color: #bf124d;
          margin-right: 50px;
          text-shadow: 0 0 6px #bf124d, 0 0 12px rgba(191,18,77,0.3);
        }
        .nav-links {
          list-style: none;
          display: flex;
          justify-content: center;
          flex: 1;
          margin: 0;
          padding: 0;
        }
        .home-link {
          font-size: 1.3rem;
          color: #fff;
          cursor: pointer;
          transition: color 0.2s;
        }
        .home-link:hover { color: #ffd700; }

        .sidebar-btn {
          background: #ffd700;
          color: #222;
          border: none;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.25);
          transition: all 0.25s ease;
          width: 100%;
        }
        .sidebar-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.35);
        }
      `}</style>
    </div>
  );
}

const styles: any = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "Arial, sans-serif", background: "linear-gradient(160deg, #a8edea 0%, #fed6e3 50%, #d1c4e9 100%)" },
  mainArea: { display: "flex", flex: 1 },
  sidebar: {
    width: 220,
    background: "#1c1c1c",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    borderRight: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "2px 0 12px rgba(0,0,0,0.5), -2px 0 12px rgba(0,0,0,0.3)",
  },
  pageContent: { flex: 2, padding: 20, display: "flex", flexDirection: "column", gap: 20 },
  flashcard: { background: "#2a2a2a", padding: 30, borderRadius: 18, boxShadow: "0 8px 25px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", gap: 16, color: "#eee" },
  cardTitle: { fontSize: "2rem", fontWeight: 700, color: "#ffd700", textAlign: "center" },
  cardSubtitle: { fontSize: "1rem", color: "#ffd700", textAlign: "center" },
  textarea: { padding: 16, fontSize: 14, border: "2px solid #FFD700", borderRadius: 12, background: "#0a1929", color: "#FFD700", outline: "none", resize: "vertical", minHeight: 150 },
  submitButton: { padding: "12px 24px", fontSize: "1rem", fontWeight: 600, background: "#FFD700", color: "#000", border: "none", borderRadius: 10, cursor: "pointer", transition: "all 0.2s ease" },
  historyCard: { background: "#fff", padding: 20, borderRadius: 16, boxShadow: "0 6px 18px rgba(0,0,0,0.4)" },
  historyTitle: { fontSize: "1.5rem", color: "#CD2C58", marginBottom: 12 },
  contributionItem: { background: "#f5f5f5", padding: 12, borderRadius: 10, borderLeft: "4px solid #FFD700" },
  contributionText: { color: "#333", marginBottom: 6, lineHeight: 1.5 },
  contributionTime: { fontSize: "0.85rem", color: "#999", fontStyle: "italic" },
  logoutButton: { position: "fixed", top: 20, right: 20, background: "#ff6b6b", color: "#fff", border: "2px solid #ff6b6b", padding: "10px 25px", borderRadius: 12, fontWeight: 600, cursor: "pointer", zIndex: 1000, boxShadow: "0 0 12px #ff6b6b", transition: "all 0.3s ease" },
};
