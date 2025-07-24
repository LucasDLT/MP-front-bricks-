'use client';
import { useEffect } from "react";
import {CardFormDataProps, BrickOnSubmitActions, BrickError} from "../../types/index";


export default function CardForm(){
    
    useEffect(()=>{
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        
        script.onload = ()=>{

            const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,{
                locale:'es-AR'
            }
            )
            mp.bricks().create('cardPayment','cardPaymentBrick_container',{
                initialization:{
                    amount:100,//se reemplaza con el monto final
                },
                customization:{
                    paymentMethods:{
                    ticket:'all',
                    bankTransfer:'all',
                },
                },
                callbacks:{
                    onReady:()=>{
                        console.log('Brick listo');
                        },
                        onSubmit:async(cardFormData: CardFormDataProps, actions:BrickOnSubmitActions)=>{
                            console.log('Datos del formulario', cardFormData);
                            //Aqui luego llamaremos a ty endpoint para enviar el pago

                            
                        },
                        onError:(error:BrickError)=>{
                            console.log('Error del formulario', error);
                            
                        },
                },
            
            });
        };
        document.body.appendChild(script)
    },[])
    return(
        <div>
        <h1>
        Formulario de Pago
        </h1>
        <div id="cardPaymentBrick_container"></div>
        </div>
    )
}