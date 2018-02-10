import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'

const htmlTemplate = `
<style>
div { padding:20px; border:2px solid black;margin:20px;font-family:'Roboto';font-size:20px;background-color:navy;color:white;}
</style>
<div>counter: {{counter}} (limit:{{limit}})</div>`
export class IcoCounter extends Element {
    static get template(){ 
        return htmlTemplate
    } 
    static get properties() {
        return {
            limit:{ type:Number, value:10, notify:true, observer:'reset'},
            counter:{ type:Number, value:10, reflectToAttribute:true}
        }
    }

    connectedCallback(){
        super.connectedCallback();
        this.interval = setInterval(() => {
            this.counter++, 1000;
            if (this.counter >= this.limit) { 
                this._limitReached();
                this.counter = 0;
            }
        }, 1000);    
    }

    disconnectedCallback(){
        super.disconnectedCallback();
        if (this.interval)
            clearInterval(this.interval);
    }

    _limitReached() {
        this.dispatchEvent(new CustomEvent("limit-reached", { bubbles:true, composed:true}));
    }

    reset() {
        this.dispatchEvent(new CustomEvent("reset", { bubbles:true, composed:true}));
        this.counter = 0;
    }

}

customElements.define('ico-counter', IcoCounter);