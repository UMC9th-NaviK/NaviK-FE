import type { RoleTheme } from "../types/role"

type Role = 'pm' | 'designer' | 'frontend' | 'backend'

export const ROLE_THEME_MAP: Record<Role, RoleTheme> = {
    pm: {
        surfaceBg: 'bg-role-pm-surface',
        primaryText: 'text-role-pm-primary',
        primaryBg: 'bg-role-pm-primary',
        secondaryText: 'text-role-pm-secondary',
        shadow: 'shadow-[0_0_10px_0_var(--role-pm-surface)]',
        gradientVar: 'var(--role-pm-surface)',
        border: 'border-role-pm',

        surfaceVar: 'var(--role-pm-surface)',
        primaryVar: 'var(--role-pm-primary)',
    },

    designer: {
        surfaceBg: 'bg-role-designer-surface',
        primaryText: 'text-role-designer-primary',
        primaryBg: 'bg-role-designer-primary',
        secondaryText: 'text-role-designer-secondary',
        shadow: 'shadow-[0_0_10px_0_var(--role-designer-surface)]',
        gradientVar: 'var(--role-designer-surface)',
        border: 'border-role-designer',

        surfaceVar: 'var(--role-designer-surface)',
        primaryVar: 'var(--role-designer-primary)',
    },

    frontend: {
        surfaceBg: 'bg-role-frontend-surface',
        primaryText: 'text-role-frontend-primary',
        primaryBg: 'bg-role-frontend-primary',
        secondaryText: 'text-role-frontend-secondary',
        shadow: 'shadow-[0_0_10px_0_var(--role-frontend-surface)]',
        gradientVar: 'var(--role-frontend-surface)',
        border: 'border-role-frontend',

        surfaceVar: 'var(--role-frontend-surface)',
        primaryVar: 'var(--role-frontend-primary)',
    },
    
    backend: {
        surfaceBg: 'bg-role-backend-surface',
        primaryText: 'text-role-backend-primary',
        primaryBg: 'bg-role-backend-primary',
        secondaryText: 'text-role-backend-secondary',
        shadow: 'shadow-[0_0_10px_0_var(--role-backend-surface)]',
        gradientVar: 'var(--role-backend-tertiary)', // 백엔드만 다른 변수 사용
        border: 'border-role-backend',

        surfaceVar: 'var(--role-backend-surface)',
        primaryVar: 'var(--role-backend-primary)',
    },
}