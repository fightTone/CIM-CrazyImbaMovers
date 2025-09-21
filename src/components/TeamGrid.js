import React from 'react';
import TeamMember from './TeamMember';
import './TeamGrid.css';

const TeamGrid = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Terces",
      handle: "@carry • Since 2015",
      position: "Carry",
      about: "The reliable farmer who always gets his items, no matter how chaotic the game gets.",
      stats: {
        mmr: "4300",
        winStreak: "53",
        gamesWon: "9.1K"
      },
      heroes: ["#Anti-Mage", "#Phantom-Assassin", "#Juggernaut"],
      image: "/players/Kiven.jpg"
    },
    {
      id: 2,
      name: "Boss Kenshin",
      handle: "@midlaner • Since 2014",
      position: "Mid",
      about: "The strategic mastermind who calls the shots and dominates the mid lane.",
      stats: {
        mmr: "5.2K",
        winStreak: "64",
        gamesWon: "9.5K"
      },
      heroes: ["#Invoker", "#Storm-Spirit", "#Queen-of-Pain"],
      image: "/players/Kenneth.jpg"
    },
    {
      id: 3,
      name: "Jinkainoh",
      handle: "@offlaner • Since 2015",
      position: "Offlaner",
      about: "The resilient initiator who thrives in chaos and starts every team fight.",
      stats: {
        mmr: "4950",
        winStreak: "57",
        gamesWon: "8.2K"
      },
      heroes: ["#Axe", "#Pudge", "#Tidehunter"],
      image: "/players/Adong.jpg"
    },
    {
      id: 4,
      name: "[000]",
      handle: "@support • Since 2020",
      position: "Support",
      about: "The selfless guardian who keeps everyone alive and secures vision.",
      stats: {
        mmr: "3470",
        winStreak: "32",
        gamesWon: "6.5K"
      },
      heroes: ["#Crystal-Maiden", "#Dazzle", "#Sand King"],
      image: "/players/Gee.jpg"
    },
    {
      id: 5,
      name: "KneeGuh Tron",
      handle: "@hardsupport • Since 2016",
      position: "Hard Support",
      about: "The ultimate team player who sacrifices everything for the team's success.",
      stats: {
        mmr: "4680",
        winStreak: "46",
        gamesWon: "6.8K"
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