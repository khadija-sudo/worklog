"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lobster_Two } from "next/font/google";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";

const lobsterTwo = Lobster_Two({ weight: "400", subsets: ["latin"] });

// Sample teams data
const teams = [
  { id: "1", name: "Alpha Squad", leader: "Alice" },
  { id: "2", name: "Design Gurus", leader: "Bob" },
  { id: "3", name: "Product Masters", leader: "Charlie" },
  { id: "4", name: "Dev Ninjas", leader: "David" },
];

export default function LeadTeamsPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<"teams" | "create">("teams");
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");

  const handleCreateTeam = () => {
    if (!teamName.trim()) return alert("Enter team name!");
    alert(`Team "${teamName}" created!`);
    setTeamName("");
    setTeamDesc("");
    setActivePage("teams");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) router.push("/login");
  };

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className={`logo ${lobsterTwo.className}`}>Worklog</div>
        <ul className="nav-links">
          <li><a className="home-link" href="/home">Home</a></li>
        </ul>

        <button
          style={styles.logoutButton}
          onClick={handleLogout}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 20px #ff6b6b")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 12px #ff6b6b")}
        >
          Logout
        </button>
      </nav>

      <div style={styles.mainArea}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <button className="sidebar-btn" onClick={() => setActivePage("create")}>
            <AiOutlinePlus /> Create Teams
          </button>
          <button className="sidebar-btn" onClick={() => router.push("/teams/lead")}>
            <FaUserTie /> Lead Teams
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.pageContent}>
          {activePage === "teams" ? (
            <div style={styles.teamGrid}>
              {teams.map(team => (
                <div
                  key={team.id}
                  style={styles.teamCard}
                  onClick={() => router.push(`/teams/lead/${team.id}`)}
                >
                  <h3>{team.name}</h3>
                  <p>Leader: {team.leader}</p>
                  <p style={styles.clickText}>Click to view contributions →</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.createTeamCard}>
              <button style={styles.closeButton} onClick={() => setActivePage("teams")}>×</button>
              <h2 style={styles.formTitle}>Create a New Team</h2>

              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                style={styles.input}
              />
              <textarea
                placeholder="Team Description"
                value={teamDesc}
                onChange={e => setTeamDesc(e.target.value)}
                style={{ ...styles.input, height: 80 }}
              />
              <button style={styles.createTeamButton} onClick={handleCreateTeam}>
                Create Team
              </button>
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
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    background: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05), transparent 50%),
                 radial-gradient(circle at 80% 70%, rgba(255,255,255,0.03), transparent 50%),
                 linear-gradient(160deg, #F9DFDF 0%, #F6F0D7 50%, #BADFDB 100%)`,
    backgroundBlendMode: "overlay, overlay, normal",
  },
  mainArea: { display: "flex", flex: 1 },
  sidebar: {
    width: 200,
    background: "#1c1c1c",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    borderRight: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "2px 0 12px rgba(0,0,0,0.5), -2px 0 12px rgba(0,0,0,0.3)",
  },
  pageContent: { flex: 2, padding: 20, display: "flex", flexDirection: "column" },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20,
  },
  teamCard: {
    background: "#2a2a2a",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
    cursor: "pointer",
    color: "#fff",
    transition: "all 0.2s ease",
  },
  clickText: { fontSize: 12, marginTop: 8, color: "#FFD700" },
  createTeamCard: {
    background: "#2a2a2a",
    padding: 25,
    borderRadius: 18,
    boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    color: "#eee",
    width: "100%",
    height: "100%",
    transition: "all 0.3s ease",
    position: "relative",
  },
  closeButton: { position: "absolute", top: 12, right: 12, background: "transparent", border: "none", color: "#ffd700", fontSize: 24, cursor: "pointer" },
  formTitle: { fontSize: "2rem", fontWeight: 700, color: "#ffd700", marginBottom: 12 },
  input: { padding: "14px 18px", borderRadius: 10, border: "1px solid #ccc", fontSize: 14, color: "#000", width: "100%", background: "#fff", outline: "none" },
  createTeamButton: { marginTop: 20, padding: "14px 18px", background: "#ffd700", color: "#222", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 600 },
  logoutButton: { position: "fixed", top: 20, right: 20, background: "#ff6b6b", color: "#fff", border: "2px solid #ff6b6b", padding: "10px 25px", borderRadius: 12, fontWeight: 600, cursor: "pointer", zIndex: 1000, boxShadow: "0 0 12px #ff6b6b", transition: "all 0.3s ease" },
};
