export class Category{
    constructor(
        public id: number,
        public title: string,
        ){}
}

export class Todo{
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