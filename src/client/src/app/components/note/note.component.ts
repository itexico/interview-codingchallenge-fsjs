import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { List } from '../../models/list';

@Component({
    selector: 'Note',
    templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit {
    @Input('note') note: List;
    @Input('index') index: number;
    @Output() displayModal = new EventEmitter;
    public noteColor: string;
    public status: string;
    public error: string;
    public colors: string[];

    constructor(){
        this.colors = [
            'note--baby-blue',
            'note--grey',
            'note--white',
            'note--orange',
            'note--navy-blue',
            'note--pink',
            'note--purple',
            'note--green'
        ];
    }

    ngOnInit(){
        this.setColorToNote();
    }

    //Causes modal to display when clicked
    onDisplay(){
        this.displayModal.emit(this.note);
    }

    //Selecting a color according to a random number
    setColorToNote(){
        this.index = (this.index > 7) ? 0 : this.index;
        
        this.noteColor = this.colors[this.index];
    }

    //Gets a randon number between min and max
    getRamdomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}