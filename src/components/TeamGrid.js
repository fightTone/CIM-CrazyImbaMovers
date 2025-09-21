import React from 'react';
import TeamMember from './TeamMember';
import './TeamGrid.css';

const TeamGrid = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Player One",
      handle: "@carry • Since 2018",
      position: "Carry",
      about: "The reliable farmer who always gets his items, no matter how chaotic the game gets.",
      stats: {
        mmr: "850",
        winStreak: "25",
        gamesWon: "2.1K"
      },
      heroes: ["#Anti-Mage", "#Phantom-Assassin", "#Juggernaut"],
      image: "/players/Kiven.jpg"
    },
    {
      id: 2,
      name: "Player Two",
      handle: "@midlaner • Since 2017",
      position: "Mid",
      about: "The strategic mastermind who calls the shots and dominates the mid lane.",
      stats: {
        mmr: "1.2K",
        winStreak: "42",
        gamesWon: "3.5K"
      },
      heroes: ["#Invoker", "#Storm-Spirit", "#Queen-of-Pain"],
      image: "/players/Kenneth.jpg"
    },
    {
      id: 3,
      name: "Player Three",
      handle: "@offlaner • Since 2019",
      position: "Offlaner",
      about: "The resilient initiator who thrives in chaos and starts every team fight.",
      stats: {
        mmr: "950",
        winStreak: "18",
        gamesWon: "1.8K"
      },
      heroes: ["#Axe", "#Pudge", "#Tidehunter"],
      image: "/players/Adong.jpg"
    },
    {
      id: 4,
      name: "Player Four",
      handle: "@support • Since 2020",
      position: "Support",
      about: "The selfless guardian who keeps everyone alive and secures vision.",
      stats: {
        mmr: "720",
        winStreak: "15",
        gamesWon: "1.5K"
      },
      heroes: ["#Crystal-Maiden", "#Dazzle", "#Lion"],
      image: "/players/Gee.jpg"
    },
    {
      id: 5,
      name: "Player Five",
      handle: "@hardsupport • Since 2016",
      position: "Hard Support",
      about: "The ultimate team player who sacrifices everything for the team's success.",
      stats: {
        mmr: "680",
        winStreak: "32",
        gamesWon: "2.8K"
      },
      heroes: ["#Lich", "#Warlock", "#Shadow-Shaman"],
      image: "/players/Tacandong.jpg"
    }
  ];

  return (
    <div className="team-grid">
      {teamMembers.map((member, index) => (
        <TeamMember
          key={member.id}
          member={member}
          animationDelay={index * 0.2}
        />
      ))}
    </div>
  );
};

export default TeamGrid;