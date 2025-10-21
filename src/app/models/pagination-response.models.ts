
export interface IPaginationResponse {
    last_visible_page: number;
    has_next_page:     boolean;
    current_page:      number;
    items:             Items;
}

export interface Items {
    count:    number;
    total:    number;
    per_page: number;
}


export class Pagination {
    total: number; 
    page: number; 
    items: number; 

    constructor(obj?: IPaginationResponse) {
        this.total = obj?.items.total?? 0; 
        this.page = 1; 
        this.items = 20; 
    }
}
