import * as React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
    icon: IconType;
    className?: string;
    onClick?: () => void;
    size?: number | string;
    color?: string;
}

const Icon: React.FC<IconProps> = ({
                                       icon: IconComponent,
                                       className,
                                       onClick,
                                       size,
                                       color
                                   }) => {
    // @ts-ignore
    return React.createElement(IconComponent, {
        className,
        onClick,
        size,
        color,
        style: color ? { color } : undefined
    });
};

export default Icon;
