import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listService } from '@auth/service/listService';
import { supabaseDataBaseService } from '@auth/service/supabaseDataBaseService';

@Component({
  selector: 'app-add-links',
  templateUrl: './add-links.component.html',
  styleUrls: ['./add-links.component.scss']
})
export class AddLinksComponent implements OnInit {
  recordadoraForm!: FormGroup; // Formulario para empezar a guardarlos.
  constructor(private readonly fb: FormBuilder,
    private readonly supabaseClient: supabaseDataBaseService,
    private readonly listService:listService) { }
    public formErrors = false;

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    if (this.recordadoraForm.valid) {
      const value = this.recordadoraForm.value;
      await this.supabaseClient.addData(value);
      this.initForm();
      this.listService.updateList();
      this.formErrors = false;
    } else {
      this.formErrors = true;
    }
  }

  private initForm(): void {
    this.recordadoraForm = this.fb.group({
      name: ['', Validators.required],
      link: ['', Validators.required],
      type: [''],
    })
  }

}
