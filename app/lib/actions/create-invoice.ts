'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FormSchema } from '../schemas';

const CreateInvoce = FormSchema.omit({ id: true, date: true });

export async function createInvoice (formData: FormData) {
  const fields = Object.fromEntries(formData.entries());
  const { customerId, status, amount } = CreateInvoce.parse(fields);

  // Por lo general, es una buena práctica almacenar valores monetarios en centavos en su base de datos
  // para eliminar errores de coma flotante de JavaScript y garantizar una mayor precisión.
  const amountInCents = amount * 100;
  const [date] = new Date().toISOString().split('T');

  await sql`
    INSERT INTO invoices(customer_id, amount, status, date) 
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
