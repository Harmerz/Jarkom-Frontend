import './App.css';
import DeviceMap from './Component/map';
import { Select, Button, Segmented } from 'antd';
import React, {useEffect, useState}  from 'react';
import axios from 'axios';

const { Option } = Select;
function App() {
  // usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState([]);

    const [ asal, setAsal ] = useState("");
    const [ tujuan, setTujuan ] = useState("");
    const [ algo, setAlgo ] = useState("/bellman");

  const [ kota, setKota ] = useState([])

  const Jarak = async () => {

      axios({
        method: "GET",
        url:`${algo}?asal=${asal}&tujuan=${tujuan}`,
      })
      .then((response) => {
        setdata([...response.data])
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
    
  
  }




  // Using useEffect for single rendering
  const Allin = async () => {
      axios({
        method: "GET",
        url:"/all",
      })
      .then((response) => {
        setdata([...response.data])
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}
  

  //KOTA
    useEffect(() => {
      axios({
        method: "GET",
        url:"/kota",
      })
      .then((response) => {
        setKota(response.data)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}
    ,[]);
    return (
      <div className="App">
        <div>
        <div className='h-[10vh] place-content-center content-center items-center flex'>
          <div className='items-center justify-items-center'>
            
          <div className='justify-around  w-[100vw] flex'>
            <div className='w-1/2 justify-around flex'>
              
            <div className='justify-around flex w-2/3'>
            <div>
            Asal :
            <Select
              showSearch
              allowClear
              style={{width:200}}
              placeholder="Select Kota"
              optionFilterProp="childern"
              onChange={(e)=>setAsal(e)}
              // onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {
                kota.map((data)=><Option value={data} key={data}>{data}</Option>)
              }
            </Select>
            </div>
          
            <div>
            Tujuan :
            <Select
              showSearch
              allowClear
              style={{width:200}}
              placeholder="Select Kota"
              onChange={(e)=>setTujuan(e)}
              // onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {
                kota.map((data)=><Option value={data} key={data}>{data}</Option>)
              }
            </Select>
            </div>
            </div>
              <div className='justify-around w-1/3 flex'>
              <Button
                onClick={()=>{Jarak()}}
              >Find</Button>
              <Button
              onClick={()=>{Allin()}}
              >All Data</Button>
              </div>
            </div>
              <div>
                <Segmented options={['Bellman Ford', 'Djikstraa']} onChange={(e)=>{if(e === "Bellman Ford") setAlgo("/bellman"); else setAlgo("/djikstraa") }} />
              </div>
          </div>
          </div>
          
        </div>
        </div>
        <DeviceMap data={data}/>
      </div>
    );
}

export default App;
