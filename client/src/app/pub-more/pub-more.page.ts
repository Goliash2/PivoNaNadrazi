import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pub-more',
  templateUrl: './pub-more.page.html',
  styleUrls: ['./pub-more.page.scss'],
})


export class PubMorePage implements OnInit {
  settings = [
    {
      title: 'Můj účet',
      icon: 'person'
    },
    {
      title: 'Statistiky',
      icon: 'pie-chart'
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}
