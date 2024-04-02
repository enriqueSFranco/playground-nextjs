import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'

/**
 * Además de searchParams, los componentes de la página también aceptan un prop llamado params 
 * que puede utilizar para acceder al id.
*/

export default async function Page ({ params }: { params: { id: string } }) {
  const { id } = params

  const [invoce, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()])

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}