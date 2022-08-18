import Tippy from '@tippyjs/react';

const Tooltip = ({ children, ...delegated }) => {
    return (
        <Tippy {...delegated}>
            {children}
        </Tippy>
    );
}

export default Tooltip;