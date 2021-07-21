import React, {useEffect,useState} from "react";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";



const App = ()  => {

    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
  
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
    
        window.navigator.geolocation.getCurrentPosition(
          // we called setState to update to latest location
          (position)  => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          },
    
          (err) => setErrorMessage(err.message)
        );
        
      });

      const renderContent = () =>{
        if (errorMessage && !lat) {
          return <div className = "text-white season-display error">Oppps Error: {errorMessage} </div>;
        }
    
        if (!errorMessage && lat) {
          return <SeasonDisplay lat={lat} long={long}/>;
        }
    
        return <Spinner message="Please Accept Location Request" />;
      }

    return <div className="border white">{renderContent()}</div>;
  }

  export default App;

