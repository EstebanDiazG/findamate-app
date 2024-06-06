export interface ITopic {
    id: string;
    id_person: string;
    id_imagen: string;
    id_video: string;
    id_file: string;
    title: string;
    creadorTopico: string;
    imagen: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    categoryId: string; // Nueva propiedad categoryId
    categoryInterest: string;
  }