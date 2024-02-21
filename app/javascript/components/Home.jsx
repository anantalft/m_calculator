import React, {useEffect, useMemo} from 'react';
import { useNavigate, Link } from "react-router-dom";
import {Container} from "react-bootstrap";
import 'reactjs-popup/dist/index.css';
import Mpopup from "~/components/Mpopup";
import { useState} from "react";
import MyForm from "~/components/MyForm";
import Table from "~/components/Table";
import axios from "axios";
import PointForm from "~/components/PointForm";
import {loadJSON, arrOrderFilter, winner, removeJSON} from "~/util/loadStorage";
import { FaEdit, FaTrash } from "react-icons/fa";


const Home = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [pointPopup, setPointPopup] = useState(false);
  const [playerList, setPlayerList] = useState(JSON.parse(loadJSON('players')))
  const [points, setPoints] = useState(JSON.parse(loadJSON('players_points')))
  const [editPoints, setEditPoints] =   useState({})

    const [columnst, setColumnst] = useState(columns(playerList))
    const [calculatedPoints, setCalculatedPoints] = useState(calculated_points_c(points))


  // const points = JSON.parse(loadJSON('players_points'));
    function p_points(player, number_of_players, t_points) {
        if (player.played && player.maalseen && !player.winner && player.dublee){
            return (parseInt(player.point) * number_of_players) - t_points
        }
        if (player.played && player.maalseen && !player.winner){
            return (parseInt(player.point) * number_of_players) - (t_points + 3)
        }
        if (player.played && player.winner && player.maalseen){
            return parseInt('0')
        }

        if (player.played && !player.maalseen){
            return -(parseInt(t_points) + 10)
        }
        return 0;
    }

    const editPoint = (e,rowId) => {
        e.preventDefault();
        setEditPoints( { [rowId] : JSON.parse(loadJSON('players_points'))[rowId] });
        setPointPopup(true);
    }



    function colPlayers(playerList) {
        if(!playerList) return [];
        const p_names = playerList.map(item => (
            {
                Header: item.name,
                accessor: `${item.name}`,
                // Cell: ({ cell: { value } }) => <h1 values={value} />
            }))
        return [...p_names, {Header: 'Total', accessor: 'total'},
            {
                Header: 'Actions',
                accessor: 'uid',
                Cell: ({ cell: { value }}) => (
                    <>
                    <button onClick={(e) => { editPoint(e, value);} } >
                        Edit
                    </button>
                    </>
                ),
            }]

    }


    function columns(playerList) {
                    return [
                {
                    Header: "Players list",
                    columns: colPlayers(playerList),
                },
            ];
    }


    function calculated_points_c(points) {
        if (!points) return []
        const convertedPoints = Object.keys(points).map(key => {
            const playerWithoutTotal = arrOrderFilter(points[key])
            return playerWithoutTotal.reduce((playerObj, player, pIndex, playerWithoutTotal) => {
                const number_of_players = playerWithoutTotal.reduce((total_players, item) => { return total_players =  item.played ? total_players + 1 : total_players }, 0)
                const t_points = playerWithoutTotal.reduce((total_points, item) => { return total_points =  item.played && item.maalseen ? total_points + parseInt(item.point) : total_points }, 0)
                const winnerName = playerWithoutTotal.filter(item => item.winner == true)
                playerObj['uid'] = parseInt(key);
                playerObj['winner'] = winnerName[0].name || '';
                playerObj[`${player.name}`] = p_points(player,parseInt(number_of_players),parseInt(t_points)) || 0;
                playerObj['total'] = t_points || 0;
                return playerObj;
            }, {})
        });
      // Iterate over each object in the array to calculate winner value
        convertedPoints.forEach(point => {
            const winnerValue = point.winner;
            // Calculate the sum of remaining items (excluding 'total')
            const sum = Object.keys(point).reduce((acc, key) => {
                if (key !== 'total' && key !== 'winner' && key !== winnerValue && key !== 'uid') {
                    acc += point[key] || 0;
                }
                return acc;
            }, 0);

            // Assign the sum to the 'winner' property
            point[winnerValue] = -sum;
        });

        // Calculate the sum for each column
        const columnSums = columns(playerList)[0].columns.map(column => {
            if (column.accessor) {
                return convertedPoints.reduce((acc, row) => acc + (parseInt(row[column.accessor]) || 0 ), 0);
            }
            return null;
        });
       // Add the total  row to the data. it add total at the end of the table.
        return  [...convertedPoints, {...Object.fromEntries(columns(playerList)[0].columns.map((col, index) => [col.accessor, columnSums[index]]))}];

    }

    const closePopup = () => {
        setPointPopup(false);
        setButtonPopup(false);
    }


    const clearAllData = (message) => {
        const confirm = () => {
            if(window.confirm(message)){
                removeJSON('players')
                removeJSON('players_points')
                updatePlayers();
                updateCalculatedPoints();
            }
        }
        return confirm
    }

    const updatePlayers = (t) => {
        setPlayerList((prevPlayerList) => {
            const updatedPlayerList = JSON.parse(loadJSON('players'));
            setColumnst(columns(updatedPlayerList));
            return updatedPlayerList;
        });

    }

    const updateCalculatedPoints= () => {
      setPoints((previousPoints) => {
          const updatedPoints = JSON.parse(loadJSON('players_points'));
          setCalculatedPoints(calculated_points_c(updatedPoints))
          return updatedPoints
      })
    }

  return (
      <section>
          {/*<Link to="/summary">Go to the Summary page</Link>*/}
          {/*<br />*/}
          {/*<Link to="/report">Go to the Report page</Link>*/}
          <Container className="p-3">
              <Container className="p-5 mb-4 bg-light rounded-3">
                  <h1 className="header">Marriage(card game) calculator.</h1>
                  <p> For details about the game <a href="https://en.wikipedia.org/wiki/Marriage_(card_game)"
                                                    target="_blank">
                      click here
                  </a></p>
                  <button onClick={() => setButtonPopup(true)}> Add Players</button>
                  <button onClick={() =>{setEditPoints([]); setPointPopup(true)}}> Add Points</button>
                  <button onClick={clearAllData('Sure?')}> Clear all data</button>
                  <Mpopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                      <h3> Add Players</h3>
                      <MyForm players={playerList && columnst[0].columns || []} closePopUp={closePopup} updatePlayers={updatePlayers}/>
                  </Mpopup>
                  <Mpopup trigger={pointPopup} setTrigger={setPointPopup}>
                      <h3> Add Points</h3>
                      <PointForm players={playerList && columnst[0].columns || []}  editPoints={editPoints} closePopUp={closePopup} updateCalculatedPoints={updateCalculatedPoints} points={points}/>
                  </Mpopup>
                  <br/><br/>
                  { (columnst)  && <Table columns={columnst} data={calculatedPoints} /> }

              </Container>
          </Container>
          <footer>
              <div className='footer'>
                  <p>Author: Ananta Lamichhane &copy; Copyright 2024 <br/></p>
              </div>
          </footer>

      </section>
  )
}

export default Home
