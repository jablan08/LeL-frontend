const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");


/* GET home page. */
router.get("/tournaments", async (req, res) => {
  try {
    const tournamentsRunning = await fetchRunningTourney();
    const tournamentsRunningJson = await tournamentsRunning.json();

    const matchesUpcoming = await fetchUpcomingMatches();
    const matchesUpcomingJson = await matchesUpcoming.json();
    
    const tournamentsPast = await fetchPastTourney();
    const tournamentsPastJson = await tournamentsPast.json();

    const pastMatches = await fetchPastMatches();
    const pastMatchesJson = await pastMatches.json();

    const upcomingTourney = await fetchUpcomingTourney();
    const upcomingTourneyJson = await upcomingTourney.json();

    const data = {
      dataRunning: tournamentsRunningJson,
      dataUpcoming: matchesUpcomingJson,
      dataPast: tournamentsPastJson,
      dataPastMatches: pastMatchesJson,
      dataUpcomingTourney: upcomingTourneyJson




    }
    res.json({
      data,
      success: true
    }) 
  } catch (error) {
    console.log(error)
  }
});

// Promise all
const fetchRunningTourney = () =>
  fetch(`https://api.pandascore.co/lol/tournaments/running?token=${process.env.MY_SECRET}`)

const fetchUpcomingMatches = () =>
  fetch(`https://api.pandascore.co/lol/matches/upcoming?per_page=3&token=${process.env.MY_SECRET}`)
  
const fetchPastTourney = () =>
  fetch(`https://api.pandascore.co/lol/tournaments/past/?per_page=5&token=${process.env.MY_SECRET}`)

const fetchPastMatches = () => 
  fetch(`https://api.pandascore.co/lol/matches/past?per_page=6&token=${process.env.MY_SECRET}`)

  
const fetchUpcomingTourney = () =>
    fetch(`https://api.pandascore.co/lol/tournaments/upcoming?token=${process.env.MY_SECRET}`)
  


// GET TEAMS

router.get("/teams", async (req,res)=>{
  try {
   
    const teams = await fetchUpcomingTourney();
    const teamsJson = await teams.json();
    res.json({
      allTeams: teamsJson,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
})
router.get("/teams/:id", async (req,res)=>{
  try {
    
    const team = await fetch(`https://api.pandascore.co//teams/${req.params.id}?token=${process.env.MY_SECRET}`)
    const teamJson = await team.json();
    res.json({
      fullTeam: teamJson,
      success: true
    })
    
  } catch (error) {
    console.log(error)
  }
})
router.get("/match/:id", async (req,res)=>{
  try {
    
    const getMatch = await fetch(`https://api.pandascore.co//matches/${req.params.id}?token=${process.env.MY_SECRET}`)
    const matchJson = await getMatch.json();
    res.json({
      match: matchJson,
      success: true
    })
    
  } catch (error) {
    console.log(error)
  }
})

router.get("/schedule", async (req,res)=>{
  const getSchedule = await fetch(`https://api.pandascore.co/lol/matches/upcoming?&token=${process.env.MY_SECRET}`)
  const scheduleJson = await getSchedule.json();
  res.json({
    schedules: scheduleJson,
    success: true
  })
})


router.get("/tournament/:id", async (req,res)=>{
  const getTournamentStats = await fetch(`https://api.pandascore.co//tournaments/${req.params.id}/standings/?token=${process.env.MY_SECRET}`)
  const getTournamentStatsJson = await getTournamentStats.json();

  
  const getTournament = await fetch(`https://api.pandascore.co//tournaments/${req.params.id}/?token=${process.env.MY_SECRET}`)
  const getTournamentJson = await getTournament.json();

  
  res.json({
    tournamentStats: getTournamentStatsJson,
    tournament: getTournamentJson,
    success: true
  })
})


router.delete('/watchlist/:id', async (req, res) => {
  try {
    const foundUser = await User.findOne({'watchList': req.params.id});
    foundUser.watchList.remove(req.params.id);
    await foundUser.save();
 
    res.json({
      status: 200,
      data: deletedMovie
    });
  } catch(err) {
    res.send(err)
  }
});



module.exports = router;
