import { BaseModel } from 'sjs-base-model';

export default class Country extends BaseModel {

    name = "";
    nativeName = "";
    alpha2Code = "";
    alpha3Code = ""; 
    flag = "";
    iconFlag = "";

    constructor(data) {
        super();
        this.update(data);
    }
}
