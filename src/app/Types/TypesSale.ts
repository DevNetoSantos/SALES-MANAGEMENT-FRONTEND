export type TypeSale = {
  id: number;
  createdAt: string;
  updatedAt: string;
  qts_product: string;
  pay_value: string;

  product: {
    name: string; 
    cod_reference: string; 
    value_sale: string; 
    data_fabrication: string; 
    due_date: string; 
  },
  employee: {
    name: string
    lastname: string;
  },
  client: {
    name: string;
    cpf: string;
  }
}