import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { catchError, filter, map, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { Game } from "../models/game";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class CockpitService {
  apiUrl = "http://localhost:3000"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  // getTemplates() {
  //   return this.http
  //     .get(`${environment.apiUrl}/gettemplate`)
  //     .pipe(
  //       map(res => res),
  //       catchError(error => this.handleError(error))
  //     );
  // }

  getTemplates() {
    return this.http.get(`${environment.apiUrl}/gettemplates`)
  }

  getCompleted() {
    return this.http.get(`${environment.apiUrl}/getcompletedgame`)
  }

  getActive() {
    return this.http.get(`${environment.apiUrl}/getactivegame`)
  }
  getDeleteGame(scm_game_id: number): Observable<Game> {
    return this.http.delete<Game>(`${environment.apiUrl}/deletegamesetup/` + scm_game_id)
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/deletegamesetup/` + id, this.httpOptions)
  }

  // postUser(user: Game[]): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/addnewgame`)
  // }
  postUser(user): Observable<any> {
    return this.http.post(
      'http://localhost:3000/addnewgame',
      JSON.stringify(user),
      this.httpOptions
    );
  }
  // getActiveGames() {
  //   return this.http
  //     .get(`${environment.apiUrl}/getactivegames`)
  //     .pipe(
  //       map(res => res),
  //       catchError(error => this.handleError(error))
  //     );
  // }


  getAllUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/getgamesetup`)
  }

  getGames() {
    // return this.http
    //   .get(`${environment.apiUrl}/getgames`)
    //   .pipe(
    //     map(res => res),
    //     catchError(error => this.handleError(error))
    //   );
    return this.http.get(`${environment.apiUrl}/getgamesetup`)
  }

  // getTemplateDetails() {
  //   return this.http
  //     .get(`${environment.apiUrl}/gettemplateDetails`)
  //     .pipe(
  //       map(res => res),
  //       catchError(error => this.handleError(error))
  //     );
  // }

  getTemplate() {
    return this.http.get(`${environment.apiUrl}/gettemplates`)
  }


  // getListings(page = 1, data: any) {
  //   return this.http
  //     .get(`${environment.apiUrl}/listings`, {
  //       params: {
  //         page: page.toString(),
  //         ...data
  //       }
  //     })
  //     .pipe(
  //       map(res => res),
  //       catchError(error => this.handleError(error))
  //     );
  // }

  //   getLatestListing() {
  //     return this.http
  //     .get(`${environment.apiUrl}/listings/latest_data`)
  //     .pipe(
  //       map(res => res),
  //       catchError(error => this.handleError(error))
  //     );
  //   }

  //   getListing(listing_id) {
  //     return this.http.get(`${environment.apiUrl}/listings/${listing_id}`).pipe(
  //       map(res => res),
  //       catchError(error => this.handleError(error))
  //     );
  //   }

  //   getCategories() {
  //     return this.http.get(`${environment.apiUrl}/categories`).pipe(
  //       map(res => res),
  //       catchError(error => this.handleError(error))
  //     );
  //   }

  //   getLocations() {
  //     return this.http.get(`${environment.apiUrl}/listings/locations`).pipe(
  //       map(res => res),
  //       catchError(error => this.handleError(error))
  //     );
  //   }

  //   getUserListings(page = 1) {
  //     return this.http
  //       .get(`${environment.apiUrl}/listings/user-listings`, {
  //         params: {
  //           page: page.toString()
  //         }
  //       })
  //       .pipe(
  //         map(res => res),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   searchListing(data: any, page) {
  //     return this.http
  //       .get(`${environment.apiUrl}/listings/search`, {
  //         params: {
  //           page: page.toString(),
  //           ...data
  //         }
  //       })
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   saveListing(listing: Listing) {
  //     const headers = new HttpHeaders();
  //     headers.append("Content-Type", "multipart/form-data");
  //     headers.append("Accept", "application/json");

  //     return this.http
  //       .post(`${environment.apiUrl}/listings`, listing, { headers })
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   updateListing(id: number, listing: Listing) {
  //     const headers = new HttpHeaders();
  //     headers.append("Content-Type", "multipart/form-data");
  //     headers.append("Accept", "application/json");

  //     return this.http
  //       .post(`${environment.apiUrl}/listings/${id}`, listing, { headers })
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   removeListing(id: number) {
  //     return this.http
  //       .delete(`${environment.apiUrl}/listings/${id}`, httpOptions)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }


  //   saveRating(id: number, rating: Review) {
  //     return this.http
  //       .post(`${environment.apiUrl}/listings/${id}/ratings`, rating, httpOptions)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   updateRating(id: number, rating: Review) {
  //     return this.http
  //       .put(`${environment.apiUrl}/ratings/${id}`, rating, httpOptions)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   isBookmarked(id: number) {
  //     return this.http
  //       .get(`${environment.apiUrl}/listings/${id}/is_bookmarked`)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   getBookmarks() {
  //     return this.http
  //       .get(`${environment.apiUrl}/listings/bookmarks/list`)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   addBookmark(id: number) {
  //     return this.http
  //       .post(`${environment.apiUrl}/listings/${id}/bookmarks/add`, {} , httpOptions)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   removeBookmark(id: number) {
  //     return this.http
  //       .delete(`${environment.apiUrl}/listings/${id}/bookmarks/remove`, httpOptions)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   deleteRating(id: number) {
  //     return this.http
  //       .delete(`${environment.apiUrl}/ratings/${id}`, httpOptions)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }

  //   deleteMedia(id: number, listing: number) {
  //     return this.http
  //       .delete(`${environment.apiUrl}/listings/${listing}/remove-file/${id}`, httpOptions)
  //       .pipe(
  //         map((res: any) => {
  //           return res;
  //         }),
  //         catchError(error => this.handleError(error))
  //       );
  //   }


}
