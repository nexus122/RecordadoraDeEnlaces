import { Injectable } from "@angular/core";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment"
import { LocalStorageService } from "./localStorageService";

@Injectable({ providedIn: 'root' })
export class supabaseDataBaseService {
    private supabaseClient: SupabaseClient;
    private userID: string;
    constructor(private localStorageService: LocalStorageService) {
        this.supabaseClient = createClient(environment.supabase.url, environment.supabase.publicKey);
        this.userID = localStorageService.getUserID();
    }

    async addData({name, link}:{name:string, link: string}) {
        if (!this.userID) return;
        const insertData = {
            name: name,
            link: link,
            userId: this.userID
        }
        const { data, error } = await this.supabaseClient.from('enlaces').insert(insertData);
        if (error) {
            console.error('Error al añadir el registro:', error.message);
        } else {
            console.log('Registro añadido exitosamente:', data);
        }
    }

    async readData(): Promise<any> {        
        if (!this.localStorageService.getUserID()) return;        
        return await this.supabaseClient.from('enlaces').select('*').eq('userId', this.userID).then((response) => {
            return response.data ?? [];
        })
    }

    async deleteData(id: string) {
        return await this.supabaseClient
            .from('enlaces')
            .delete()
            .eq('id', id)
    }
}