/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     'success':
 *       x-summary: OK
 *       description: OK
 *       content:
 *         application/json:
 *           example:
 *             message: success
 *     '400':
 *       description: Bad Request
 *       content:
 *         application/json:
 *           example:
 *             message: $$$ 필드는 필수 입력 항목입니다.
 *     '401':
 *       x-summary: Unauthorized
 *       description: Unauthorized
 *       content:
 *         application/text:
 *           example: Unauthorized
 *     '409':
 *       x-summary: Conflict
 *       description: Conflict
 *       content:
 *         application/json:
 *           example:
 *             message: 이미 존재하는 항목이 있습니다.
 *     '419':
 *       x-summary: Authentication timeout
 *       description: Authentication timeout
 *       content:
 *         application/json:
 *           example:
 *             message: 인증이 만료되었습니다
 *     '422':
 *       x-summary: Unprocessable Entity
 *       description: Unprocessable Entity
 *       content:
 *         application/json:
 *           example:
 *             message: form 검증이 필요합니다
 */