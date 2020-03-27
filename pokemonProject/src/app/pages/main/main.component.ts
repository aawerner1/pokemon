import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  hasScroll: boolean = false;

  constructor() { }

  ngOnInit() {
    window.onscroll = () => {
      window.scrollY == 0 ? this.hasScroll = false : this.hasScroll = true;
    };
  }

  goToTop() {
    window.scrollTo(0,0)
    this.hasScroll = false
  }

}
