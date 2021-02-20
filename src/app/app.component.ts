import {
  Component
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  PageEvent
} from '@angular/material/paginator';
import {
  Observable,
  of,
  Subject,
  timer
} from 'rxjs';
import {
  VideoDetailComponent
} from './video-detail/video-detail.component';
import {
  Item,
  SearchResponse,
  VideoDetailResponse
} from './youtube.model';
import {
  YoutubeService
} from './youtube.service';
import {
  scan, switchMap, map, tap, debounceTime, filter, debounce, catchError, repeat, retryWhen, retry
} from 'rxjs/operators'
import { SettingComponent } from './setting/setting.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui';
  videos: Observable<Item[]>;
  loading = false;
  sortOrder = ['date', 'rating', 'relevance', 'viewCount', 'title']
  selected = 'relevance'
  query: string;
  nextToken: string;
  prevToken: string;
  subject = new Subject()
  debounceValue = 1000;
  constructor(private youtubeService: YoutubeService, private dialogService: MatDialog) {
    this.videos = this.subject.asObservable().pipe(
      scan((acc, current:any) => {

        console.log(acc, current)
        return {...acc,...current};
      }, {
        query: '',
        sortOrder: 'relevance',
        direction: 1
      }),debounce(()=>timer(this.debounceValue)),
      filter((data)=>data.query != ''),
      switchMap(({query, sortOrder, direction,maxResult,apiToken})=>
      this.youtubeService.searchVideo(query, sortOrder, direction > 0 ? this.nextToken : this.prevToken,maxResult,
        apiToken)),retry(2), //repeat()
      tap((data: SearchResponse) => {

        this.nextToken = data.nextPageToken;
        this.prevToken = data.prevPageToken;
        console.log(this.nextToken)
      }),
      map((data: SearchResponse) => data.items)
    )//.subscribe(data => console.log(data))
  }


  searchVideo(query: string) {
    this.subject.next({
      query: query
    })
    // this.query =query
    // this.youtubeService.searchVideo(query,this.selected,this.nextToken).subscribe((data: SearchResponse) => {
    //   this.videos = data.items
    //   this.nextToken = data.nextPageToken;
    //   this.prevToken = data?.prevPageToken
    // })
  }

  viewDetail(id: string) {
    this.loading = true;
    this.youtubeService.getVideoDetail(id).subscribe((data: VideoDetailResponse) => {
      this.loading = false;
      this.dialogService.open(VideoDetailComponent, {
        width: '80%',
        height: '80vh',
        data: {
          id: id,
          details: data.items[0]
        }
      })
    })
  }
  selectSortOrder(event) {
    this.nextToken=undefined;
    this.prevToken=undefined;
    this.debounceValue = 2000;
    this.subject.next({
      sortOrder: event.value,
    })
    // this.selected = event.value;
    // this.nextToken = undefined
    // this.youtubeService.searchVideo(this.query,event.value,this.nextToken).subscribe((data: SearchResponse) => {
    //   this.videos = data.items
    //   this.nextToken = data.nextPageToken;
    //   this.prevToken = data?.prevPageToken
    // })
  }

  pageChange(event: PageEvent) {
    console.log(event)
    this.subject.next({
      direction: event.pageIndex - event.previousPageIndex
    })
    // this.youtubeService.searchVideo(this.query,this.selected,
    //   event.pageIndex - event.previousPageIndex > 0 ? this.nextToken : this.prevToken).subscribe((data: SearchResponse) => {
    //   this.videos = data.items
    //   this.nextToken = data.nextPageToken;
    //   this.prevToken = data?.prevPageToken
    // })
  }
  openSetting(){
   const dialogRef = this.dialogService.open(SettingComponent,{
      width:'40%',
      data : {
        numberPerPage: this.youtubeService.numberPerPage,
        searchDebounce : this.youtubeService.searchDebounce,
        apiToken : this.youtubeService.token
      }
    })
    dialogRef.afterClosed().subscribe(data=>{
      this.subject.next({
        maxResult : data.numberPerPage,
        apiToken: data.apiToken
      })
      this.debounceValue = Number(data.searchDebounce)
    })
  }
}
