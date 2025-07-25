
export interface CardFormDataProps {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  installments: number;
  description: string;
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


/*

// types/mercadoPago.d.ts o types/index.ts

// 📦 Tipos de las acciones dentro de callbacks
export interface BrickOnSubmitActions {
  // Este método se llama cuando querés notificar que el proceso terminó (ej: cerrar el Brick).
  onReady(): void;
  onError(error: unknown): void;
}

// 📦 Datos que devuelve el formulario (al hacer submit)
export interface CardFormDataProps {
  paymentMethod: {
    id: string;
    payment_type_id: string;
  };
  issuer: {
    id: string;
    name: string;
  };
  cardholder: {
    name: string;
    identification: {
      type: string;
      number: string;
    };
  };
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  amount: number;
  installments: number;
}

// 📦 Error estándar del Brick
export interface BrickError {
  message: string;
  error: string;
  type: string;
}

// 📦 Opciones para crear el Brick
export interface BrickCreateOptions {
  initialization?: Record<string, any>; // lo podés tipar más fuerte si sabés las props
  customization?: Record<string, any>;
  callbacks?: {
    onReady?: () => void;
    onSubmit?: (
      cardFormData: CardFormDataProps,
      actions: BrickOnSubmitActions
    ) => Promise<void>;
    onError?: (error: BrickError) => void;
  };
}

// 📦 Instancia del SDK de MercadoPago
export interface MercadoPagoInstance {
  bricks(): {
    create(
      name: 'cardPayment' | 'wallet' | string,
      container: string,
      options?: BrickCreateOptions
    ): void;
  };
}

// 📦 Constructor (para new MercadoPago)
export interface MercadoPagoConstructor {
  new (publicKey: string, options?: { locale?: string }): MercadoPagoInstance;
}

// 📦 Hacemos visible en todo el proyecto que window.MercadoPago existe y es así
declare global {
  interface Window {
    MercadoPago: MercadoPagoConstructor;
  }
}

*/