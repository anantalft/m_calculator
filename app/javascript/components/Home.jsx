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


const Home = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [pointPopup, setPointPopup] = useState(false);
  const [points, setPoints] = useState(JSON.parse(loadJSON('players_points')))
  // const points = JSON.parse(loadJSON('players_points'));
    const p_points = (player, number_of_players, t_points, aObj) => {
        if (player.played && player.maalseen){
            return (parseInt(player.point) * number_of_players) - (t_points + 3)
        }
        if (player.played && player.winner){
            return 0
        }

        if (player.played && !player.maalseen){
            return -(t_points + 10)
        }
        return 0;
    }

    const colPlayers= () => {
        const names = JSON.parse(loadJSON('players'))
        if(!names) return [];
        const p_names = names.map(item => (
            {
                Header: item.name,
                accessor: `${item.name}`,
                // Cell: ({ cell: { value } }) => <h1 values={value} />
            }))
        return [...p_names, {Header: 'Total', accessor: 'total'}]

    }
    const columns =  [
        {
            // First group columns
            Header: "Players list",
            columns: colPlayers()
        },
    ];

    const calculated_points = () =>  {
        if (!points) return []
        const convertedPoints = Object.keys(points).map(key => {
            const playerWithoutTotal = arrOrderFilter(points[key])
            return playerWithoutTotal.reduce((playerObj, player, pIndex, playerWithoutTotal) => {
                const number_of_players = playerWithoutTotal.reduce((total_players, item) => { return total_players =  item.played ? total_players + 1 : total_players }, 0)
                const t_points = playerWithoutTotal.reduce((total_points, item) => { return total_points =  item.played && item.maalseen ? total_points + parseInt(item.point) : total_points }, 0)
                const winnerName = playerWithoutTotal.filter(item => item.winner == true)
                playerObj['winner'] = winnerName[0].name || ''
                playerObj[`${player.name}`] = p_points(player,number_of_players,t_points ,playerWithoutTotal) || 0;
                playerObj['total'] = t_points || 0;
                return playerObj;
            }, {})
        });
      // Iterate over each object in the array to calculate winner value
        convertedPoints.forEach(point => {
            const winnerValue = point.winner;
            // Calculate the sum of remaining items (excluding 'total')
            const sum = Object.keys(point).reduce((acc, key) => {
                if (key !== 'total' && key !== 'winner' && key !== winnerValue) {
                    acc += point[key] || 0;
                }
                return acc;
            }, 0);

            // Assign the sum to the 'winner' property
            point[winnerValue] = -sum;
        });

        // Calculate the sum for each column
        const columnSums = columns[0].columns.map(column => {
            if (column.accessor) {
                return convertedPoints.reduce((acc, row) => acc + (parseInt(row[column.accessor]) || 0 ), 0);
            }
            return null;
        });

       // Add the total  row to the data. it add total at the end of the table.
        return  [...convertedPoints, {...Object.fromEntries(columns[0].columns.map((col, index) => [col.accessor, columnSums[index]]))}];

    }

    const [data, setData] = useState([]);


    useEffect(() => {
        setPoints(JSON.parse(loadJSON('players_points')))
        setData(calculated_points)
    },[data]);

    const closePopup = () => {
        setPointPopup(false);
        setButtonPopup(false);
    }

    const clearAllData = (message) => {
        const confirm = () => {
            if(window.confirm(message)){
                removeJSON('players')
                removeJSON('players_points')
            }
        }
        return confirm
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
                  <button onClick={() => setPointPopup(true)}> Add Points</button>
                  <button onClick={clearAllData('Sure?')}> Clear all data</button>
                  <Mpopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                      <h3> Add Players</h3>
                      <MyForm players={columns[0].columns} closePopUp={closePopup}/>
                  </Mpopup>
                  <Mpopup trigger={pointPopup} setTrigger={setPointPopup}>
                      <h3> Add Points</h3>
                      <PointForm players={columns[0].columns} closePopUp={closePopup}/>
                  </Mpopup>
                  <br/><br/>
                  <Table columns={columns} data={data}/>

              </Container>
          </Container>
          <footer>
              <div className='footer'>
                  <p>Author: Ananta Lamichhane &copy; Copyright 2024 <br/><a
                      href="mailto:anantalamichhane1@gmail.com">anantalamichhane1@gmail.com</a></p>
              </div>
          </footer>

      </section>
  )
}

export default Home
