// src/app/models/recu.model.ts

export class Recu {
    id: number;
    montant: number;
    date: Date;
    description: string;

    constructor(id: number, montant: number, date: Date, description: string) {
        this.id = id;
        this.montant = montant;
        this.date = date;
        this.description = description;
    }
}