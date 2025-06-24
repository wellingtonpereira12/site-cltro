import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DisclosurePanel, DisclosureButton } from "@headlessui/react";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Crie sua conta", href: "#", current: false },
  { name: "Download", href: "#", current: false },
  { name: "Discord", href: "#", current: false },
  { name: "Wiki", href: "#", current: false },
  { name: "Login", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <div className="w-full">
          {/* CONTAINER */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-red-500">
            <div className="flex h-16 items-center justify-between">
              {/* LOGO */}
              <div className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://cltro.com/banners/banner3.png"
                  alt="Logo"
                />
              </div>

              {/* DESKTOP MENU */}
              <div className="hidden sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* MOBILE TOGGLE BUTTON */}
              <div className="sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          <DisclosurePanel className="sm:hidden bg-purple-500 block w-full">
            <div className="px-4 pt-2 pb-3 bg-green-500 space-y-1 rounded-3xl">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-red-900 text-white"
                      : "text-gray-300 hover:bg-gray-600 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
