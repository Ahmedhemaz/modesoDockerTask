import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {NoteService} from './note-service';
import {Injectable} from '@angular/core';

@Injectable()
export class NoteResolverService implements Resolve<any> {
  constructor(private  noteService: NoteService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.noteService.fetchNoteById(+route.params['id']);
  }
}
