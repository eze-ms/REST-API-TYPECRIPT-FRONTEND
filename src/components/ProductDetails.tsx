import React from 'react'
import { Form, useNavigate, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'
import { Product } from '../types'
import { formatCurrency } from '../utils'
import { deleteProduct } from '../services/ProductServices'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

type ProductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product}: ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800 flex justify-center">
                <fetcher.Form method="POST"style={{ width: '80%' }}>
                    <button
                        type='submit'
                        name='id'
                        value={product.id}
                        className={`${isAvailable ? 'text-green-700 bg-green-300 border-green-800' : 'bg-orange-300 text-orange-700 border-orange-800'} border-2 rounded-lg p-2 text-xs uppercase font-bold w-full hover:cursor-pointer flex items-center justify-center gap-2`}
                    >
                        {isAvailable ? <AiOutlineCheckCircle /> : <AiOutlineCloseCircle />}
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className='bg-blue-500 text-white rounded-lg w-full p-2 uppercase font-normal text-xs text-center border-2 border-blue-800 hover:bg-blue-700'
                    >Editar
                    </button>
                    <Form
                        className='w-full'
                        method='POST'
                        action= {`productos/${product.id}/eliminar`}
                        onSubmit={ (e) => {
                            if( !confirm('¿Eliminar?') ) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type='submit'
                            value='Eliminar'
                            className='bg-pink-500 text-white rounded-lg w-full p-2 uppercase font-normal text-xs text-center border-2 border-pink-800 hover:bg-pink-700 hover:cursor-pointer'
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
