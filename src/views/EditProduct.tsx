import React from 'react'
import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductById, updateProduct } from '../services/ProductServices'
import { Product } from '../types'
import ProductForm from '../components/ProductForm'

/**
 *! Loader para obtener el producto por ID desde el backend.
 *? Se ejecuta antes de renderizar el componente para cargar los datos necesarios.
 *? Si el producto no se encuentra, redirige al usuario a la página principal.
 */
export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const product = await getProductById(+params.id) // Convertimos el ID a número
        if (!product) {
            return redirect('/')  // Redirigir si no se encuentra el producto
        }
        return product  // Retornar el producto al componente
    }
    return redirect('/')  // Redirigir si no hay ID en los parámetros
}

/**
 *! Action para manejar la lógica de envío del formulario de edición.
 *? Valida que todos los campos estén completos y si no lo están, devuelve un error.
 *? Si los campos están completos, redirige al usuario a la página principal después de guardar los cambios.
 */
 export async function action({request, params} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }

    if(params.id !== undefined) {
        await updateProduct(data, +params.id)
        return redirect('/')
    }

}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]

/**
 *! Componente principal de la página de edición de productos.
 */
export default function EditProduct() {
    const product = useLoaderData() as Product  // Obtenemos el producto desde el loader
    const error = useActionData() as string  // Obtenemos el error desde la action (si existe)
    
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full">
                <h2 className="text-2xl font-bold text-slate-500 mb-4 sm:mb-0">Editar Producto</h2>
                <Link
                    to="/"
                    className="rounded-md bg-slate-500 border-2 border-header-bg p-3 text-xs font-medium text-white shadow-sm hover:bg-slate-00 tracking-wide"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Form className="mt-10 w-full sm:w-2/4 mx-auto" method="POST">
                
                <ProductForm 
                    product={product}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-center">
                    <input
                        type="submit"
                        className="mt-5 w-full sm:w-1/3 bg-add p-2 text-black font-medium text-lg cursor-pointer rounded border-2 border-header-bg"
                        value="Guardar Cambios"
                    />
                </div>
            </Form>
        </>
    )
}
