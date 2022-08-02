import axios from 'axios'
import React, { useEffect, useState } from 'react'
import iconOne from "./assets/images/icon(2).svg"
import iconTwo from "./assets/images/icon(1).svg"
import search from "./assets/images/search.png"
import moonrise from "./assets/images/moonrise.png"
import moonset from "./assets/images/moon.png"
import sunset from "./assets/images/sunset.png"
import sunrise from "./assets/images/sunrise.png"




function Home() {
    const [weather, setWeather] = useState()
    // key value api 
    const weatherKey = "fc93df6f8b664332812134242221907"
    // location Storage 
    const [cityName, setCityName] = useState("Tiruvannamalai")
    const [contactValue, setContactValue] = useState()
    const [isLoading, setIsLoading] = useState(true);

    const [dataTime, setDataTime] = useState("0")

    //   api url weather app 
    useEffect(() => {
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${cityName}&days=7`).then(response => {
            setWeather(response.data)
            console.log(response.data)
        }).finally(() => {
            setIsLoading(false);
        });
    }, [cityName])

    //   locatuion get 
    const changing = (e) => {
        const { value } = e.target;
        setContactValue(value)

    }
    //   storage value 
    const onSubmitHandler = (e) => {
        e.preventDefault()
        setCityName(contactValue)
        setContactValue("")
    }

    return (
        <div className="sunney">
            <div className='header-menu'> <h1>Weather App</h1>


                <form className='search-input' onSubmit={onSubmitHandler}>
                    <input type="text" onChange={changing} placeholder="search city" value={contactValue} />
                    <button type="submit"><img src={search} />   </button>
                </form></div>
            {isLoading ? "Loading...." :
                <>
                    <div className='cardSection'> <h1>{weather?.location.name} / {weather?.location.region}</h1>

                        <div className='tab-in-day'> <p onClick={(e) => { setDataTime(0) }} className={dataTime == 0 ? "active" : ""}>Today</p><p onClick={(e) => { setDataTime(1) }} className={dataTime == 1 ? "active" : ""}>Tomorrow</p><p onClick={(e) => { setDataTime(2) }} className={dataTime == 2 ? "active" : ""}>Day after tomorrow</p></div>

                        <div className='card-section'>
                            <h1>{weather?.forecast.forecastday[dataTime].day.avgtemp_c} / °c</h1>
                            <div className='icons'>  <img src={weather?.forecast.forecastday[dataTime].day.condition.icon} /></div>
                            <h3 className='weatherText'>{weather?.forecast.forecastday[dataTime].day.condition?.text}</h3>



                            <div className='wind'><div className='windIcon'><img src={iconTwo} alt="" /><h3>Wind</h3></div><h3>{weather?.forecast.forecastday[dataTime].day.maxwind_kph} Km/h</h3></div>
                            <div className='wind'><div className='windIcon'><img src={iconOne} alt="" /><h3>Humidity</h3></div><h3>{weather?.forecast.forecastday[dataTime].day.avghumidity} % </h3></div>


                        </div></div>


                    <div className='forecast-header'>

                        <h2>Hourly Forecast</h2>

                        <div className='forcast-header'>
                            {weather?.forecast.forecastday[dataTime].hour.map((user) => (
                                <>
                                    <div className='forecast'>
                                        <p className="user">{user.time.slice(10, 16)} </p>

                                        <div className='hour-img'> <img src={user.condition.icon} alt="" /></div>
                                        <p className="user">{user.temp_c} / °c</p></div>
                                </>


                            ))}


                        </div>
                    </div>
                    <div className='sunSet'>
                        <div className='riseSet'> <div className='riseicon' > <img src={sunrise} /><p> Sun Rise</p></div> <p>{weather?.forecast.forecastday[dataTime].astro.sunrise}</p></div>
                        <div className='riseSet'> <div className='riseicon'> <img src={sunset} /><p>Sun Set</p></div><p>{weather?.forecast.forecastday[dataTime].astro.sunset}</p></div>
                        <div className='riseSet'> <div className='riseicon'> <img src={moonrise} /><p>Moon Rise</p></div><p>{weather?.forecast.forecastday[dataTime].astro.moonrise}</p></div>
                        <div className='riseSet'> <div className='riseicon'> <img src={moonset} /><p>Moon Set</p></div><p>{weather?.forecast.forecastday[dataTime].astro.moonset}</p></div>
                    </div>


                </>
            }




            {/* {weather =="" ? 
            <div><h1>Is loading</h1></div>:
           <>
            <h1>weather api</h1>
            <h1>{weather.location.name}</h1>
            <h4>{weather.current.temp_c} / c</h4>
            
            <div>
            <img src={weather.current.condition.icon}/>
            <h3>{weather.current.condition.text}</h3>
            <div><p>{weather.current.wind_kph}Km/h</p></div>
           
            </div>
           </>

            } */}


            {/* <img src={weather.current.condition.icon}/> */}
        </div>
    )
}

export default Home
