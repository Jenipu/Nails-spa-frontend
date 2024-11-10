import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROLES } from '../../libs/constants'

export function DashboardMenu() {
  const { user } = useAuth()

  return (
    <aside className='w-full flex flex-col'>
      <nav className='w-full flex flex-col gap-1 [&>*]:w-full [&>*]:text-left [&>*]:p-2 [&>*]:bg-primary [&>*]:rounded-md [&>*:hover]:opacity-80'>
        {user.rol === ROLES.ADMIN && (
          <>
            <Link to="/dashboard/users">
              Usuarios
            </Link>

            <Link to="/dashboard/services">
              Servicios
            </Link>

            <Link to="/dashboard/appointments">
              Citas
            </Link>
          </>
        )}

        <Link to="/dashboard/my-appointments">
          Mis citas
        </Link>
      </nav>
    </aside>
  )
}