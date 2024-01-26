import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchTrip, setSearchTrip] = useState("");
  const [dataTrip, setDataTrip] = useState([]);

  const getTravelTrip = async () => {
    let result;
    if (searchTrip) {
      result = await axios.get(
        `http://localhost:4001/trips?keywords=${searchTrip}`
      );
    } else {
      result = await axios.get(`http://localhost:4001/trips?keywords=`);
    }
    setDataTrip(result.data.data);
    return result;
  };

  useEffect(
    (searchTrip) => {
      getTravelTrip(searchTrip);
    },
    [searchTrip]
  );
  console.log(dataTrip);
  console.log(searchTrip);

  return (
    <div className="app flex flex-col justify-center items-center p-20   ">
      <div className="text-5xl font-bold pb-7 text-cyan-500 ">เที่ยวไหนดี</div>
      <div className="flex flex-row justify-start items-start w-8/12 pb-2">
        <div>ค้นหาที่เที่ยว</div>
      </div>
      <input
        className="bg-gray-50 border border-gray-300  text-black text-sm  text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-8/12 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500  mb-10"
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={searchTrip}
        onChange={(e) => setSearchTrip(e.target.value)}
      />

      {dataTrip.map((result, index) => (
        <div key={index}>
          <div className="flex flex-row justify-center items-center mb-12 ">
            <div className="block-photo w-1/3 ">
              <div className="  overflow-hidden border border-gray-300 rounded-3xl       ">
                <img class=" object-cover" src={result.photos[0]} />
              </div>
            </div>
            <div className="block-text w-2/3 h-56 pl-10 flex flex-col   justify-start ">
              <div className="title text-3xl pb-5 font-semibold    ">
                {result.title}
              </div>
              <div>
                {result.description.length > 100 ? (
                  <p className="description">
                    {result.description.slice(0, 100) + " " + "..."}
                  </p>
                ) : (
                  <p className="description">{result.description}</p>
                )}
              </div>
              <a
                onClick={() => {
                  window.open(`${result.url}`, "_blank");
                }}
                className=" text-cyan-400 underline"
              >
                อ่านต่อ
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
