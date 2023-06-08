export class DemandeCompte {
    constructor(
        public id:number,
        public name:string,
        public created_at:Date,
        public matricule:string,
        public email:string,
        public role:string,
        public Compte_isActivated:boolean,
        public structure_id:string,
        public status:string
    ){

    }
}