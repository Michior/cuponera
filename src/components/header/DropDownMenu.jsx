// de la documentacion de 'Tailwindcss':https://tailwindui.com/components/application-ui/elements/dropdowns y https://headlessui.com/react/menu
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Categorias() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-mdborder-3 bg-base border-3 border-resaltador px-6 py-2 rounded text-resaltador font-semibold shadow-xs hover:bg-gray-50">
          Categoría
          <ChevronDownIcon className="size-5.5 fill-resaltador" />
        </MenuButton>
      </div>

{/* las categorias que tenemos, para los cupones- */}
      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-black data-focus:bg-gray-100 data-focus:text-resaltador"
            >
              Restaurantes
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-black data-focus:bg-gray-100 data-focus:text-resaltador"
            >
              Belleza
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-black data-focus:bg-gray-100 data-focus:text-resaltador"
            >
              Hogar
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-black data-focus:bg-gray-100 data-focus:text-resaltador"
            >
              Salud
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}



