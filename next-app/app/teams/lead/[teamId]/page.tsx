"use client";

import { useState } from "react";
import { Lobster_Two } from "next/font/google";
import { useRouter } from "next/navigation";

const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

const teamDetails: { [key: string]: any } = {
  "1": {
    name: "Alpha Squad",
    leader: "Alice",
    members: [
      { name: "Ali", contribution: "Backend APIs", rating: 4 },
      { name: "Sara", contribution: "UI / UX Design", rating: 5 },
      { name: "Ahmed", contribution: "Database Design", rating: 3 },
      { name: "Zara", contribution: "Testing & QA", rating: 2 },
    ]
  },
  "2": {
    name: "Design Gurus",
    leader: "Bob",
    members: [
      { name: "John", contribution: "Graphic Design", rating: 5 },
      { name: "Emma", contribution: "Web Design", rating: 4 },
      { name: "Tom", contribution: "Prototyping", rating: 3 },
    ]
  },
  "3": {
    name: "Product Masters",
    leader: "Charlie",
    members: [
      { name: "Lisa", contribution: "Product Strategy", rating: 5 },
      { name: "Mark", contribution: "Market Research", rating: 4 },
    ]
  },
  "4": {
    name: "Dev Ninjas",
    leader: "David",
    members: [
      { name: "Chris", contribution: "Full Stack Dev", rating: 5 },
      { name: "Nina", contribution: "DevOps", rating: 4 },
      { name: "Sam", contribution: "Security", rating: 3 },
    ]
  }
};

export default function TeamDetailsPage({ params }: { params: { teamId: string } }) {
  const router = useRouter();
  const team = teamDetails[params.teamId] || { name: "Unknown", leader: "N/A", members: [] };
  
  const [teamData, setTeamData] = useState(team.members);

  const setRating = (index: number, value: number) => {
    const updated = [...teamData];
    updated[index].rating = value;
    setTeamData(updated);
  };

  // Ranking logic
  const rankedUsers = [...teamData].sort((a, b) => b.rating - a.rating);

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <span className={lobster.className} style={styles.logo}>
          Worklog
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          <button 
            onClick={() => router.push("/home")}
            style={{ ...styles.backButton, background: "#4285F4" }}
          >
            Home
          </button>
          <button 
            onClick={() => router.back()}
            style={styles.backButton}
          >
            ← Back
          </button>
          <button 
            onClick={() => router.push("/login")}
            style={{ ...styles.backButton, background: "#ff6b6b" }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={styles.content}>
        {/* MAIN TABLE */}
        <div style={styles.card}>
          <h2 style={styles.title}>{team.name} - Team Contributions</h2>
          <p style={styles.subtitle}>Led by: {team.leader}</p>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contribution</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member: any, index: number) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.contribution}</td>
                  <td>
                    <div style={styles.rating}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          style={{
                            ...styles.star,
                            color:
                              star <= member.rating
                                ? "#FFD700"
                                : "#555",
                          }}
                          onClick={() => setRating(index, star)}
                        >
                          ★
                        </span>
                      ))}
                      <span style={styles.ratingText}>
                        {member.rating}/5
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RANKING TABLE */}
        <div style={styles.rankCard}>
          <h3 style={styles.rankTitle}>User Rankings</h3>

          <table style={styles.rankTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {rankedUsers.map((user: any, i: number) => (
                <tr key={i}>
                  <td style={styles.rankNumber}>{i + 1}</td>
                  <td>{user.name}</td>
                  <td style={{ color: "#FFD700", fontWeight: 600 }}>
                    {user.rating}/5
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #a8edea, #fed6e3, #d1c4e9)",
  },
  navbar: {
    background: "linear-gradient(90deg, #021c3f, #041b60)",
    padding: "16px 30px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
    borderBottom: "2px solid #FFD700",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "2.4rem",
    color: "#CD2C58",
    textShadow: "0 0 8px #CD2C58",
  },
  backButton: {
    background: "#FFD700",
    color: "#000",
    border: "none",
    padding: "8px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  content: {
    display: "flex",
    gap: 30,
    padding: 40,
    alignItems: "flex-start",
  },
  card: {
    flex: 3,
    background: "#0D1B3D",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: "2.2rem",
    color: "#FFD700",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: "1rem",
    color: "#ccc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  star: {
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "transform 0.15s ease",
  },
  ratingText: {
    marginLeft: 8,
    fontSize: "0.95rem",
    color: "#FFD700",
    opacity: 0.85,
  },
  rankCard: {
    flex: 1.4,
    background: "#08122B",
    padding: 24,
    borderRadius: 18,
    boxShadow: "0 10px 24px rgba(0,0,0,0.4)",
    color: "#fff",
  },
  rankTitle: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: "1.6rem",
    color: "#FFD700",
  },
  rankTable: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  rankNumber: {
    fontWeight: 700,
    color: "#CD2C58",
  },
};
