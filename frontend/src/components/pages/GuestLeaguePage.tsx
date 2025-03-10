import React, { useState, useEffect } from "react";
import { LeagueView, RawLeague } from "../../types/Leagues";
import { LeagueTable } from "../UI/LeagueTable";
import { MatchTable } from "../UI/MatchTable";
import { Match } from "../../types/Matches";
import { NavBarGuest } from "../UI/NavBarGuest";
import { LeagueService } from "../../services/LeagueService";

export const GuestLeaguePage = () => {
  const [leagues, setLeagues] = useState<LeagueView[]>([]);
  const [newLeague, setNewLeague] = useState({
    id: 0,
    name: "",
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string>("");

  const handleLeagueSelect = (league: RawLeague) => {
    setNewLeague(league);
  };

  const fetchLeagues = async () => {
    try {
      const response = await LeagueService.getAll();
      setLeagues(response.data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await LeagueService.get_matches(newLeague.id.toString());
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    if (newLeague.id) {
      fetchMatches();
    }
  }, [newLeague]);

  return (
    <div className="flex flex-col h-screen">
      <NavBarGuest />
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <div className="w-full">
            <LeagueTable
              leagues={leagues}
              onLeagueSelect={handleLeagueSelect}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <div className="w-full">
            <MatchTable matches={matches} />
          </div>
        </div>
      </div>
    </div>
  );
};

// import React from "react";
// import { NavBarAdmin } from "../UI/NavBarAdmin";
// import { TextInput } from "../UI/InputText";
// import { Button } from "../UI/Button";
// import { UserTable } from "../UI/UserTable";
// import { useState } from "react";
// import { User } from "../../types/Users";
// import { League, LeagueView, RawLeague } from "../../types/Leagues";
// import { useEffect } from "react";
// import { LeagueTable } from "../UI/LeagueTable";
// import { NavBarReferee } from "../UI/NavBarReferee";
// import { MatchTable } from "../UI/MatchTable";
// import { Match } from "../../types/Matches";
// import { NavBarGuest } from "../UI/NavBarGuest";
// import { LeagueService } from "../../services/LeagueService";
// export const GuestLeaguePage = () => {
//   const myHandle = () => {
//     alert("My alert");
//   };

//   const [leagues, setLeagues] = useState<LeagueView[]>([]);

//   const [newLeague, setNewLeague] = useState({
//     id: 0,
//     name: "",
//   });
//   const [error, setError] = useState<string>("");
//   const [info, setInfo] = useState<string>("");
//   const handlLeagueSelect = (league: RawLeague) => {
//     setNewLeague(league);
//   };
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewLeague({ ...newLeague, [name]: value });
//   };

//   const fetchLeagues = async () => {
//     try {
//       const response = await LeagueService.getAll();
//       setLeagues(response.data);
//     } catch (error) {
//       console.error("Error fetching leagues:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLeagues();
//   }, []);
//   // console.log(newLeague);
//   const [matches, setMatches] = useState<Match[]>([]);
//   const fetchMatches = async () => {
//     try {
//       const response = await LeagueService.get_matches(newLeague.id.toString());
//       // console.log("haha" + newLeague.id.toString());

//       console.log(response.data);
//       setMatches(response.data);
//     } catch (error) {
//       console.error("Error fetching leagues:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMatches();
//   }, [newLeague]);

//   return (
//     <div className="flex flex-col h-screen">
//       <NavBarGuest />
//       <div className="flex flex-grow">
//         <div className="w-1/2 border-r p-4 flex flex-col items-center">
//           <LeagueTable leagues={leagues} onLeagueSelect={handlLeagueSelect} />
//         </div>
//         <div className="w-1/2 p-4">
//           <MatchTable matches={matches} />
//         </div>
//       </div>
//     </div>
//   );
// };
