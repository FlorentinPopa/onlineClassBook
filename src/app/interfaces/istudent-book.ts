export interface IStudentBook {
  meta: {
    countTotal: number;
    countData: number;
    countOffset: number;
  };
  data: bookData[];
}

export interface bookData {
  prodID: number;
  prodNume: string;
  prodDescriere: string;
  prodCuprins: string;
  prodIsbn: null;
  prodAnAparitie: null;
  prodNrPagini: number;
  prodDimensiuni: null;
  prodCoverUrl: string;
  prodFileUrl: string;
  prodPromovare: number;
  prodPromovareOrder: number;
  autori: bookAuthor[];
  domenii: null;
  editura: null;
  anStudiu: null;
}

export interface bookAuthor {
  autID: number;
  autNumeFull: string;
}
