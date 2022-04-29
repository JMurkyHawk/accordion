import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    public pageNotFound_Title = "Page Not Found";

    public pageNotFound_Content = "That page doesn't seem to exist.";

    constructor() { }

    ngOnInit() {
    }

}
