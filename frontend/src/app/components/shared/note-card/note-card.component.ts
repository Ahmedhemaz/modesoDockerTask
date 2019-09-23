import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteModel } from '../models/note.model';
import { NoteService } from 'src/app/note/note-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  providers: [NoteModel]
})
export class NoteCardComponent implements OnInit {

  @Input('note') note: NoteModel;
  @Input('diffBtn') diffBtn:string;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() diffBtnEmmiter: EventEmitter<any> = new EventEmitter();
  private onClickStyle: string;


  constructor(private authService: AuthService, private router: Router) {
                this.onClickStyle = 'content';
              }

  ngOnInit() {}

  onDelete(noteId: number) {
    this.delete.emit(noteId);
  }

  showFullContent() {
    this.onClickStyle = this.onClickStyle === 'content' ? 'content-on-click' : 'content';
  }

  onEditButton() {
    this.router.navigate(['/note', this.note.id, 'edit']);
  }

  onDiffButton() {
    this.diffBtnEmmiter.emit(this.note.id);
  }
}
