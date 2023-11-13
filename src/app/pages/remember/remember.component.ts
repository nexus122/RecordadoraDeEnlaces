import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listService } from '@auth/service/listService';
import { supabaseDataBaseService } from '@auth/service/supabaseDataBaseService';

@Component({
  selector: 'app-home',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.scss']
})
export class RememberComponent implements OnInit {
  constructor(
    public readonly listService: listService
  ) { }

  ngOnInit(): void {
    this.listService.updateList();
  }
}
