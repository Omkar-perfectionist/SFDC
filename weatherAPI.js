import { LightningElement } from 'lwc';
import getWeather from '@salesforce/apex/WeatherAPI.getWeather';
export default class WeatherAPI extends LightningElement {

    city;
    imgUrl;
    condition;
    handleChange(event)
    {
       this.city = event.target.value;
       console.log('city',this.city);
    }

    buttonClick()
    {
       getWeather({city : this.city}).then((response)=> 
       {
        console.log('Response',response);
        let parsedData = JSON.parse(response);
        this.imgUrl = parsedData.current.condition.icon;
        this.condition = parsedData.current.condition.text;
       }).catch((error) => {
           console.log('##Error',JSON.stringify(error));
       })

    }


}