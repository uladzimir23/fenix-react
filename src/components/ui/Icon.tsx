import * as React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
    icon: IconType;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    size?: number | string;
    color?: string;
}

const Icon: React.FC<IconProps> = ({
    icon: IconComponent,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    size,
    color
}) => {
    // Используем any для обхода проверки типов
    const IconAny = IconComponent as any;
    
    return (
        <IconAny
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            size={size}
            color={color}
            style={color ? { color } : undefined}
        />
    );
};

export default Icon;