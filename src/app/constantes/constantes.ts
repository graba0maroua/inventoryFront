export const colors = ["50A060","7b68ee","5f48ea","E248AA","3498DB","F57C01"] 
export const backend_server = "http://localhost:8000/" 
export const baseUrl = backend_server+"api/"
export function randomColor<String>(id:number){
    const  color = colors[id % colors.length];
    return color;
}
export const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
export const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
export const days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
export const monthNumberDays =  new Map(Object.entries( {
    "Janvier":31,
    "Février":28,
    "Mars":31,
    "Avril":30,
    "Mai":31,
    "Juin":30,
    "Juillet":31,
    "Août":31,
    "Septembre":30,
    "Octobre":31,
    "Novembre":30,
    "Décembre":31}))

    export const roles = ["Chef_unité","Chef_centre","Chef_équipe"]
   export const frFRLocalization = {
        // Root
     noRowsLabel: 'Pas de rangées/lignes',
     noResultsOverlayLabel: 'Aucun résultat trouvé.',
     errorOverlayDefaultLabel: 'Une erreur est produite.',
     columnMenuUnsort: 'Non classé',
     columnMenuSortAsc: 'Trier par ordre croissant',
     columnMenuSortDesc: 'Trier par ordre décroissant',
     columnMenuFilter: 'Filtrer',
     columnMenuHideColumn: 'Masquer la colonne',
     columnMenuShowColumns: 'Afficher les colonnes',
       // Filter panel text
       filterPanelAddFilter: 'Ajouter filtre',
       filterPanelDeleteIconLabel: 'Supprimer',
       filterPanelLinkOperator: 'Operateur logique',
       filterPanelOperators: 'Operateur', 
       filterPanelOperatorAnd: 'Et',
       filterPanelOperatorOr: 'OU',
       filterPanelColumns: 'Colonne',
       filterPanelInputLabel: 'Valeur',
       filterPanelInputPlaceholder: 'valeur filtrer',
       toolbarDensity: 'Densité',
       toolbarDensityLabel: 'Taille',
       toolbarDensityCompact: 'petite',
       toolbarDensityStandard: 'moyen',
       toolbarDensityComfortable: 'Large',
     // Filter operators text
     filterOperatorContains: 'contient',
     filterOperatorEquals: 'egale',
     filterOperatorStartsWith: 'commence avec',
     filterOperatorEndsWith: 'termine avec',
     filterOperatorIs: 'est',
     filterOperatorNot: 'est pas',
     filterOperatorAfter: 'est après',
     filterOperatorOnOrAfter: 'est le ou avant',
     filterOperatorBefore: 'est avant',
     filterOperatorOnOrBefore: 'is on or before',
     filterOperatorIsEmpty: 'est vide',
     filterOperatorIsNotEmpty: 'est pas vide',
     filterOperatorIsAnyOf: 'est un des',
   
     // Filter values text
     filterValueAny: 'nimporte',
     filterValueTrue: 'vrai',
     filterValueFalse: 'faux',
    // Column menu text
    columnMenuLabel: 'Menu',
    // Columns selector toolbar button text
    toolbarColumns: 'colonne',
    toolbarColumnsLabel: 'Choisir colonne',
     // Columns panel text
     columnsPanelTextFieldLabel: 'trouver colonne',
     columnsPanelTextFieldPlaceholder: 'titre colonne',
     columnsPanelDragIconLabel: 'Réorganiser colonne',
     columnsPanelShowAllButton: 'Afficher tout',
     columnsPanelHideAllButton: 'Cacher tout',
   
   };