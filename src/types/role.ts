export type Role = 'pm' | 'designer' | 'frontend' | 'backend';

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