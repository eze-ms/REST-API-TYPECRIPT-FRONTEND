import React from 'react'
import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from '../services/ProductServices'
import ProductForm from '../components/ProductForm';

/**
 *! Action para manejar el envío del formulario de agregar o editar productos.
 ** Valida que todos los campos estén llenos antes de procesar la solicitud.
 */
export async function action({ request }: ActionFunctionArgs) {
    // Obtener los datos del formulario en formato de objeto
    const data = Object.fromEntries(await request.formData());
    
    let error = '';

    // Validación: Verificar que no haya campos vacíos
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }

    // Si se encontró un error, devolverlo para que se muestre en la interfaz
    if (error.length) {
        return error;
    }

    // Si no hay errores, agregar el producto usando la función addProduct
    await addProduct(data);

    // Redirigir al usuario a la página principal después de agregar el producto
    return redirect('/');
}

export default function NewProduct() {
    const error = useActionData() as string

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full">
                <h2 className="text-2xl font-bold text-slate-500 mb-4 sm:mb-0">Registrar Producto</h2>
                <Link
                    to="/"
                    className="rounded-md bg-slate-500 border-2 border-header-bg p-3 text-xs font-medium text-white shadow-sm hover:bg-slate-00 tracking-wide"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className="mt-10 w-full sm:w-2/4 mx-auto" method="POST">
               
                <ProductForm />
                <div className="flex justify-center">
                    <input
                        type="submit"
                        className="mt-5 w-full sm:w-1/3 bg-add p-2 text-black font-medium text-lg cursor-pointer rounded border-2 border-header-bg"
                        value="Registrar Producto"
                    />
                </div>
            </Form>
        </>
    )
}
