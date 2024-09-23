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
        this._isActiveItemSelected.next(data.isActive);
    }

    navItemInfo(item: any, clickedId: string) {
        item.clickedId = clickedId;
        this._clickedItemInfo.next(item);
    }

}
