import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'

const htmlTemplate = `
<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        grid-row-gap: 5px;
        grid-column-gap: 5px;
    }
    .grid-item {
        font-family:roboto;font-size:12px;
        width:100%;height:100px;background-color:coral;
    }
</style>
<h1><slot></slot></h1>
<p><button>previous</button>{{day}}-{{month}}-{{year}}<button on-click="nextMonth">next</button></p>
<div class="grid-container">
    <template is="dom-repeat" items="{{_getDays(month)}}">
       <div class="grid-item">DAY {{item}}</div>
    </template>
</div>
`

export class IcoCalendar extends Element {
    static get template(){ return htmlTemplate; }
    static get properties() {
        return {
            day:{ type:Number, value:1, notify:true, reflectToAttribute:true},
            month:{ type:String, value:"JAN", notify:true, reflectToAttribute:true},
            year:{ type:Number, value:2018, notify:true, reflectToAttribute:true},
            appointments: { type:Array, value:[{subject:"john"}]}
        }

    }

    connectedCallback(){
        super.connectedCallback();

        this.months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        this.monthcounter = 0;
    }

    _getDays(){
        let arrayDays = []
        let length = this.monthcounter % 12 ==  1 ? 28 : this.monthcounter % 2 == 1 ? 30 : 31;
        for (let i = 0; i < length; i++) arrayDays[i] = i+1;
        return arrayDays;
    }

    nextMonth() {
        this.month = this.months[(++this.monthcounter) % this.months.length];
    }
    addAppointment(appointment){
        this.push('appointments', appointment);

    }
    removeAppointment(id){
        let appointment = this.appointments.filter(a => a.id == id);
        if (appointment) {
            let appointmentIndex = this.appointments.indexOf(appointment);
            this.splice('appointments', appointmentIndex);
        }
    }
}


customElements.define('ico-calendar', IcoCalendar);