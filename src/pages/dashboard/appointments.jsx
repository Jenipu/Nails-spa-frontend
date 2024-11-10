import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAppointments } from '../../api/appointments.requests'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { formatDate } from '../../libs/utils'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    if (appointments.length === 0) {
      getAllAppointments()
    }
  }, [])

  const getAllAppointments = async () => {
    try {
      const appointments = await getAppointments()
      setAppointments(appointments)
    } catch (error) {
      console.error(error)
      setAppointments([])
    }
  }

  if (appointments.length === 0) return <h5 className='font-medium text-2xl text-center text-gray-800'>No se encontraron citas.</h5>

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Servicio
            </th>
            <th scope="col" className="px-6 py-3">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const dateFormatted = formatDate(parseAbsoluteToLocal(appointment.date).toDate())

            return (
              <tr
                key={appointment.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {appointment.id}
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {dateFormatted}
                </td>
                <td className="px-6 py-4">
                  {appointment.services.service.name}
                </td>
                <td className="px-6 py-4">
                  {appointment.client.name}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/dashboard/appointments/${appointment.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <svg className="fill-secondary" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                      <path fill="#" d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                    </svg>
                  </Link>

                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}