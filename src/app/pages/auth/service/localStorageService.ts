import { Injectable } from "@angular/core";
import { USER_STORAGE_KEY } from "src/environments/environment"

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    private user:string;
    constructor(){
        this.user = localStorage.getItem(USER_STORAGE_KEY) ?? "";
    }

    getUserID():string{        
        let parseUser:any = JSON.parse(this.user);
        return parseUser?.user?.id ?? "";
    }

}