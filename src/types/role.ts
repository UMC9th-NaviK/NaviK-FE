export type Role = 'pm' | 'designer' | 'frontend' | 'backend';

export const ROLE_MAP: Record<string, string> = {
    "프로덕트 매니저": "pm",
    "프로덕트 디자이너": "designer",
    "프론트엔드 개발자": "frontend",
    "백엔드 개발자": "backend"
};

export interface RoleTheme {
    surfaceBg: string;
    surfaceText: string;

    primaryText: string;
    primaryBg: string,

    secondaryBg: string;
    secondaryText: string;

    shadow: string;
    gradientVar: string;
    border: string;
    surfaceBorder: string;

    surfaceVar: string;
    primaryVar: string;
    secondaryVar: string;
}