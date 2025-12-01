import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as emailjs from '@emailjs/browser';

type Mode = 'Online' | 'Home' | 'Both';

interface NeedCard {
  title: string;
  grades: string;
  subjectKey: string;
  mode: Mode;
  h: number; // hue for the colorful cards
}

interface ErrorBag {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  subjects?: string;
  boards?: string;
  mode?: string;
  years?: string;
  consent?: string;
  form?: string;
}

interface ApplyForm {
  name: string;
  phone: string;
  email: string;
  city: string;
  subjects: Set<string>;
  boards: Set<string>;
  mode: Mode | '';
  years: number | null;
  resume: File | null;
  consent: boolean;
}
@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutor.html',
  styleUrls: ['./tutor.css']
})
export class TutorComponent {
  // modal state
  needHues: number[] = [272, 208, 228, 196, 312];

  isApplyOpen = false;

  // options rendered in the template
  subjects = ['Maths', 'Science', 'Physics', 'Chemistry', 'English'] as const;
  boards   = ['CBSE', 'ICSE', 'IGCSE', 'IB', 'State'] as const;
  modes: Mode[] = ['Online', 'Home', 'Both'];

  // “Subjects & Modes We Need” cards
  needCards: NeedCard[] = [
    { title: 'Maths — Grades 6–12',     grades: 'Grades 6–12', subjectKey: 'Maths',     mode: 'Both',   h: 270 },
    { title: 'Science — Grades 6–10',   grades: 'Grades 6–10', subjectKey: 'Science',   mode: 'Both',   h: 200 },
    { title: 'Physics — Grades 11–12',  grades: 'Grades 11–12',subjectKey: 'Physics',   mode: 'Online', h: 220 },
    { title: 'Chemistry — Grades 11–12',grades: 'Grades 11–12',subjectKey: 'Chemistry', mode: 'Home',   h: 190 },
    { title: 'English — Grades 6–10',   grades: 'Grades 6–10', subjectKey: 'English',   mode: 'Both',   h: 310 },
  ];

  // form model
  form: ApplyForm = {
    name: '',
    phone: '',
    email: '',
    city: '',
    subjects: new Set<string>(),
    boards: new Set<string>(),
    mode: '',
    years: null,
    resume: null,
    consent: false
  };

  // inline error messages
  errors: ErrorBag = {};

  // EmailJS config for tutor applications
  private serviceID = 'serv';       // your tutor service ID
  private templateID = 'temp';     // your tutor template ID
  private publicKey  = '7sG';     // same public key as other forms

  /* ---------- Modal controls ---------- */
  openApply(): void { this.isApplyOpen = true; }
  closeApply(): void { this.isApplyOpen = false; }
  onOverlayClick(): void { this.closeApply(); }

  /* ---------- Chip helpers (subjects/boards) ---------- */
  isSelected(group: 'subjects' | 'boards', value: string): boolean {
    return (this.form[group] as Set<string>).has(value);
  }
  toggleChip(group: 'subjects' | 'boards', value: string, _ev?: Event): void {
    const set = this.form[group] as Set<string>;
    set.has(value) ? set.delete(value) : set.add(value);
  }

  /* ---------- Quick apply from “Need” cards ---------- */
  quickApply(subjectKey: string): void {
    this.openApply();
    if ((this.subjects as readonly string[]).includes(subjectKey)) {
      this.form.subjects.add(subjectKey);
    }
  }

  /* ---------- File input ---------- */
  onFile(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    this.form.resume = input.files && input.files[0] ? input.files[0] : null;
  }

  /* ---------- Submit + validation + EmailJS ---------- */
  async submit(ev: Event): Promise<void> {
    ev.preventDefault();
    this.errors = this.validate();
    if (Object.keys(this.errors).length) {
      return;
    }

    const payload = {
      name: this.form.name,
      phone: this.form.phone,
      email: this.form.email,
      city: this.form.city,
      subjects: Array.from(this.form.subjects).join(', '),
      boards: Array.from(this.form.boards).join(', '),
      mode: this.form.mode,
      years: this.form.years ?? '',
      consent: this.form.consent ? 'Yes' : 'No',
      resume_name: this.form.resume ? this.form.resume.name : 'Not attached'
    };

    try {
      await emailjs.send(
        this.serviceID,
        this.templateID,
        payload,
        this.publicKey
      );

      console.log('Tutor application sent:', payload);
      this.resetForm();
      this.closeApply();
      alert('Application submitted');
    } catch (err) {
      console.error('EmailJS tutor error:', err);
      this.errors.form = 'Error sending application. Please try again.';
    }
  }

  private resetForm(): void {
    this.form = {
      name: '',
      phone: '',
      email: '',
      city: '',
      subjects: new Set<string>(),
      boards: new Set<string>(),
      mode: '',
      years: null,
      resume: null,
      consent: false
    };
    this.errors = {};
  }

  private validate(): ErrorBag {
    const e: ErrorBag = {};
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email || '');
    const phoneOK = /^\d{10}$/.test(this.form.phone || '');

    if (!this.form.name.trim()) e.name = 'Required';
    if (!phoneOK) e.phone = 'Enter a 10-digit number';
    if (!emailOK) e.email = 'Enter a valid email';
    if (!this.form.city.trim()) e.city = 'Required';
    if (this.form.subjects.size === 0) e.subjects = 'Select at least one subject';
    if (this.form.boards.size === 0) e.boards = 'Select at least one board';
    if (!this.form.mode) e.mode = 'Choose a mode';

    if (this.form.years === null || this.form.years === undefined) {
      e.years = 'Enter total experience';
    } else if (Number(this.form.years) < 0) {
      e.years = 'Must be 0 or more';
    }

    if (!this.form.consent) e.consent = 'You must accept to proceed';
    return e;
  }
}
