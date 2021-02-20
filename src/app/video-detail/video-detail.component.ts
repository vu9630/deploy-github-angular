import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Item } from '../youtube.model';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  url: any;
  details: Item;

  constructor(@Inject(MAT_DIALOG_DATA) data, private sanitizer: DomSanitizer) {
    this.url = sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${data.id}`)
    this.details = data.details
  }

  ngOnInit(): void {
  }

}
