export class Category{
    constructor(
        public id: number,
        public title: string,
        public user : any
    ){
        this.id = id;
        this.title = title;
        this.user = user;
    }
}

export class Task{
    constructor(
        public id: number,
        public description: string,
        public completed: boolean,
        public category: number
    ){
        this.id = id;
        this.description = description;
        this.completed = completed;
        this.category = category
    }
    
}