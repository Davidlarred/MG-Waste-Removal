import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-snack',
  templateUrl: './show-snack.component.html',
  styleUrls: ['./show-snack.component.scss']
})
export class ShowSnackComponent implements OnInit {

  text = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit(): void {
    this.text = this.data;
  }

}
