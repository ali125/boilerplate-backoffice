import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import Image from '@/components/base/Image';
import SidebarLinks from '@/constants/sidebarLinks';

import LogoImage from "@/assets/images/logo-image.png";
import projectConfig from '@/config/projectManifest';
import classNames from 'classnames';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/utils/providers/CanAbilityProvider';
import { PermissionActions } from '@/@types/permission.type';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const ability = useAbility(AbilityContext);

  const permittedLinks = useMemo(() => {
    return SidebarLinks.filter((link) => {
      return ability.can(PermissionActions.Manage, link.id) || ability.can(PermissionActions.Read, link.id) || link.isPublic;
    });
  }, [ability]);

  return (
    <aside className='px-6 w-64 bg-white min-h-[100vh] sticky h-full top-0'>
      <section className='p-4 h-24'>
        <div className='flex items-end content-end gap-3 h-full '>
          <Image src={LogoImage} className='h-10' />
          <h3 className='font-bold text-cyan-600 tracking-widest'>{projectConfig.title}</h3>
        </div>
      </section>
      <nav>
        <ul>
          {permittedLinks.map((item) => (
            <li key={item.id}>
              {item.path ? (
                <NavLink
                  to={item.path}
                  className={({ isActive, isPending }) => classNames("flex items-center gap-3 my-0.5 py-3 px-4 capitalize font-medium text-slate-600 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg", {
                    "bg-cyan-300 text-white": isPending,
                    "bg-primary text-white": isActive,
                  })}
                >
                  {item.icon && React.createElement(item.icon)}
                  {t(item.label)}
                </NavLink>
              ) : (
                <span>{t(item.label)}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
