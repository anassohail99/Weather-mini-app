window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-decription');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-time_zone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/f7ea0279c029c5fb5d5853408811144e/${lat},${long}`;
        
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature,summary,icon} = data.currently;
                    
                    // set dom elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    
                    // formula for celcius
                    let celcius  = (temperature - 32) * (5 / 9);
                    
                    // setting icon
                    setIcon(icon ,document.querySelector('.icon'));

                    //change temperature to C and F
                    temperatureSection.addEventListener('click' , ()=> {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C"
                            temperatureDegree.textContent = Math.floor(celcius)
                        }
                        else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })

                });
        });   
    }    
    function setIcon(icon , iconId){
        const skycons = new Skycons({color : 'white'});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();  // looks for every line and find all - and replace it with _
        skycons.play();
        return skycons.set(iconId , Skycons[currentIcon]);
    };
});