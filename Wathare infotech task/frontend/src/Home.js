import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [sample, setsample] = useState([]);
  const [countofone, setcountofone] = useState(0);
  const [countofzero, setcountofzero] = useState(0);
  const [countofcontinueone, setcountofcontinueone] = useState(0);
  const [countofcontinuezero, setcountofcontinuezero] = useState(0);
  const [weatherdata, setweatherdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getdata")
      .then((res) => {
        // console.log(res.data.sampledata);
        setsample(res.data.sampledata);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=2c93ab5a7a091f9c5c77cf4423d6358f")
    .then(async(data)=>{
      setweatherdata(await data.json());
    })
  }, []);

  useEffect(()=>{
    let count0=0
    let count1=0
    for (let i in sample) {
      if (sample[i].machine_status == 1) {
        count1++
      }else {
        count0++
      }
    }
     setcountofone(count1)
     setcountofzero(count0)
    
     let maxcontinousone = 0;
     count1=0
    for (let i in sample) {
      if (sample[i].machine_status == 1) {
        count1++;
        maxcontinousone = Math.max(maxcontinousone,count1)
      }else{
        count1=0;
      }
    }
    setcountofcontinueone(maxcontinousone)

    let maxcontinouszero = 0;
    count0=0
   for (let i in sample) {
     if (sample[i].machine_status == 0) {
       count0++;
       maxcontinouszero = Math.max(maxcontinouszero,count0)
     }else{
       count0=0;
     }
   }
   setcountofcontinuezero(maxcontinouszero)
   
  },[sample])
  
  return (
    <div>
      {/* {sample &&
        sample.map((sam) => {
          return (
            <h1>
              ts: {sam.ts} , ms : {sam.machine_status} , vibe : {sam.vibration}
            </h1>
          );
        })} */}

    <table>
      <tr>
        <th>countofone</th>
        <th>countofzero</th>
        <th>countofcontinueone</th>
        <th>countofcontinuezero</th>
      </tr>
      <tr>
        <td>{countofzero}</td>
        <td>{countofone}</td>
        <td>{countofcontinueone}</td>
        <td>{countofcontinuezero}</td>
      </tr>
    </table>
    <h1>weather in Pune</h1>
    <span>Temprature:{weatherdata.main.temp}</span><br></br>
    <span>grnd_level:{weatherdata.main.grnd_level}</span><br></br>
    <span>sea_level:{weatherdata.main.sea_level}</span><br></br>
    <span>sea_level:{weatherdata.main.humidity}</span>
    
    </div>

  );
}

export default Home;
