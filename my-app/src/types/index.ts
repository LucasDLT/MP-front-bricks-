
export interface CardFormDataProps {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  installments: number;
  payer: {
    email: string;
    identification: {
      number: string;
      type: string;
    };
  };
}


export interface BrickOnSubmitActions {
  resolve: () => void;
  reject: () => void;
}

export interface BrickError {
  code: string;
  message: string;
  cause?: Array<{
    code: string;
    description: string;
  }>;
}

//el siguiente tipado esta hecho manualmente por que sino la instancia de mercado pago no funciona ya que se crea desde el objeto windows instanciado de un script que inyectamos en el navegador, no es que instalamos una libreria externa. Esto nos paso por hacernos los artesanos y querer hacer todo de 0 
export interface MercadoPagoConstructor {
  new (publicKey: string, options: { locale: string }): {
    bricks(): {
      create(
        name: string,
        container: string,
        options: {
          initialization: object;
          customization: object;
          callbacks: object;
        }
      ): void;
    };
  };
}

declare global {
  interface Window {
    MercadoPago: MercadoPagoConstructor;
  }
}
