export class List {
    constructor(
        public _id: number = Math.floor(Math.random() * 100),
        public title: string = "",
        public item: string = "",
        public editable: boolean = false,
    ){

    }
}
