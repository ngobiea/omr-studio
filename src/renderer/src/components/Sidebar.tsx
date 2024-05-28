import { useSettings } from '@renderer/context/Settings';
import { SidebarTheme } from '@renderer/themes/SidebarTheme';
import { FM } from '@renderer/utils/i18helper';
import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineSettings } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const LayoutWithSidebar = ({ children }: { children: JSX.Element }) => {
  const { settings } = useSettings();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    console.log('settings', settings);
  }, [settings]);

  return (
    <div className="flex">
      {path === '/importStudents' ? null : (
        <div className="h-screen">
          <Sidebar theme={SidebarTheme} collapsed={collapsed}>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="#settings"
                  active={path === '/settings'}
                  icon={MdOutlineSettings}
                >
                  {FM('settings')}
                </Sidebar.Item>
                <Sidebar.Item
                  href="#all-students"
                  active={path === '/all-students'}
                  icon={MdOutlineSettings}
                >
                  {FM('student-list')}
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          <div
            className={`transition-all ease-in-out duration-300 absolute bottom-4 ltr:left-3 rtl:right-3 ${collapsed ? 'w-10 rounded-full' : 'rounded-lg w-56'} h-10  flex items-center justify-center bg-gray-200 dark:bg-gray-700`}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? (
              <MdKeyboardArrowRight className="" fontSize={28} />
            ) : (
              <MdKeyboardArrowLeft className="" fontSize={28} />
            )}
          </div>
        </div>
      )}
      <div className=" h-screen w-full">{children}</div>
    </div>
  );
};

export default LayoutWithSidebar;
