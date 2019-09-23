import {Injectable} from '@angular/core';

@Injectable()
export class NoteModel {
  id: number;
  title: string;
  content: string;
  image: File;
  public: boolean;
  createdAt: Date;
}
