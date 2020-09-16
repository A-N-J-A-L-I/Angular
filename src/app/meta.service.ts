import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta) {
  }

  update(url, title, description, image) {

    console.log(this.meta.getTag(`property='og:url'`));

    // REgular Tags
    this.meta.updateTag({content: description}, `name='description'`);

    // Facebook Tags
    this.meta.updateTag({content: url}, `property='og:url'`);
    this.meta.updateTag({content: title}, `property='og:title'`);
    this.meta.updateTag({content: description}, `property='og:description'`);
    this.meta.updateTag({content: image}, `property='og:image'`);


    // // Twitter Tags
    this.meta.updateTag({content: url}, `name='twitter:site'`);
    this.meta.updateTag({content: title}, `name='twitter:title'`);
    this.meta.updateTag({content: description}, `name='twitter:description'`);
    this.meta.updateTag({content: image}, `name='twitter:image'`);
  }

}
