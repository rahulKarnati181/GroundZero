import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type Teacher = {
  name: string;
  subject: string;
  years: number;
  photo: string;
  boards: string[];
};

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './aboutus.html',
  styleUrls: ['./aboutus.css']
})
export class AboutUsComponent implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  // Educators data (sample)
  teachers: Teacher[] = [
    { name: 'Ms. Asha',  subject: 'Mathematics • Grades 8–12', years: 10, photo: 'assets/board.jpg',      boards: ['CBSE','ICSE','IB'] },
    { name: 'Mr. Rohan', subject: 'Physics • Grades 9–12',      years: 12, photo: 'assets/smallgr.jpg',   boards: ['CBSE','IGCSE'] },
    { name: 'Ms. Nisha', subject: 'Chemistry • Grades 9–12',    years: 11, photo: 'assets/teaching.jpeg', boards: ['ICSE','State'] },
  ];

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;

    // reveal-on-scroll
    const revealIO = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-in');
            revealIO.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.15 }
    );
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(n => revealIO.observe(n));

    // counters: metrics block (if present on About page)
    const metrics = root.querySelector<HTMLElement>('.metrics');
    if (metrics) {
      const onceMetrics = new IntersectionObserver(
        es => {
          if (es.some(e => e.isIntersecting)) {
            this.startCounters(metrics);
            onceMetrics.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.25 }
      );
      onceMetrics.observe(metrics);
    }
  }

  // flip tiles (Mission section)
  toggleFlip(ev: Event): void {
    (ev.currentTarget as HTMLElement).classList.toggle('is-flipped');
  }

  keyFlip(ev: KeyboardEvent): void {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.toggleFlip(ev);
    }
  }

  // counters
  private startCounters(container: HTMLElement): void {
    const nodes = Array.from(container.querySelectorAll<HTMLElement>('.num'));
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const force = container.hasAttribute('data-force-animate');

    for (const el of nodes) {
      if (el.dataset['started']) continue;
      el.dataset['started'] = '1';

      const target = Number(el.dataset['count'] ?? '0');
      const suffix = el.dataset['suffix'] ?? '';
      const fmt    = el.dataset['format'] ?? '';
      const durAttr = Number(el.dataset['duration'] ?? '0');
      const duration = Number.isFinite(durAttr) && durAttr > 0 ? durAttr : this.pickDuration(target);

      if (prefersReduced && !force) {
        el.textContent = this.format(target, fmt) + suffix;
        continue;
      }

      const intervalMs = 33; // ~30fps
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
    if (to >= 1000)  return 2400;
    return 1800;
  }

  private format(v: number, fmt: string): string {
    const n = Math.round(v);
    return fmt === 'comma' ? n.toLocaleString('en-US') : String(n);
  }
}
