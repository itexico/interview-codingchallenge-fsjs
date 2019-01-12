export class List {
    constructor(
        public _id: number = Math.floor(Math.random() * 40),
        public title: string = "",
        public item: string = "",
        public editable: boolean = false,
    ){

    }
}
