import React from 'react';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/utils/providers/CanAbilityProvider';
import { PermissionActions, PermissionModules } from '@/@types/permission.type';

interface Props {
    Component: React.JSX.ElementType;
    module: PermissionModules;
}

const AccessRoute: React.FC<Props> = ({ Component, module }) => {
    const ability = useAbility(AbilityContext);

    if (ability.can(PermissionActions.Read, module)) {
        return <Component />;
    }
    
    return <h1>Access Denied</h1>
}

export default AccessRoute;
