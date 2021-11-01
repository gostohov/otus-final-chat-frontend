import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';

export interface CachedImage {
    url: string;
    resource: any;
}

@Injectable({
	providedIn: 'root'
})
export class LazyImageService {
    private _storage: CachedImage[] = [];

	constructor(private readonly http: HttpClient) {
	}

	downloadImage(src: string): Observable<any> {
        const resource = this.getFromCache(src);
        if (resource) {
            return of(resource.resource);
        }

		return this.http.get(src, {
            responseType: 'blob',
            params: {
                skipAppendUrl: 'true'
            }
        }).pipe(
            tap(resource => this.saveToCache(src, resource)),
            shareReplay(1)
		);
	}

    saveToCache(url: string, resource: any) {
        this._storage.push({ url, resource });
    }

    getFromCache(url: string): CachedImage {
        return this._storage.find(item => item.url === url);
    }
}
