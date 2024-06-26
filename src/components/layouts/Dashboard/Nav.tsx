import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import useSession from "~/utils/hooks/useSession";
import useSettings from "~/utils/hooks/useSettings";
import { settingsActionKind } from "~/utils/reducers/SettingsReducer";

import {
  AccessTime,
  AccountTree,
  CalendarMonth,
  Close,
  Link,
  Settings,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";

const NAV_ITEMS = [
  {
    title: "Event Types",
    href: "/dashboard/event-types",
    icon: <Link />,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: <CalendarMonth />,
  },
  {
    title: "Availability",
    href: "/dashboard/availability",
    icon: <AccessTime />,
  },
  {
    title: "Workflows",
    href: "/dashboard/workflows",
    icon: <AccountTree />,
  },
];

export type NavProps = {
  onClose?: () => void;
  isMobile?: boolean;
};

export function Nav({ onClose, isMobile }: NavProps) {
  const { dispatch } = useSettings();
  const session = useSession();
  const pathname = usePathname();

  const handleDrawerClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const handleOpenSetting = useCallback(() => {
    dispatch({ type: settingsActionKind.SET_IS_OPEN, payload: true });
  }, [dispatch]);

  return (
    <div className="flex flex-1 flex-col gap-x-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex items-center">
          <Image
            src={"/images/logo.png"}
            alt={"Bubble Bookings Logo"}
            width={6000}
            height={6000}
            className="aspect-square w-9"
          />
          <span>bubble</span>
        </div>
        {isMobile ? (
          <div className="flex shrink justify-center opacity-100 lg:hidden">
            <button
              type="button"
              className="m-[-0.625rem] p-2.5"
              onClick={handleDrawerClose}
            >
              <span className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap border-0 p-0">
                Close sidebar
              </span>
              <Close className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        ) : null}
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-col gap-x-7">
          <li>
            <ul role="list" className="mx-[-0.5rem]">
              {NAV_ITEMS.map(({ title, icon, href }) => (
                <li key={title}>
                  <a
                    href={href}
                    className={`flex gap-x-3 rounded-md p-2 text-sm leading-6 ${href.includes(pathname) ? "bg-gray-50 text-indigo-600" : "text-gray-700"} hover:bg-gray-50 hover:text-indigo-600`}
                  >
                    {icon}
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <ul role="list" className="mt-auto flex shrink flex-col gap-x-7">
          <li>
            <div className="flex items-center justify-between gap-2">
              <button className="mx-[-0.5rem] flex w-fit items-center justify-start gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                <Avatar
                  src={undefined}
                  alt="Bubble man"
                  className="h-10 w-10 shrink"
                />
                {session?.user.email}
              </button>
              <IconButton
                onClick={handleOpenSetting}
                className="mx-[-0.5rem] flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              >
                <Settings className="h-6 w-6 shrink" />
              </IconButton>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
