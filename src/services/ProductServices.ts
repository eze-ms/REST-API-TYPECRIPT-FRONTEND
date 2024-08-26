import { safeParse, number, parse, string, transform, pipe } from "valibot";
import axios from "axios"
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import { toBoolean } from "../utils"

// **Definición de tipos

// Define el tipo para los valores de formulario que pueden ser string o archivo
type FormDataEntryValue = string | File

// Define el tipo ProductData que es un objeto con claves de tipo string y valores de tipo FormDataEntryValue
type ProductData = {
  [k: string]: FormDataEntryValue
}

// ** Función para agregar un producto
export async function addProduct(data: ProductData) {
  try {
    // Validación de los datos utilizando el esquema DraftProductSchema
    const result = safeParse(DraftProductSchema, {
      name: data.name as string, // Convertir a string explícitamente
      price: +data.price // Convertir a número
    })

    // Si la validación es exitosa, enviar una solicitud POST para agregar el producto
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price
      })
    } else {
      throw new Error("Datos no válidos") // Lanzar un error si la validación falla
    }
  } catch (error) {
    console.error("Error al agregar el producto:", error)
    throw error // Manejar el error y lanzarlo de nuevo
  }
}

// ** Función para obtener todos los productos
export async function getProducts() {
  try {
    // Realizar una solicitud GET para obtener todos los productos
    const url = `${import.meta.env.VITE_API_URL}/api/products`
    const { data } = await axios(url)
    console.log(data) // Verifica la estructura de los datos

    // Validar los datos recibidos usando el esquema ProductsSchema
    const result = safeParse(ProductsSchema, data.data)
    if (result.success) {
      return result.output // Retornar los productos si la validación es exitosa
    } else {
      throw new Error('Hubo un error...') // Lanzar un error si la validación falla
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error)
  }
}

// ** Función para obtener un producto por ID
export async function getProductById(id: Product['id']) {
  try {
    // Realizar una solicitud GET para obtener un producto por su ID
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    const { data } = await axios(url)
    console.log(data) // Verifica la estructura de los datos

    // Validar los datos recibidos usando el esquema ProductSchema
    const result = safeParse(ProductSchema, data.data) // Usa ProductSchema para validar un solo objeto
    if (result.success) {
      return result.output // Retornar el producto si la validación es exitosa
    } else {
      throw new Error('Hubo un error al validar el producto...') // Lanzar un error si la validación falla
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error)
    return null;  // Devuelve null en caso de error
  }
}

// ** Función para actualizar un producto
export async function updateProduct(data: ProductData, id: Product['id']) {
  try {
    // Definir el esquema para convertir un string a número y boolean
    const NumberSchema = pipe(string(), transform(Number), number())
    
    // Validar y transformar los datos del producto
    const result = safeParse(ProductSchema, {
      id,
      name: data.name, // Mantener el nombre como string
      price: parse(NumberSchema, data.price), // Convertir el precio de string a número
      availability: toBoolean(data.availability.toString()) // Convertir availability a string antes de transformarlo a booleano
    })

    // Verificar si la validación es exitosa
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      await axios.put(url, result.output); // Enviar los datos actualizados al backend
      console.log("Producto actualizado:", result.output);
    } else {
      throw new Error("Datos no válidos al actualizar el producto") // Manejar errores de validación
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error)
  }
}

// ** Función para eliminar un producto
export async function deleteProduct(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.delete(url)
  } catch (error) {
    console.log(error);   
  }
}

// ** Función para actualizar la disponibilidad del producto
export async function updateProductAvailability(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.patch(url)
  } catch (error) {
    console.log(error);
  }
}