import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type HeroStat = {
  label: string;
  value: string;
  helper: string;
};

type Offering = {
  title: string;
  grades: string;
  format: string;
  description: string;
  accent: string;
};

type DeliveryMode = {
  title: string;
  summary: string;
  bullets: string[];
};

type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

type Faq = {
  question: string;
  answer: string;
};

/* NEW: pricing types */
type DurationOption = {
  id: string;
  label: string;
  months: number;
  note: string;
  multiplier: number; // discount vs base
};

type TrackPlan = {
  id: string;
  name: string;
  tag: string;
  badge?: string;
  description: string;
  baseMonthly: number; // 3-month reference price
  accent: string;
  features: string[];
};

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class ServicesComponent {
  heroStats: HeroStat[] = [
    { label: 'Learners coached', value: '5,600+', helper: 'Across CBSE, ICSE, IGCSE and IB' },
    { label: 'Subject experts', value: '280+', helper: 'Maths, Science, Languages and Humanities' },
    { label: 'Parent NPS', value: '+72', helper: 'Quarterly survey score' }
  ];

  offerings: Offering[] = [
  {
    title: 'Middle & High School Foundation',
    grades: 'Classes 6-10',
    format: '1-to-1 & small-group · all subjects',
    description:
      'Board-aligned support for Classes 6-10 across CBSE, ICSE, State and IB. We repair gaps from earlier grades, keep pace with school, and build exam habits through weekly practice and doubt clearing.',
    accent: 'linear-gradient(135deg, #fdf3ff, #f7e6ff)'
  },
  {
    title: 'Senior School Board Track',
    grades: 'Classes 11-12',
    format: '1-to-1 & group · streams and boards',
    description:
      'Stream-wise mentoring for Science, Commerce and Humanities across CBSE, ICSE, State and IB. Strong focus on board blueprints, long-answer writing, numericals and revision cycles around school tests.',
    accent: 'linear-gradient(135deg, #ecf5ff, #e0f0ff)'
  },
  {
    title: 'Competitive Exam Studio',
    grades: 'JEE · NEET · SAT · CUET',
    format: 'Boards + entrance prep',
    description:
      'Problem solving labs layered on top of board work. High-yield question sets, timed mocks and analysis for JEE, NEET, SAT and CUET, with structured doubt windows and exam-temperament coaching.',
    accent: 'linear-gradient(135deg, #f3f4ff, #e4e7ff)'
  }
];


  deliveryModes: DeliveryMode[] = [
    {
      title: 'Live 1-to-1 Online Tutoring',
      summary: 'Solo lessons for deep focus and personalised pacing.',
      bullets: [
        'Single-student sessions aligned to school syllabus and boards',
        'Weekly learning plans and recap notes shared with parents',
        'Ideal for learners who need structured accountability'
      ]
    },
    {
      title: 'Small-group Online Classes',
      summary: '2–6 learner pods for peer energy at lighter price points.',
      bullets: [
        'Board-wise batches for Classes 10–12 across CBSE, ICSE, State and IB',
        'Concept revisions, exam marathons and strategy sessions',
        'Recording access plus shared question banks and practice sets'
      ]
    }
  ];

  process: ProcessStep[] = [
    { step: '01', title: 'Learning audit', body: '45 minute discovery covering academics, study habits and goals.' },
    { step: '02', title: 'Personalized pathway', body: 'Academic strategists co-create an 8 week sprint with milestones.' },
    { step: '03', title: 'Mentor pairing', body: 'We shortlist certified tutors that match the student profile and boards.' },
    { step: '04', title: 'Review loops', body: 'Biweekly progress reports with actionable next steps for family and school.' }
  ];

  faqs: Faq[] = [
    {
      question: 'Do you match the school syllabus?',
      answer: 'Yes. Each pathway is anchored to the learner’s board, textbooks and upcoming assessments.'
    },
    {
      question: 'Can we switch between 1:1 and pods?',
      answer: 'Families can toggle between modes every cycle based on comfort and outcomes.'
    },
    {
      question: 'How soon can we start?',
      answer: 'Onboarding takes 3–5 business days once the learning audit and mentor pairing is completed.'
    }
  ];

  /* ---------- PRICING DATA ---------- */

  durations: DurationOption[] = [
    {
      id: '3',
      label: '3 months',
      months: 3,
      note: 'Quick repair, short sprint',
      multiplier: 1 // base reference
    },
    {
      id: '6',
      label: '6 months',
      months: 6,
      note: 'Save ~8% vs 3 months',
      multiplier: 0.92
    },
    {
      id: '12',
      label: '12 months',
      months: 12,
      note: 'Save ~15% vs 3 months',
      multiplier: 0.85
    }
  ];

  selectedDurationId = '6';

  trackPlans: TrackPlan[] = [
    {
      id: 'cbse',
      name: 'CBSE Track',
      tag: 'Classes 6–12',
      badge: 'Most chosen',
      description: 'Aligned to NCERT and school schedule. Strong focus on board pattern and exam papers.',
      baseMonthly: 3800,
      accent: 'linear-gradient(135deg,#fdf3ff,#f7e6ff)',
      features: [
        'All core subjects covered',
        'Weekly tests + paper discussion',
        'Parent review every 4 weeks'
      ]
    },
    {
      id: 'icse',
      name: 'ICSE Track',
      tag: 'Classes 6–12',
      description: 'Depth-first approach for language-heavy ICSE syllabus and long-form answers.',
      baseMonthly: 4000,
      accent: 'linear-gradient(135deg,#ecf5ff,#e0f4ff)',
      features: [
        'Answer-structure coaching',
        'Chapter-wise notebook checks',
        'Extra writing practice support'
      ]
    },
    {
      id: 'ib',
      name: 'IB / IGCSE Track',
      tag: 'Classes 6–12',
      badge: 'Intensive',
      description: 'IB-style questioning, IA guidance and higher-order problem solving with global benchmarks.',
      baseMonthly: 5500,
      accent: 'linear-gradient(135deg,#fef7ec,#ffe9d9)',
      features: [
        'HL / SL friendly pacing',
        'IA and portfolio checkpoints',
        'Rubric-based feedback on work'
      ]
    },
    {
      id: 'state',
      name: 'State Board Track',
      tag: 'All States',
      description: 'Mapped to state textbooks with emphasis on scoring patterns and diagrams.',
      baseMonthly: 3200,
      accent: 'linear-gradient(135deg,#edfdf7,#daffef)',
      features: [
        'Syllabus-complete module plan',
        'Diagram and definition drills',
        'Extra prep for language papers'
      ]
    },
    {
      id: 'competitive',
      name: 'Competitive Prep Add-on',
      tag: 'JEE · NEET · SAT',
      description: 'Problem-solving layer on top of boards for entrance-focused learners.',
      baseMonthly: 4800,
      accent: 'linear-gradient(135deg,#f3f4ff,#e4e7ff)',
      features: [
        'High-yield question sets',
        'Timed practice sessions',
        'Weekly doubt clearing window'
      ]
    }
  ];

  getCurrentDuration(): DurationOption {
    return this.durations.find(d => d.id === this.selectedDurationId) as DurationOption;
  }

  getMonthlyPrice(plan: TrackPlan): number {
    const duration = this.getCurrentDuration();
    return Math.round(plan.baseMonthly * duration.multiplier);
  }

  getTotalPrice(plan: TrackPlan): number {
    const duration = this.getCurrentDuration();
    return this.getMonthlyPrice(plan) * duration.months;
  }
onDurationChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedDurationId = target.value;
}
 
}
