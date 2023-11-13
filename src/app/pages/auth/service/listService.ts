import { Injectable } from "@angular/core";
import { supabaseDataBaseService } from "./supabaseDataBaseService";

@Injectable({ providedIn: 'root' })
export class listService {

    linksList!: any
    constructor(private supabaseClient:supabaseDataBaseService) {}

    getList(){
        return this.linksList;
    }

    async deleteLink(linkID: any){
        await this.supabaseClient.deleteData(linkID);
        this.linksList = this.linksList.filter((link: any) => link.id != linkID)
    }

    updateList() {
        return this.supabaseClient.readData().then((data: any) => {
            this.linksList = data;
            console.log(data);
            return data;
        });
    }

}
