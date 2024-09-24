import { useState } from "react";
import image from "./components/images/Wikipedia.png"
// import logo from "./components/images/world.gif"

function App() {
  const [search, setSearch] = useState("");
  const [result, setResults] = useState([]);
  const [searchinfo, setSearchInfo] = useState({});

  const handleSearch = async e =>{
    e.preventDefault();
    if(search === '') return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);

    if(!response.ok){
      throw Error(response.statusText);
    }
    const json = await response.json();
    console.log(json);
    
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  }



  return (
    <div className="App">
      <header>
      <img src={`${image}`} alt="" className="img"/>
        <h1>Info-HIVE</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input 
          type="search" 
          placeholder="search here..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          />
        </form>
        {/* <img src={logo} alt="loading..." style={{display: "flex", width: "70px", objectFit: "cover", mixBlendMode: "multiply"}} /> */}
        
        { (searchinfo.totalhits) ? <p>search results: {searchinfo.totalhits}</p> : '' }
      </header>
      <div className="results">
        {result.map((result, i)=>{
          const url =`https://en.wikipedia.org/?curid=${result.pageid}`;

          return(
            <div className="result" key={i}>
                <h3>{result.title}</h3>
                <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
                <a href={url} target="_blank" rel="noreferrer"> read more...</a>
          </div>
          )
        })}
          
      </div>
    </div>
  );
}

export default App;
