export interface Pet {
    id: number;
    category: Record<string, unknown>;
    name: string;
    photoUrls: Array<string>;
    tags: Record<string, unknown>;
    status: 'available' | 'pending' | 'sold';
}
