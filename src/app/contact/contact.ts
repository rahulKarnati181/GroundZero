import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import * as emailjs from '@emailjs/browser';

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
    {
      city: 'Hyderabad',
      line1: 'Gachibowli, Financial District',
      line2: '500032',
      phone: this.hotline,
      email: this.mailto
    }
  ];

  // form model (same fields as in HTML)
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

  // EmailJS config – put your real IDs here
  private serviceID = 'ser';
  private templateID = 'te';
  private publicKey  = '7sG';

  loading = false;
  submitted = false;
  errorMsg = '';

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
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

  async submit(form: NgForm): Promise<void> {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.submitted = false;
    this.errorMsg = '';

    try {
      await emailjs.send(
        this.serviceID,
        this.templateID,
        {
          from_name: this.model.name,
          from_email: this.model.email,
          phone: this.model.phone,
          board: this.model.board,
          interest: this.model.interest,
          preferred_contact: this.model.preferredContact,
          best_time: this.model.time,
          notes: this.model.notes,
          consent: this.model.consent ? 'Yes' : 'No'
        },
        this.publicKey
      );

      this.loading = false;
      this.submitted = true;

      // reset form with sensible defaults
      form.resetForm({
        board: 'CBSE',
        interest: 'Tutoring',
        preferredContact: 'Email',
        time: 'Evening',
        consent: true
      });
    } catch (err) {
      console.error('EmailJS error (contact form):', err);
      this.loading = false;
      this.errorMsg = 'Error sending form. Please try again.';
    }
  }

  telHref(t: string): string {
    return 'tel:' + t.replace(/\s+/g, '');
  }
  mailHref(m: string): string {
    return 'mailto:' + m;
  }
}
