/**
 * Um array de rotas que são acessíveis ao público
 * Essas rotas não requerem autenticação
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Um array de rotas que são usadas para autenticação
 * Essas rotas redirecionarão usuários logados para /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * O prefixo para rotas de autenticação de API
 * As rotas que começam com este prefixo são usadas para fins de autenticação de API
 * @type {string}
 */
export const apiAuthPrefix = ["/api/auth"];

/**
 * O caminho de redirecionamento padrão após o login
 * @type {string[]}
 */
export const DEFALT_LOGIN_REDIRECT = ["/settings"];
