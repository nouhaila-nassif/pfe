export interface ClientDTO {
  id?: number;               // Optionnel, peut être absent à la création
  name: string;              // Nom du client
  clientTypeName: string;    // Type du client : PRE_SELLER, DIRECT_SELLER, etc.
  routeId: number;           // Identifiant de la route associée
}
