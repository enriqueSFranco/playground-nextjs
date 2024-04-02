'use server'

import { sql } from '@vercel/postgres'
import { FormSchema } from '../schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const UpdateInvoice = FormSchema.omit({ id: true, date: true })

export async function updateInvoice (id: string, formData: FormData) {
  const fields = Object.fromEntries(formData.entries())
  const { customerId, status, amount } = UpdateInvoice.parse(fields)

  const amountInCents = amount * 100
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `
    revalidatePath('/dashboard/invoices')
    return { message: 'Deleted Invoice.' }
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.'
    }
  }
  redirect('/dashboard/invoices')
}


/**
 * PASOS A SEGUIR PARA ACTUALIZAR UNA FACTURA
 * 1.- Extraer los datos de formData.
 * 2.- Validar los tipos con Zod.
 * 3.- Convertir el monto en centavos.
 * 4.- Pasar las variables a su consulta SQL.
 * 5.- Llamando revalidatePath para borrar la caché del cliente y realizar una nueva solicitud de servidor.
 * 6.- Llamando redirect para redirigir al usuario a la página de la factura.
*/