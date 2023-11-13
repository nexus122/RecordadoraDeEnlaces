import { Component, Input } from '@angular/core';
import { listService } from '@auth/service/listService';
import { supabaseDataBaseService } from '@auth/service/supabaseDataBaseService';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() recordadoraList!: any;
  searchTerm: string = "";
  constructor(
    private listService: listService
    ) { }

  async deleteLink(linkID: any) {
    this.listService.deleteLink(linkID);
  }

  async search() {
    if(this.searchTerm == "") this.recordadoraList = this.listService.getList();
    else this.recordadoraList = await this.recordadoraList.filter((link: any) => link.name.includes(this.searchTerm));
  }

  async orderAlphabetical() {
    this.recordadoraList = await this.recordadoraList.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  async orderDate() {
    this.recordadoraList = await this.recordadoraList.sort((a: any, b: any) => a.created_at.localeCompare(b.created_at));
  }

}
