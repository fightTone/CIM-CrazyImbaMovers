import React, { useEffect, useRef } from 'react';
import './TeamMember.css';

const TeamMember = ({ member, animationDelay }) => {
  const memberRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (memberRef.current) {
        memberRef.current.style.animationPlayState = 'running';
      }
    }, animationDelay * 1000);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  return (
    <div
      ref={memberRef}
      className="team-member"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="member-card">
        {/* Profile Header Section */}
        <div className="profile-header">
          <div className="profile-left">
            <h3 className="member-name">{member.name}</h3>
            <p className="member-handle">{member.handle}</p>
          </div>
          <div className="profile-avatar">
            <img src={member.image} alt={member.name} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">{member.stats.mmr}</div>
            <div className="stat-label">⚡ MMR</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{member.stats.winStreak}</div>
            <div className="stat-label">🔥 Win Streak</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{member.stats.gamesWon}</div>
            <div className="stat-label">🏆 Games Won</div>
          </div>
        </div>

        {/* Position and About */}
        <div className="member-info">
          <p className="member-position">{member.position}</p>
          <p className="member-about">{member.about}</p>
        </div>

        {/* Best Heroes Tags */}
        <div className="best-heroes">
          {member.heroes.map((hero, index) => (
            <span key={index} className="hero-tag">{hero}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;