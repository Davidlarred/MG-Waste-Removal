import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    SlickCarouselModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  isDropdownOpen: number | null = null;

  @ViewChild('dropdownContainer1') dropdownContainer1?: ElementRef;
  @ViewChild('dropdownContainer2') dropdownContainer2?: ElementRef;

  toggleDropdown(dropdownId: number) {
    this.isDropdownOpen =
      this.isDropdownOpen === dropdownId ? null : dropdownId;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.isInsideDropdown(event, 1) && !this.isInsideDropdown(event, 2)) {
      this.isDropdownOpen = null;
    }
  }

  private isInsideDropdown(event: MouseEvent, dropdownId: number): boolean {
    const dropdownContainer =
      dropdownId === 1 ? this.dropdownContainer1 : this.dropdownContainer2;
    return dropdownContainer?.nativeElement.contains(event.target) ?? false;
  }

  slides = [
    { img: '../../../assets/images/WhatsApp Image 2023-09-10 at 3.10.39 PM.jpeg' },
    { img: '../../../assets/images/WhatsApp Image 2023-09-10 at 3.10.39 PM.jpeg' },
    { img: '../../../assets/images/WhatsApp Image 2023-09-10 at 3.10.39 PM.jpeg' },
    { img: '../../../assets/images/WhatsApp Image 2023-09-10 at 3.10.39 PM.jpeg' },
  ];

  slideConfig = { slidesToShow: 1, slidesToScroll: 1, arrows: true, fade: true};
}
