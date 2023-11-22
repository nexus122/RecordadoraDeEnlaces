import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { listService } from '@auth/service/listService';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  
  @Input() recordadoraList!: any[];
  manipulatedList: any[] = [];

  searchTerm: string = "";  
  isAlphabeticalAscending: boolean = true;
  isDateAscending: boolean = true;

  constructor(private listService: listService) { }

  ngOnInit() {
    this.updateManipulatedList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recordadoraList']) {
      this.updateManipulatedList();
    }
  }

  async deleteLink(linkID: any) {
    this.listService.deleteLink(linkID);
  }

  search() {
    if (this.searchTerm === "") {
      this.updateManipulatedList();
    } else {
      this.manipulatedList = this.recordadoraList.filter((link: any) => link.name.includes(this.searchTerm));
    }
  }

  orderAlphabetical() {
    this.isAlphabeticalAscending = !this.isAlphabeticalAscending;
    this.manipulatedList = [...this.recordadoraList].sort((a: any, b: any) => {
      if (this.isAlphabeticalAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  orderDate() {
    this.isDateAscending = !this.isDateAscending;
    this.manipulatedList = [...this.recordadoraList].sort((a: any, b: any) => {
      if (this.isDateAscending) {
        return a.created_at.localeCompare(b.created_at);
      } else {
        return b.created_at.localeCompare(a.created_at);
      }
    });
  }

  private updateManipulatedList() {
    if (this.recordadoraList) {
      this.manipulatedList = [...this.recordadoraList].sort((a: any, b: any) => b.created_at.localeCompare(a.created_at));;
    }
  }
}