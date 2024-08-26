import React from 'react'
import { Product } from '../types'

type ProductFormProp = {
    product?: Product // Puede o no, haber un producto
}

export default function ProductForm({product}: ProductFormProp) {
  return (
    <>
        <div className="mb-4">
            <input
                id="name"
                type="text"
                className="mt-2 block w-full p-3 bg-bg-input placeholder-small rounded-sm "
                placeholder="Nombre del producto"
                name="name"
                defaultValue={product?.name}  // Valor por defecto del nombre del producto
            />
        </div>
        <div className="mb-4">
            <input
                id="price"
                type="number"
                className="mt-2 block w-full p-3 bg-bg-input placeholder-small rounded-sm"
                placeholder="Precio del producto. ej. 200, 300"
                name="price"
                defaultValue={product?.price}  // Valor por defecto del precio del producto
            />
        </div>
    </>
  )
}
