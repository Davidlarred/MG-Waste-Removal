import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Title } from '@angular/platform-browser';

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
    {
      img: '../../../assets/images/WhatsApp Image 2023-09-10 at 3.10.39 PM.jpeg',
    },
    {
      img: '../../../assets/images/WhatsApp Image 2023-09-10 at 3.10.39 PM.jpeg',
    },
    {
      img: '../../../assets/images/WhatsApp Image 2023-09-10 at 3.10.39 PM.jpeg',
    },
    {
      img: '../../../assets/images/WhatsApp Image 2023-09-10 at 3.10.39 PM.jpeg',
    },
  ];
  posts = [
    {
      Author: 'John Doe',
      Date: 'September 10, 2023',
      Title:
        '10 Yard Hook-Lift Dumpster for Solid Concrete - Compact and Durable',
      Description:
        "Opt for our 10-yard hook-lift dumpster specifically designed for solid concrete disposal. Compact in size yet durable, it's the ideal solution for your construction cleanup needs. Discover the efficiency of our dumpsters today",
      Image:
        '../../../assets/images/dumpster.png',
      alt: '10 Yard Hook-Lift Dumpster',
    },
    {
      Author: 'John Doe',
      Date: 'September 10, 2023',
      Title:
        '10 Yard Hook-Lift Dumpster for Solid Concrete - Compact and Durable',
      Description:
        "Opt for our 10-yard hook-lift dumpster specifically designed for solid concrete disposal. Compact in size yet durable, it's the ideal solution for your construction cleanup needs. Discover the efficiency of our dumpsters today",
      Image:
        '../../../assets/images/dumpster.png',
      alt: '10 Yard Hook-Lift Dumpster',
    },
    {
      Author: 'John Doe',
      Date: 'September 10, 2023',
      Title:
        '10 Yard Hook-Lift Dumpster for Solid Concrete - Compact and Durable',
      Description:
        "Opt for our 10-yard hook-lift dumpster specifically designed for solid concrete disposal. Compact in size yet durable, it's the ideal solution for your construction cleanup needs. Discover the efficiency of our dumpsters today",
      Image:
        '../../../assets/images/dumpster.png',
      alt: '10 Yard Hook-Lift Dumpster',
    },
    {
      Author: 'John Doe',
      Date: 'September 10, 2023',
      Title:
        '10 Yard Hook-Lift Dumpster for Solid Concrete - Compact and Durable',
      Description:
        "Opt for our 10-yard hook-lift dumpster specifically designed for solid concrete disposal. Compact in size yet durable, it's the ideal solution for your construction cleanup needs. Discover the efficiency of our dumpsters today",
      Image:
        '../../../assets/images/dumpster.png',
      alt: '10 Yard Hook-Lift Dumpster',
    },
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };
  slideTwo = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
  };
  slideThree = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  dumpsters = [
    {
      Title:
        '10 Yard Hook-Lift Dumpster for Solid Concrete - Compact and Durable',
      Description:
        "Opt for our 10-yard hook-lift dumpster specifically designed for solid concrete disposal. Compact in size yet durable, it's the ideal solution for your construction cleanup needs. Discover the efficiency of our dumpsters today",
      Image:
        '../../../assets/images/dumpster.png',
      alt: '10 Yard Hook-Lift Dumpster',
    },
    {
      Title: '10 Yard Hook-Lift Dumpster - Versatile Waste Management',
      Description:
        "Our 10-yard hook-lift dumpster offers a versatile solution for various waste management needs. Whether it's a home renovation or a small construction project, this dumpster size is perfect for efficiently handling waste.",
      Image:
        '../../../assets/images/dumpster.png',
      alt: '10 Yard Hook-Lift Dumpster',
    },
    {
      Title: '15 Yard Hook-Lift Dumpster - Expand Your Cleanup Capacity',
      Description:
        'Increase your waste management capacity with our 15-yard hook-lift dumpster. Ideal for medium-sized projects that require extra space, it delivers convenience and reliability to your cleanup process.',
      Image:
        '../../../assets/images/dumpster.png',
      alt: '15 Yard Hook-Lift Dumpster',
    },
    {
      Title: '20 Yard Hook-Lift Dumpster - Maximum Space for Large Projects',
      Description:
        "Tackle large-scale projects with ease using our 20-yard hook-lift dumpster. Offering maximum space, it's the ultimate choice for large construction sites, extensive renovations, and significant cleanouts.",
      Image:
        '../../../assets/images/dumpster.png',
      alt: '20 Yard Hook-Lift Dumpster',
    },
  ];
}
