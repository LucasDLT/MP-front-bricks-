"use client";
import { useEffect } from "react";
import {
  CardFormDataProps,
  BrickOnSubmitActions,
  BrickError,
} from "../../types/index";

export default function CardForm() {
  const PORT = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";

    script.onload = () => {
      const mp = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,
        {
          locale: "es-AR",
        }
      );
      mp.bricks().create("cardPayment", "cardPaymentBrick_container", {
        initialization: {
          amount: 100, //se reemplaza con el monto final
        },
        customization: {
          paymentMethods: {
            ticket: "all",
            bankTransfer: "all",
          },
        },
        callbacks: {
          onReady: () => {
            console.log("Brick listo");
          },
          onSubmit: async (
            cardFormData: CardFormDataProps,
            actions: BrickOnSubmitActions
          ) => {
            console.log("Datos del formulario", cardFormData);
            const {
              token,
              payment_method_id,
              payer,
              description,
              transaction_amount,
              installments,
            } = cardFormData;

            try {
              const response = await fetch(
                `https://mercadopago-kq4d.onrender.com/api/create-payment`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    token,
                    PaymentMethodId: payment_method_id,
                    email: payer.email,
                    items: [
                      {
                        title: description,
                        unit_price: transaction_amount,
                        quantity: 1,
                      },
                    ],
                    description,
                    installments,
                  }),
                }
              );

              const data = await response.json();
              console.log(token, data);
            } catch (error) {
              console.error("Error al procesar el pago:", error);
            }
          },
          onError: (error: BrickError) => {
            console.log("Error del formulario", error);
          },
        },
      });
    };
    document.body.appendChild(script);
  }, []);
  return (
    <div>
      <h1>Formulario de Pago</h1>
      <div id="cardPaymentBrick_container"></div>
    </div>
  );
}
