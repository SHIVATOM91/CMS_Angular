import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SeoService extends DataService {
  apiUrl:String =environment.apiUrl;
  constructor(private meta:Meta, http:HttpClient) 
  {
    super(http,'seo')
}

  // getPageMeta(id){
  //   this.generateTags();
  //   return this.http.get(this.apiUrl+"page/meta/"+id, this.token)
  // }

  generateTags(config) {
    console.log( config.title);
    
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@angularfirebase' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `https://instafire-app.firebaseapp.com/${config.slug}` });
  }

}

