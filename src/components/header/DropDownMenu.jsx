import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import fetchFilter from "../../hooks/fetchFilter";

export default function Categorias() {
  const { categories, loading, error } = fetchFilter();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md border-3 bg-base border-3 border-resaltador px-6 py-2 text-resaltador font-semibold shadow-xs hover:bg-gray-50">
          Categoría
          <ChevronDownIcon className="size-5.5 fill-resaltador" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {loading && <p className="px-4 py-2 text-sm text-gray-500">Cargando...</p>}
          {error && <p className="px-4 py-2 text-sm text-red-500">{error}</p>}
          {categories.map((category) => (
            <MenuItem key={category.id}>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-black data-focus:bg-gray-100 data-focus:text-resaltador"
              >
                {category.name}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
