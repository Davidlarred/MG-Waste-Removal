import { Component, ElementRef, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/Auth/Services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../modules/Auth/models/user.model';

interface DumpsterOption {
  name: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatBadgeModule,
    MatMenuModule,
    CommonModule,
  ],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.25s ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.25s ease', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeaderComponent {
  languages = ['US-English', 'US-Spanish'];
  navigationItems = [
    {
      title: 'Dumpster Sizes',
      options: [
        {
          header: 'Dumpster Sizes Available',
          name: '10 Yard Hook-Lift Dumpster (for solid concrete)',
          imageUrl: '../../../assets/images/6.svg',
          description: 'Description for Small Dumpster',
        },
        {
          name: '10 Yard Hook-Lift Dumpster (for general waste)',
          imageUrl: '../../../assets/images/6.svg',
          description: 'Description for Medium Dumpster',
        },
        {
          name: '15 Yard Hook-Lift Dumpster (for general waste)',
          imageUrl: '../../../assets/images/6.svg',
          description: 'Description for Large Dumpster',
        },
        {
          name: '20 Yard Hook-Lift Dumpster (for general waste)',
          imageUrl: '../../../assets/images/6.svg',
          description: 'Description for Extra Large Dumpster',
        },
      ],
    },
    {
      title: 'Dumpster Compactor Service',
      options: [
        {
          header: 'Waste Crusher',
          name: 'Dumpster Compactor ',
          image: 'small-dumpster.jpg',
          description: 'Description for Small Dumpster',
        },
      ],
    },
    {
      title: 'Areas We Serve',
      options: [
        {
          name: 'Miami Dade ',
          image: 'small-dumpster.jpg',
          description: 'Description for Small Dumpster',
        },
        {
          name: 'Medium Dumpster',
        },
        {
          name: 'Large Dumpster',
        },
        {
          name: 'Extra Large Dumpster',
        },
      ],
    },
    {
      title: 'About',
    },
    {
      title: 'Support',
    },
  ];

  user$: Observable<User | null>;
  selectedLanguage: string = this.languages[0];
  activeOptions: any[] = [];
  isDropdownOpen = false;
  activeSubElemnt: DumpsterOption[] = [];
  activeElements?: DumpsterOption;
  activeMenuElement = true;
  activeItem: any;
  menuone = false;
  menutwo = false;
  menuthree = false;
  menu = false;
  activeSection: string | null = null;
  isClassActive: boolean = false;

  constructor(private eRef: ElementRef, private router: Router, private authService:AuthService) {
    this.user$ = this.authService.getCurrentUser();
   
    
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    // Close dropdown if clicked outside
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeDropdown(); 
    }

    // Logic to hide the login window if clicked outside
    if (
      !event.target.closest('article') &&
      !event.target.closest('button.loginbtn')
    ) {
      this.isClassActive = false;
    }
  }

  toggleDropdown() {
    // Toggle the state of the dropdown
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(language: string) {
    // Set the selected language and close dropdown
    this.selectedLanguage = language;
    this.closeDropdown();
  }

  closeDropdown() {
    // Close the dropdown
    this.isDropdownOpen = false;
  }

  setActiveContent(title: string): void {
    // Set active content based on the title
    const item = this.navigationItems.find((item) => item.title === title);
    this.activeOptions = item?.options ?? [];
    this.activeItem = title === 'About' || title === 'Support' ? null : item;
    this.activeSection = title;
    this.menu = false;
  }

  clearActiveContent(): void {
    // Clear the active content
    this.activeOptions = []; 
    this.activeItem = null;
  }

  checkMouseLeave(event: MouseEvent): void {
    const contentDisplayElement =
      this.eRef.nativeElement.querySelector('.content-display');
    if (
      !contentDisplayElement ||
      !contentDisplayElement.contains(event.relatedTarget)
    ) {
      this.clearActiveContent();
    }
  }

  setActiveDumpster(option: DumpsterOption): void {
    // Set active elements and reset menu states
    this.activeElements = option;
    this.menu = true;
    this.activeSection = null;
  }

  toggleClass() {
    this.isClassActive = !this.isClassActive;
  }

  navigateTo(path: string): void {
    this.isClassActive = false;

    this.router.navigate([path]);
  }
}
