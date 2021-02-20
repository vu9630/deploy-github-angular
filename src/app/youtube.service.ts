import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  token = 'AIzaSyDYiLIwYOIq8XeZLuYw-lP-93xVEMmc5U8';
  numberPerPage = '10';
  searchDebounce = 1000;
  constructor(private http:HttpClient) {

   }
   searchVideo(query:string,sortOrder:string='relevance',pageToken:string,maxResults:string,
  apiToken:string){
     const param:any = {
      key: apiToken,
      q: query,
      part: 'snippet',
      type: 'video',
      order: sortOrder,
    }
    if(pageToken){
      param.pageToken = pageToken
    }
    if(maxResults){
      param.maxResults = maxResults
    }
     return this.http.get('https://www.googleapis.com/youtube/v3/search',{
       params: param
     })
   }
   getVideoDetail(id:string){
     return this.http.get(
      'https://www.googleapis.com/youtube/v3/videos',{
        params:{
          key: 'AIzaSyDYiLIwYOIq8XeZLuYw-lP-93xVEMmc5U8',
          part: 'snippet,statistics',
          id: id,
        }
      }
     )
   }
}
