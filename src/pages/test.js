import React, { useState, useEffect } from 'react';

export default function test() {
    const [apitokken, setApitokken] = useState("f24a7e3f-6f3a-4658-a67c-fe73d2a88833");
    const [agencyKey, setAgencyKey] = useState("81854E61-DB4D-4BC1-87BC-D30DAC649886");
    const [adultCount, setAdultCount] = useState("1");
    const [childCount, setChildCount] = useState("0");
    const [InfantCount, setInfantCount] = useState("0");
    const [PreferredAirlines, setPreferredAirlines] = useState("null");
    const [tripType, setTripType] = useState("0");
    const [typeOfclass, setTypeOfClass] = useState("0");
    const [source, setSource] = useState("DEL");
    const [destination, setDestination] = useState("AMD");
    const [traveldate, setTravelDate] = useState("2023-10-22T00:00:00");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");


    
      

    
    async function submited() {
      
      let item = {
        "apitokken": apitokken,
"AgencyKey": agencyKey,
"AdultCount": adultCount,
"ChildCount": childCount,
"InfantCount": InfantCount,
"PreferredAirlines": PreferredAirlines,
"source": source,
"destination": destination,
"traveldate": traveldate,
"TripType": 0,
"TypeOfClass": 0
      }
      console.log(item)
      
   
      let result = await fetch("https://whollykart.com/ap/test.php",{
        method: 'POST',
        body:JSON.stringify(item),
        headers:{
          "Content-Type":"application/json",
          "Accept":'application/json',
          
        }
   
      });
      result= await result.json();
      console.log(result)
      const id = result;
      console.log(id);
      
    }

      

  return (
   <button
              title="Login"
             
              buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }}
              containerStyle={{
                width: '95%',
                marginHorizontal: 50,
                
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onClick={submited}
            >
                Submitter </button>
  )
}
