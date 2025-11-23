import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

type LocationCard = {
  city: string;
  line1: string;
  line2?: string;
  phone?: string;
  email?: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  // quick links & locations
  hotline = '+91 98 765 43210';
  mailto = 'hello@groundzero.edu';
  whatsapp = 'https://wa.me/919876543210';

  locations: LocationCard[] = [
   
    { city: 'Hyderabad', line1: 'Gachibowli, Financial District', line2: '500032', phone: this.hotline, email: this.mailto },
   
  ];

  // form model
model = {
  name: '',
  email: '',
  phone: '',
  board: 'CBSE',
  interest: 'Tutoring',
  preferredContact: 'Email',
  time: 'Evening',
  notes: '',
  consent: true
};


  loading = false;
  submitted = false;

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;

    // reveal-on-scroll
    const io = new IntersectionObserver(
      es => {
        for (const e of es) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.15 }
    );
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(n => io.observe(n));
  }

  scrollToForm(): void {
    const node = this.el.nativeElement.querySelector('#enquiry');
    node?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  submit(form: NgForm): void {
    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }
    this.loading = true;

    // simulate send
    setTimeout(() => {
      this.loading = false;
      this.submitted = true;

      // dev/log
      console.log('Contact submission:', this.model);
    }, 900);
  }

  // basic helpers
  telHref(t: string): string { return 'tel:' + t.replace(/\s+/g, ''); }
  mailHref(m: string): string { return 'mailto:' + m; }
}
