
const weatherForm = document.querySelector('form');
const searchValue = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

function getWeather(location){
    p1.textContent='Waiting...';
    p2.textContent='';
    fetch('/weather?address='+location).then((res)=>{
    res.json().then((data)=>{
       if(data.error){
        p1.textContent=data.error;  
        //console.log(data.error);
       }else{
           p1.textContent=data.location;
           p2.textContent = data.forecast;
           console.log(data.forecast);
       }
    })
})
}

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const value = searchValue.value;
    getWeather(searchValue.value);
//    console.log("it Working"+value) ;
})