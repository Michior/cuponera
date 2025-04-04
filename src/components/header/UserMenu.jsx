import React from 'react';
import { TicketIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { NavLink } from 'react-router';

const UserMenu = () => (
    <Menu as="div" className="relative inline-block text-left z-[9999]">
        <Menu.Button className="flex items-center bg-primary text-white px-4 py-2 rounded z-[9999] relative">
            <TicketIcon className="w-5 h-5 mr-2" />
            Mis Cupones
            <ChevronDownIcon className="w-5 h-5 ml-2" />
        </Menu.Button>

        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white shadow-2xl rounded-xl py-2 z-[9999] border border-gray-200">
            <Menu.Item>
                {({ active }) => (
                    <NavLink 
                        to="/misCupones" 
                        className={`block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`}
                    >
                        Todos mis cupones
                    </NavLink>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                    <NavLink 
                        to="detalleCupon/detalle/valido" 
                        className={`block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`}
                    >
                        Cupones válidos
                    </NavLink>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                    <NavLink 
                        to="detalleCupon/detalle/reclamado" 
                        className={`block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`}
                    >
                        Cupones reclamados
                    </NavLink>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                    <NavLink 
                        to="detalleCupon/detalle/vencidos" 
                        className={`block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`}
                    >
                        Cupones expirados
                    </NavLink>
                )}
            </Menu.Item>
        </Menu.Items>
    </Menu>
);

export default UserMenu;
