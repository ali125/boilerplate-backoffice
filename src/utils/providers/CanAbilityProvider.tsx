import { PropsWithChildren, createContext } from 'react';
import { createCanBoundTo } from '@casl/react';
import { AnyAbility, defineAbility } from '@casl/ability';

// const ability = defineAbility((can, cannot) => {
//     can('read', 'Post');
//     can('update', 'Post');
//     can('read', 'Comment');
//     can('update', 'Comment');
// });
const ability = defineAbility(() => {});

export const AbilityContext = createContext<AnyAbility>(ability);
export const Can = createCanBoundTo(ability);

const AbilityContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <AbilityContext.Provider value={ability}>
            {children}
        </AbilityContext.Provider>
    )
}

export default AbilityContextProvider;