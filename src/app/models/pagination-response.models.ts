
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
    hasNextPage: boolean; 
    isLoading: boolean; 
    search: string; 

    constructor(obj?: IPaginationResponse) {
        this.total = obj?.items.total?? 0; 
        this.page = 0; 
        this.items = 20; 
        this.hasNextPage = obj?.has_next_page?? true; 
        this.isLoading = false;
        this.search = ''; 
    }
}
