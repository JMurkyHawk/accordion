import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    public pageNotFound_Title = "Page Not Found";

    public pageNotFound_Content = "Sorry, the page you're trying to find doesn't seem to exist.";

    @ViewChild('pageHeading', {static: false}) pageHeading!: ElementRef;

    constructor(private navigationService: NavigationService) { }

    ngOnInit() {
    }

    skipLinksScroll() {
        this.navigationService.scrollTo(this.pageHeading.nativeElement)
    }

}
