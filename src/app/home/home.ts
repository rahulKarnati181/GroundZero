import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as emailjs from '@emailjs/browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  // hero bits
  boards = ['CBSE', 'ICSE', 'IGCSE', 'IB', 'State'];

  // hero form model
  model = {
    name: '',
    email: '',
    phone: '',
    board: '',
    interest: 'School Tuitions',
    contact: 'Email',
    time: 'Morning',
    details: '',
    consent: true
  };

  // EmailJS config – replace with your real IDs
  private serviceID = 'servi';
  private templateID = 'tempzq';
  private publicKey  = '7sG';

  async submitLead(form: NgForm): Promise<void> {
    if (form.invalid) return;

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
          preferred_contact: this.model.contact,
          best_time: this.model.time,
          details: this.model.details,
          consent: this.model.consent ? 'Yes' : 'No'
        },
        this.publicKey
      );

      alert('Submitted');
      form.resetForm({
        board: '',
        interest: 'School Tuitions',
        contact: 'Email',
        time: 'Morning',
        consent: true
      });
    } catch (err) {
      console.error(err);
      alert('Error sending form');
    }
  }

  // FAQ tabs
  faqTab: 'general' | 'programs' | 'pricing' | 'support' = 'general';

  setFaqTab(tab: 'general' | 'programs' | 'pricing' | 'support'): void {
    this.faqTab = tab;
  }

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;

    const revealIO = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-in');
            revealIO.unobserve(target);
          }
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.15 }
    );

    root
      .querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach(node => revealIO.observe(node));

    const impact = root.querySelector<HTMLElement>('.impact');
    if (impact) {
      const onceImpact = new IntersectionObserver(
        es => {
          if (es.some(e => e.isIntersecting)) {
            this.startCounters(impact);
            onceImpact.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.25 }
      );
      onceImpact.observe(impact);
    }
  }

  private startCounters(container: HTMLElement): void {
    const nodes = Array.from(container.querySelectorAll<HTMLElement>('.num'));
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const force = container.hasAttribute('data-force-animate');

    for (const el of nodes) {
      if (el.dataset['started']) continue;
      el.dataset['started'] = '1';

      const target = Number(el.dataset['count'] ?? '0');
      const suffix = el.dataset['suffix'] ?? '';
      const fmt = el.dataset['format'] ?? '';
      const durAttr = Number(el.dataset['duration'] ?? '0');
      const duration =
        Number.isFinite(durAttr) && durAttr > 0 ? durAttr : this.pickDuration(target);

      if (prefersReduced && !force) {
        el.textContent = this.format(target, fmt) + suffix;
        continue;
      }

      const intervalMs = 33;
      const steps = Math.max(1, Math.round(duration / intervalMs));
      const stepInt = Math.max(1, Math.round(target / steps));

      let current = 0;
      el.textContent = this.format(current, fmt) + suffix;

      const id = window.setInterval(() => {
        current += stepInt;
        if (current >= target) {
          current = target;
          window.clearInterval(id);
        }
        el.textContent = this.format(current, fmt) + suffix;
      }, intervalMs);
    }
  }

  private pickDuration(to: number): number {
    if (to >= 10000) return 3500;
    if (to >= 1000) return 2400;
    return 1800;
  }

  private format(v: number, fmt: string): string {
    const n = Math.round(v);
    return fmt === 'comma' ? n.toLocaleString('en-US') : String(n);
  }
}
