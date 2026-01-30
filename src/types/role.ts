export type Role = 'pm' | 'designer' | 'frontend' | 'backend';

export interface RoleTheme {
    surfaceBg: string;
    primaryText: string;
    primaryBg: string,
    secondaryText: string;
    shadow: string;
    gradientVar: string;
    border: string;

    surfaceVar: string;
    primaryVar: string;
}