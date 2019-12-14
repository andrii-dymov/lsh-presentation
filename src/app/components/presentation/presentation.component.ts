import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const SLIDES = [
  'intro',
  'family',
  'algorithm',
  'minhash',
  'buckets',
  'complexity',
  'demo',
  'references',
];

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
})
export class PresentationComponent implements OnInit, OnDestroy {
  prevSlide: string;
  currSlide: string;
  nextSlide: string;
  currIndex: number;

  private subscriptions: Subscription;

  @HostListener('document:keyup', ['$event']) keyup(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;
    switch (keyCode) {
      case LEFT_ARROW:
        this.router.navigate([`slides/${this.prevSlide}`]);
        return;
      case RIGHT_ARROW:
        this.router.navigate([`slides/${this.nextSlide}`]);
        return;
    }
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.updateLinks();
    this.subscriptions.add(
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => this.updateLinks())
    );
  }

  private updateLinks() {
    if (!this.route.firstChild) {
      return;
    }
    this.currSlide = this.route.firstChild.routeConfig.path;
    const currSlideIndex = SLIDES.indexOf(this.currSlide);
    this.prevSlide = SLIDES[currSlideIndex - 1] || SLIDES[SLIDES.length - 1];
    this.nextSlide = SLIDES[currSlideIndex + 1] || SLIDES[0];
    this.currIndex = currSlideIndex + 1;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
