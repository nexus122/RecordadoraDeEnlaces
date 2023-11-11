import { Injectable } from "@angular/core";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment"
import { LocalStorageService } from "./localStorageService";

@Injectable({ providedIn: 'root' })
export class rememberService {
    private supabaseClient: SupabaseClient;
    private userID: string;
    constructor(private localStorageService: LocalStorageService) {
        this.supabaseClient = createClient(environment.supabase.url, environment.supabase.publicKey);
        this.userID = localStorageService.getUserID();
    }

    async addToSupabase(values: any) {
        if (!this.userID) return;
        const { name, link } = values;
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

    async readToSupabase(): Promise<any> {
        if (!this.localStorageService.getUserID()) return;
        return await this.supabaseClient.from('enlaces').select('*').eq('userId', this.userID).then((response) => {
            console.log(response.data)
            return response.data ?? [];
        })
    }

    async deleteToSupabase(id: string) {
        return await this.supabaseClient
            .from('enlaces')
            .delete()
            .eq('id', id)
    }
}
