import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {shareReplay} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LazyImageService {

	constructor(private readonly http: HttpClient) {
	}

	downloadImage(src: string): Observable<any> {
		return this.http.get(src, {
            responseType: 'blob',
            params: {
                skipAppendUrl: 'true'
            }
        }).pipe(
			shareReplay(1)
		);
	}
}
