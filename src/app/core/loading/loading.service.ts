 import { Injectable } from '@angular/core';
 import { BehaviorSubject } from 'rxjs';
// import { BlockUIService } from 'ng-block-ui';


 @Injectable({
   providedIn: 'root'
 })
 export class LoadingService {
   private isLoading = new BehaviorSubject(false);

   get isLoading$() {
     return this.isLoading.asObservable();
   }

//   constructor(private blockUIService: BlockUIService) {}
   constructor() {}

   toggleLoading() {
//     if (!this.blockUIService.isActive('app')) {
//       this.blockUIService.start('app');
//       this.isLoading.next(true);
//     } else {
//       this.blockUIService.stop('app');
//       this.isLoading.next(false);
//     }
   }

   tryToStartLoading() {
//     if (this.blockUIService.isActive('app')) {
//       return;
//     }
//
//     this.blockUIService.start('app');
//     this.isLoading.next(true);
   }

   tryToStopLoading() {
//     if (!this.blockUIService.isActive('app')) {
//       return;
//     }
//
//     this.blockUIService.stop('app');
//     this.isLoading.next(false);
   }
 }
