import React from "react"
import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductServices"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"


export async function loader() {
  const products = await getProducts()
  return products
}

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  
  return {}
}

export default function Products() {

  const products = useLoaderData() as Product[]
  

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full">
          <h2 className="text-2xl font-bold text-slate-500 mb-4 sm:mb-0">Productos</h2>
          <Link
              to="productos/nuevo"
              className="rounded-md bg-slate-500 border-2 border-header-bg p-3 text-xs font-medium text-white shadow-sm hover:bg-slate-00 tracking-wide"
          >
              Agregar Producto
          </Link>
      </div>

      <div className="p-2 w-full">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-add text-black border-2 border-header-bg">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody className="text-center">
            {products.map(product => (
              <ProductDetails 
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
