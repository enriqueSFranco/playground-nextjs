'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FormSchema } from '../schemas';

const CreateInvoce = FormSchema.omit({ id: true, date: true });

type State = {
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
  message?: string | null
}

export async function createInvoice (prevState: State, formData: FormData) {
  const fields = Object.fromEntries(formData.entries());
  const validateFields = CreateInvoce.safeParse(fields);

  console.log(validateFields)

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.'
    }
  }

  const { customerId, amount, status } = validateFields.data

  // Por lo general, es una buena práctica almacenar valores monetarios en centavos en su base de datos
  // para eliminar errores de coma flotante de JavaScript y garantizar una mayor precisión.
  const amountInCents = amount * 100;
  const [date] = new Date().toISOString().split('T');

  try {
    await sql`
      INSERT INTO invoices(customer_id, amount, status, date) 
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.'
    }
  }
  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
