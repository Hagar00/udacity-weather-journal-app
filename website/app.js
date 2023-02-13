/* Global Variables */

// const { bodyParser } = require("body-parser");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Personal API Key for OpenWeatherMap API

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// metric is convert temp to celsius in openweather website
const apiKey = ",&appid=ab9935d3d971b879327a23d58b9a2ff7&units=metric";
// const keyApi = "ab9935d3d971b879327a23d58b9a2ff7";

const server = "http://127.0.0.1:4000";

// show error to user 
const error = document.getElementById("error");
 
// function to create data 
const createData =()=>{
    const zip = document.getElementById("zip").Value;
    const feelings = document.getElementById("feelings").value ;

     retrieveData(zip).then((data) =>{
        if(data){
            const {
                main:{temp},
                name: city ,
                weather : [{description}],
            } = data;

            const info = {
                newDate,
                city,
                temp: Math.round(temp),
                description,
                feelings
            };
            postData(server + "/add", info);
            updatingUi();
            document.getElementById('entry').style.opacity = 1;
            }
        
    });
};

document.getElementById("generate").addEventListener("click", createData);

const retrieveData = async (zip)=>{
    try{
        const response = await fetch(baseUrl+zip+apiKey);
        const data = await response.json();

        if(data.cod != 200){
            error.innerHTML = data.message;
            setTimeout(()=> error.innerHTML = '', 2000)
            throw `${data.message}`;
        }
        return data;
    } catch(error){
        console.log(error);
    }
};

// function to post data 
const postData = async (url = "", info = {})=>{
    const response = await fetch(url,{
        method: "POST",
        headers: {
             "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try{
        const newData = await response.json();
        console.log(`you just saved `, newData);
        return newData;

    }catch(error){
        console.log(error);
    }
};

// function to get project data 
const updatingUi = async () =>{
    const response = await fetch(server + "/all");
    try{
        const savedData = await response.json();

        document.getElementById("date").innerHTML = savedData.newDate;
        document.getElementById("city").innerHTML = savedData.city;
        document.getElementById("temp").innerHTML = savedData.temp + '&degC';
        document.getElementById("description").innerHTML = savedData.description;
        document.getElementById("content").innerHTML = savedData.feelings;
    }
    catch(error){
        console.log(error);
    }
};