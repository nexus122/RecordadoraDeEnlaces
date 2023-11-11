import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { rememberService } from '@auth/service/rememberService';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  recordadoraForm!: FormGroup; // Formulario para empezar a guardarlos.
  recordadoraList: any = []; // Lista donde guardaremos los enlaces.

  constructor(
    private readonly fb: FormBuilder,
    private readonly supabaseClient: rememberService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.updateList();
  }

  async onSubmit(): Promise<void> {  
    const value = this.recordadoraForm.value    
    await this.supabaseClient.addToSupabase(value);
    this.updateList();
  }

  async deleteLink(linkID:any) {
    await this.supabaseClient.deleteToSupabase(linkID);
    this.updateList();
  }

  updateList(){
    this.recordadoraList = this.supabaseClient.readToSupabase();
  }
  private initForm(): void {
    this.recordadoraForm = this.fb.group({
      name: ['', Validators.required],
      link: ['', Validators.required]
    })
  }

}
