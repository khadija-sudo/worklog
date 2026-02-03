"use client";

import React, { useState } from "react";
import { Lobster_Two } from "next/font/google";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUsers, FaUserTie } from "react-icons/fa"; // Added FaUserTie for Lead Teams

const lobsterTwo = Lobster_Two({ weight: "400", subsets: ["latin"] });

// Member teams from accepted invites
const memberTeams = [
  { id: 101, name: "Marketing Team", leader: "alice@example.com", society: "Marketing" },
  { id: 102, name: "Design Team", leader: "bob@example.com", society: "Design" },
  { id: 103, name: "Product Team", leader: "leader@company.com", society: "Product" },
];

export default function MemberTeamsPage() {
  const router = useRouter();
  const [acceptedTeams] = useState(memberTeams);

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
          {acceptedTeams.length > 0 ? (
            <div style={styles.teamGrid}>
              {acceptedTeams.map((team) => (
                <div 
                  key={team.id} 
                  style={styles.teamCard}
                  onClick={() => router.push(`/teams/member/${team.id}`)}
                >
                  <h3>{team.name}</h3>
                  <p><strong>Leader:</strong> {team.leader}</p>
                  <p><strong>Society:</strong> {team.society}</p>
                  <p style={styles.clickText}>Click to add/view contributions →</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 18, color: "#fff" }}>No teams joined yet. Accept an invitation to get started!</p>
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
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
  teamCard: {
    background: "#2a2a2a",
    padding: 25,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
    cursor: "pointer",
    color: "#fff",
    transition: "all 0.2s ease",
    minWidth: 220,
    maxWidth: 260,
    textAlign: "center",
  },
  clickText: { fontSize: 12, marginTop: 8, color: "#FFD700" },
  logoutButton: { position: "fixed", top: 20, right: 20, background: "#ff6b6b", color: "#fff", border: "2px solid #ff6b6b", padding: "10px 25px", borderRadius: 12, fontWeight: 600, cursor: "pointer", zIndex: 1000, boxShadow: "0 0 12px #ff6b6b", transition: "all 0.3s ease" },
};
