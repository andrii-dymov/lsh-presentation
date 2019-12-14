import { Component, OnInit } from '@angular/core';
import { LshService, IMatch } from '../../../services/lsh.service';
import { texts as defaultTexts } from './default.texts';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  providers: [LshService],
})
export class DemoComponent implements OnInit {
  texts: { id: number, value: string }[] = [];
  matches: IMatch[] = [];
  currentText: { id: number; value: string };

  constructor(private lshService: LshService) {}

  ngOnInit() {
    for (const t of defaultTexts) {
      this.addText(t);
    }
  }

  addText(t: string) {
    const id = this.lshService.insertText(t);
    this.currentText = { id, value: t };
    this.texts.push(this.currentText);
    this.matches = this.lshService.findMatches(id);
  }

  selectText(id: number) {
    this.currentText = this.texts.find(v => v.id === id);
    this.matches = this.lshService.findMatches(id);
  }
}
