import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    public _isActiveItemSelected = new BehaviorSubject<boolean>(true);
    isActiveItemSelected$ = this._isActiveItemSelected.asObservable();

    public _clickedItemInfo = new Subject<any>();
    clickedItemInfo$ = this._clickedItemInfo.asObservable();

    constructor() { }

    isActiveItem(data: any) {
        console.log(`what's data? ${data}`);
        this._isActiveItemSelected.next(data.isActive);
    }

    navItemInfo(item: any, clickedId: string) {
        console.log(`From the service, navIemInfo(), 'item' is: ${Object.entries(item)}`);
        console.log(`Also in the service, is this the active link? ${item.isActive}`);
        item.clickedId = clickedId;
        this._clickedItemInfo.next(item);
        // this.isActiveItem(item);
    }

}
