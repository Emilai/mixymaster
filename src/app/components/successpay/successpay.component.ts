import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-successpay',
  templateUrl: './successpay.component.html',
  styleUrls: ['./successpay.component.css']
})
export class SuccesspayComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll();
  }

}
