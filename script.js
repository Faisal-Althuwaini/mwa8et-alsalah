
let cities = [
    {
        arName: "حائل",
        name: "Ḩā'il"
    },
    {
        arName: "الرياض",
        name: "Ar Riyāḑ"
    },
    {
        arName: "مكة المكرمة",
        name: "Makkah al Mukarramah"
    },
    {
        arName: "المدينة المنورة",
        name: "Al Madīnah al Munawwarah"
    },
    
    
]

for (let city of cities) {
    const content = `
    <option>${city.arName}</option>
    `

    document.getElementById("cities-select").innerHTML += content
}

document.getElementById("cities-select").addEventListener("change", function() {
    
    document.getElementById("city-name").innerHTML = this.value

    let cityName = "" 

    for (let city of cities ) {
        if (city.arName == this.value) {
            cityName = city.name
        }

    }
    
    getPrayersTimingsOfCity(cityName)
    console.log(this.value)
})


function getPrayersTimingsOfCity(cityName) {

    
let params = {
    country: "SA",
    city: cityName
}

axios.get('https://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
  .then(function (response) {
    const timings = response.data.data.timings;
    fillTimeForPrayer("fajr-time",timings.Fajr)
    fillTimeForPrayer("sunrise-time",timings.Sunrise)
    fillTimeForPrayer("dhuhur-time",timings.Dhuhr)
    fillTimeForPrayer("asr-time",timings.Asr)
    fillTimeForPrayer("sunset-time",timings.Sunset)
    fillTimeForPrayer("isha-time",timings.Isha)

    const readableDate = response.data.data.date.readable;

    const weekDay = response.data.data.date.hijri.weekday.ar
    const monthHijri = response.data.data.date.hijri.month.ar
    const yearHijri = response.data.data.date.hijri.year

    const dateMelady = weekDay + " " + readableDate 
    const dateHijri = weekDay + " " + monthHijri + " " +  yearHijri

    document.getElementById("date-melady").innerHTML = dateMelady
    document.getElementById("date-hijri").innerHTML = dateHijri

    console.log();
  })
  .catch(function (error) {
    console.log(error);
  });  


  function fillTimeForPrayer(id,time) {

    let time12Hour = convertTo12HourFormat(time)

    document.getElementById(id).innerHTML = time12Hour;

  }


}

getPrayersTimingsOfCity("Ḩā'il")

//   CHANGE CITY SELECT





function convertTo12HourFormat(time24Hour) {
    // Create a Date object with the input time string
    const time24 = time24Hour.split(':');
    const hours = parseInt(time24[0]);
    const minutes = parseInt(time24[1]);
    const date = new Date(0, 0, 0, hours, minutes);
  
    // Format the time in 12-hour format
    let formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
    return formattedTime;
  }
  

  