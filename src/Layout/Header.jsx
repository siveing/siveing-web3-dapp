import React, { useContext } from 'react';

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom';
import { StateContext } from '../Context/StateProvider';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const { stateUser } = useContext(StateContext);
    const { pathname } = useLocation();

    const navigation = [
        { name: 'Home', href: '/', auth: false },
        { name: 'Account', href: '/account', auth: !stateUser.isAuthenticated },
    ];

    return (
        <Disclosure as="nav">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6 text-white" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6 text-white" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <h3 className='text-xl text-white font-bold'>SIVEING DAPP <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 mb-1 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Beta testnet</span></h3>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => !item.auth && (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    (item.href === pathname)
                                                        ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.href === pathname ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden sm:flex sm:justify-center">
                                {/* Profile dropdown */}
                                <p className='text-white'>{stateUser.wallet.address}</p>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => !item.auth && (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        (item.href === pathname)
                                            ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.href === pathname ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default Header;
