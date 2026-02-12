import type { RoleTheme } from "../types/role"

export const ROLE_THEME_MAP: Record<string, RoleTheme> = {
    pm: {
        surfaceBg: 'bg-role-pm-surface',
        surfaceText: 'text-role-pm-surface',

        primaryText: 'text-role-pm-primary',
        primaryBg: 'bg-role-pm-primary',

        secondaryBg: 'text-role-pm-secondary',
        secondaryText: 'text-role-pm-secondary',

        shadow: 'shadow-[0_0_10px_0_var(--role-pm-surface)]',
        gradientVar: 'var(--role-pm-surface)',
        border: 'border-role-pm',
        surfaceBorder: 'border-role-pm-surface',

        surfaceVar: 'var(--role-pm-surface)',
        primaryVar: 'var(--role-pm-primary)',
        secondaryVar: 'var(--role-pm-secondary)',
    },

    designer: {
        surfaceBg: 'bg-role-designer-surface',
        surfaceText: 'text-role-designer-surface',

        primaryText: 'text-role-designer-primary',
        primaryBg: 'bg-role-designer-primary',

        secondaryBg: 'text-role-designer-secondary',
        secondaryText: 'text-role-designer-secondary',

        shadow: 'shadow-[0_0_10px_0_var(--role-designer-surface)]',
        gradientVar: 'var(--role-designer-surface)',
        border: 'border-role-designer',
        surfaceBorder: 'border-role-designer-surface',

        surfaceVar: 'var(--role-designer-surface)',
        primaryVar: 'var(--role-designer-primary)',
        secondaryVar: 'var(--role-designer-secondary)',
    },

    frontend: {
        surfaceBg: 'bg-role-frontend-surface',
        surfaceText: 'text-role-frontend-surface',

        primaryText: 'text-role-frontend-primary',
        primaryBg: 'bg-role-frontend-primary',

        secondaryBg: 'text-role-frontend-secondary',
        secondaryText: 'text-role-frontend-secondary',

        shadow: 'shadow-[0_0_10px_0_var(--role-frontend-surface)]',
        gradientVar: 'var(--role-frontend-surface)',
        border: 'border-role-frontend',
        surfaceBorder: 'border-role-frontend-surface',

        surfaceVar: 'var(--role-frontend-surface)',
        primaryVar: 'var(--role-frontend-primary)',
        secondaryVar: 'var(--role-frontend-secondary)',
    },
    
    backend: {
        surfaceBg: 'bg-role-backend-surface',
        surfaceText: 'text-role-backend-surface',

        primaryText: 'text-role-backend-primary',
        primaryBg: 'bg-role-backend-primary',

        secondaryBg: 'text-role-backend-secondary',
        secondaryText: 'text-role-backend-secondary',

        shadow: 'shadow-[0_0_10px_0_var(--role-backend-surface)]',
        gradientVar: 'var(--role-backend-tertiary)', // 백엔드만 다른 변수 사용
        border: 'border-role-backend',
        surfaceBorder: 'border-role-backend-surface',

        surfaceVar: 'var(--role-backend-surface)',
        primaryVar: 'var(--role-backend-primary)',
        secondaryVar: 'var(--role-backend-secondary)',
    },
}