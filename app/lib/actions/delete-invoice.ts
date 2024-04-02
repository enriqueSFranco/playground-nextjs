'user server'

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"

export async function deleteInvoice (id: string) {
  try {
    await sql`
      DELETE FROM invoices WHERE id = ${id}
    `
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.'
    }
  }
  revalidatePath('/dashboard/invoices')
}