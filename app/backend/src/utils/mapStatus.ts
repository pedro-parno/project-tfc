export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'OK': return 200;
    case 'BAD_REQUEST': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'NOT_FOUND': return 404;
    case 'UNPROCESSABLE ENTITY': return 422;
    default: return 500;
  }
}
