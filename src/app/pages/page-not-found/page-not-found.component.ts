import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    standalone: false
})
export class PageNotFoundComponent implements OnInit {

    public pageNotFound_Title = "Page Not Found";

    public pageNotFound_Content = "Sorry, the page you're trying to find doesn't seem to exist.";

    private pageHeading = viewChild<ElementRef>('pageHeading');

    constructor(private navigationService: NavigationService) { }

    ngOnInit() {
    }

    skipLinksScroll() {
        this.navigationService.scrollTo(this.pageHeading()?.nativeElement)
    }

}
